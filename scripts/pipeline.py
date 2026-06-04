import os
import re
import sys
import time
import sqlite3
import requests
from bs4 import BeautifulSoup
from tenacity import retry, wait_exponential, stop_after_attempt
import google.generativeai as genai
from groq import Groq
from github import Github, GithubException
from dotenv import load_dotenv
from publish_devto import publish_to_devto

# Force UTF-8 stdout encoding on Windows to prevent UnicodeEncodeError with emojis
if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass


# Load env variables from root folder .env.local
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env.local"))

# Retrieve configuration keys
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GITHUB_PAT = os.getenv("GITHUB_PAT")
SCRAPER_DO_TOKEN = os.getenv("SCRAPER_DO_TOKEN")
BRAND_NAME = os.getenv("BRAND_NAME", "shivam automations")
GMAIL = os.getenv("CONTACT_GMAIL", "shivam01573@gmail.com")

# SQLite Deduplication DB Setup
DB_PATH = os.path.join(os.path.dirname(__file__), "pipeline.db")
def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS processed_threads (
            url TEXT PRIMARY KEY,
            title TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

def is_processed(url):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT 1 FROM processed_threads WHERE url = ?", (url,))
    exists = cursor.fetchone() is not None
    conn.close()
    return exists

def mark_processed(url, title):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO processed_threads (url, title) VALUES (?, ?)", (url, title))
    conn.commit()
    conn.close()

# RSS parsing helper to extract posts from Make.com forum
def get_recent_make_forum_threads():
    rss_url = "https://community.make.com/latest.rss"
    print(f"[*] Fetching forum feeds from {rss_url}")
    try:
        r = requests.get(rss_url, timeout=15)
        r.raise_for_status()
    except Exception as e:
        print(f"[!] Failed to fetch Make.com forum RSS feed: {e}")
        return []
    
    soup = BeautifulSoup(r.content, "xml")
    items = soup.find_all("item")
    threads = []
    for item in items:
        link = item.find("link").text if item.find("link") else ""
        title = item.find("title").text if item.find("title") else ""
        description = item.find("description").text if item.find("description") else ""
        if link and title:
            threads.append({
                "url": link,
                "title": title,
                "description": description
            })
    print(f"[+] Found {len(threads)} threads in RSS feed.")
    return threads

# Scrape html via Scraper.do API to bypass Cloudflare
def get_thread_html_via_scraper_do(url):
    if not SCRAPER_DO_TOKEN:
        print("[!] Warning: SCRAPER_DO_TOKEN not found. Trying direct request...")
        try:
            r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=15)
            r.raise_for_status()
            return r.text
        except Exception as e:
            print(f"[!] Direct request failed: {e}")
            return None
            
    proxy_url = f"https://api.scraper.do?token={SCRAPER_DO_TOKEN}&url={url}"
    print(f"[*] Routing scrape request through Scraper.do API...")
    try:
        r = requests.get(proxy_url, timeout=30)
        r.raise_for_status()
        return r.text
    except Exception as e:
        print(f"[!] Scraper.do API call failed: {e}")
        return None

# Extract the post description or actual core text from HTML page
def extract_post_body(html):
    if not html:
        return ""
    soup = BeautifulSoup(html, "html.parser")
    # discourse post body container
    post_div = soup.find("div", class_="cooked")
    if post_div:
        return post_div.get_text(separator="\n").strip()
    # fallback to body parsing
    body = soup.find("body")
    if body:
        return body.get_text(separator="\n")[:3000].strip()
    return ""

# LLM Stage 1: Groq API to extract structured variables
@retry(wait=wait_exponential(multiplier=1, min=4, max=10), stop=stop_after_attempt(3))
def query_groq_for_extraction(post_body):
    if not GROQ_API_KEY:
        print("[!] Missing GROQ_API_KEY in environment.")
        return None
    
    client = Groq(api_key=GROQ_API_KEY)
    system_prompt = (
        "You are an Elite Systems Analyst. Analyze the raw forum post below and output a JSON block with these keys:\n"
        "- software_list: array of names of apps/SaaS involved (e.g. ['Make.com', 'HubSpot'])\n"
        "- core_error: brief summary of the error or API sync failure\n"
        "- root_cause_guess: short technical explanation of why it failed (e.g. rate limit, schema mapping, missing auth scopes)\n"
        "Output ONLY JSON. Do not include markdown code fence blocks."
    )
    
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": post_body}
        ],
        temperature=0.1,
    )
    return response.choices[0].message.content

