import os
import requests
from dotenv import load_dotenv

# Load env variables from root folder .env.local
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env.local"))
DEVTO_API_KEY = os.getenv("DEVTO_API_KEY")

def publish_to_devto(title, markdown_content, tags=["automation", "nocode", "api"]):
    if not DEVTO_API_KEY:
        print("[!] Missing DEVTO_API_KEY in environment. Skipping Dev.to publishing.")
        return False
        
    print(f"[*] Attempting to publish '{title}' to Dev.to...")
    
    # Dev.to allows up to 4 tags, must be lowercase alphanumeric
    clean_tags = []
    for tag in tags[:4]:
        cleaned = "".join(c for c in tag.lower() if c.isalnum())
        if cleaned:
            clean_tags.append(cleaned)
            
    if not clean_tags:
        clean_tags = ["automation", "api"]
        
    # Setup request details
    url = "https://dev.to/api/articles"
    headers = {
        "api-key": DEVTO_API_KEY,
        "Content-Type": "application/json"
    }
    
    # We append a canonical URL pointing back to our own site to get SEO link juice (Domain Authority transfer)
    canonical_title = "".join(c for c in title.lower() if c.isalnum() or c in " -").replace(" ", "-")
    canonical_url = f"https://shivam-automations-web.vercel.app/sops/{canonical_title}"
    
    payload = {
        "article": {
            "title": title,
            "published": True,
            "body_markdown": markdown_content,
            "tags": clean_tags,
            "canonical_url": canonical_url
        }
    }
    
    try:
        r = requests.post(url, headers=headers, json=payload, timeout=20)
        if r.status_code == 201:
            data = r.json()
            print(f"[+] Successfully published to Dev.to! Article URL: {data.get('url')}")
            return True
        else:
            print(f"[!] Dev.to API returned status {r.status_code}: {r.text}")
            return False
    except Exception as e:
        print(f"[!] Dev.to API request failed: {e}")
        return False

# Manual runner fallback
if __name__ == "__main__":
    # Test publishing
    test_title = "Resolving Automated API Rate Limits in Make.com"
    test_content = (
        "# Resolving Automated API Rate Limits in Make.com\n\n"
        "This is an automated test publication from Shivam Automations.\n\n"
        "Learn how to configure rate-limit buffering workflows here: https://shivam-automations-web.vercel.app"
    )
    publish_to_devto(test_title, test_content, ["test", "make", "automation"])