# LLM Stage 2: Groq API to write the final Markdown B2B SOP
@retry(wait=wait_exponential(multiplier=1, min=4, max=10), stop=stop_after_attempt(3))
def query_groq_for_sop(extracted_json, thread_title):
    if not GROQ_API_KEY:
        print("[!] Missing GROQ_API_KEY in environment.")
        return None
        
    client = Groq(api_key=GROQ_API_KEY)
    
    prompt = (
        f"You are a Senior B2B Automation Solutions Architect and Technical Writer for '{BRAND_NAME}'.\n"
        f"Generate a comprehensive, SEO-optimized B2B Integration SOP (Standard Operating Procedure) resolving the following issue:\n"
        f"Thread Title: {thread_title}\n"
        f"Extracted Diagnostics: {extracted_json}\n\n"
        f"Write this SOP in GitHub Markdown format. It must follow this outline:\n"
        f"1. Title (H1): Descriptive B2B search-optimized title resolving the error.\n"
        f"2. Overview (H2): Context on the software systems involved and the pain point.\n"
        f"3. Error Diagnostic (H2): Detailed breakdown of why this API / integration fails.\n"
        f"4. Step-by-Step Resolution (H2): Clear, actionable H3 steps to configure, build, and resolve the error using Make.com/Zapier/custom script, and how to verify.\n"
        f"5. Next Steps (H2): A brief wrap-up advising the reader to skip the manual setup and deploy the flow directly using Make.com (using the affiliate link: https://www.make.com/en/register?pc=shivamautomations).\n\n"
        f"Add an FAQ schema using JSON-LD block inside a script tag at the bottom.\n"
        f"Do not write conversational introduction or summary outside of the Markdown article."
    )
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.2,
    )
    return response.choices[0].message.content

# Git Publishing via PyGithub
def publish_to_github(filename, content):
    if not GITHUB_PAT:
        print("[!] Missing GITHUB_PAT in environment. Saving file locally only.")
        return False
        
    # Example Github repo setup, fallback to placeholder
    repo_name = "shivam-automations/shivam-automations-web" # Customize to your repo
    print(f"[*] Attempting to push {filename} to GitHub repo: {repo_name}...")
    try:
        g = Github(GITHUB_PAT)
        repo = g.get_repo(repo_name)
        
        # Check if file exists to update or create
        path_in_repo = f"content/sops/{filename}"
        try:
            file_contents = repo.get_contents(path_in_repo)
            repo.update_file(
                path_in_repo,
                f"chore(pipeline): update B2B SOP {filename}",
                content,
                file_contents.sha
            )
            print(f"[+] Successfully updated {filename} on GitHub.")
        except GithubException:
            repo.create_file(
                path_in_repo,
                f"chore(pipeline): add B2B SOP {filename}",
                content
            )
            print(f"[+] Successfully created {filename} on GitHub.")
        return True
    except Exception as e:
        print(f"[!] GitHub auto-publish failed: {e}")
        return False

# Main Pipeline Runner
def run_pipeline():
    init_db()
    
    threads = get_recent_make_forum_threads()
    if not threads:
        print("[!] No threads found. Exiting.")
        return
        
    # Process up to 3 unprocessed threads per execution to prevent rate limit triggers
    processed_count = 0
    for thread in threads:
        url = thread["url"]
        title = thread["title"]
        
        if is_processed(url):
            print(f"[-] Thread already processed: {url}")
            continue
            
        print(f"\n[*] Processing new thread: {title}")
        print(f"[*] URL: {url}")
        
        # Step 1: Scrape thread body
        html = get_thread_html_via_scraper_do(url)
        post_body = extract_post_body(html)
        if not post_body:
            # fallback to sitemap snippet description
            post_body = thread["description"]
            
        if not post_body:
            print("[!] Empty post body. Skipping.")
            continue
            
        print(f"[*] Scraped body snippet ({len(post_body)} chars). Processing with Groq...")
        
        # Step 2: Extract variables with Groq
        try:
            extracted_json = query_groq_for_extraction(post_body)
            print(f"[+] Extracted Variables: {extracted_json}")
        except Exception as e:
            print(f"[!] Groq processing failed: {e}")
            continue
            
        # Step 3: Write B2B SOP article with Groq Llama 3.3
        print("[*] Generating full SOP article via Groq...")
        try:
            sop_markdown = query_groq_for_sop(extracted_json, title)
            print(f"[+] Generated SOP markdown ({len(sop_markdown)} chars).")
        except Exception as e:
            print(f"[!] Groq SOP generation failed: {e}")
            continue
            
        # Step 4: Save locally
        clean_title = re.sub(r'[^a-zA-Z0-9]', '-', title.lower()).strip("-")
        filename = f"{clean_title}.md"
        local_content_dir = os.path.join(os.path.dirname(__file__), "..", "content", "sops")
        os.makedirs(local_content_dir, exist_ok=True)
        
        local_file_path = os.path.join(local_content_dir, filename)
        with open(local_file_path, "w", encoding="utf-8") as f:
            f.write(sop_markdown)
        print(f"[+] Saved SOP file locally to {local_file_path}")
        
        # Step 5: Publish to GitHub Pages repo
        publish_to_github(filename, sop_markdown)
        
        # Step 6: Publish to Dev.to automatically for Parasite SEO Traffic
        try:
            tags = ["automation", "make", "api"]
            if "jotform" in clean_title:
                tags.append("jotform")
            if "arcgis" in clean_title:
                tags.append("arcgis")
            publish_to_devto(title, sop_markdown, tags)
        except Exception as e:
            print(f"[!] Failed to auto-publish to Dev.to: {e}")
        
        # Mark as processed
        mark_processed(url, title)
        processed_count += 1
        
        if processed_count >= 3:
            print("\n[+] Reached batch limit of 3 threads. Throttling loop.")
            break
            
        # Rate limit safety delay
        print("[*] Sleeping for 15 seconds to prevent rate limits...")
        time.sleep(15)

if __name__ == "__main__":
    run_pipeline()
