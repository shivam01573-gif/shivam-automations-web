# Shivam Automations - Project Blueprint & Log

This file serves as a permanent context store. If the IDE chat history is cleared or reset, any AI agent or developer can read this file to understand the architecture, active scripts, and the business workflow of this project.

---

## 🎯 Project Vision & Goals
- **Brand Name:** Shivam Automations
- **URL:** [https://shivam-automations-web.vercel.app/](https://shivam-automations-web.vercel.app/)
- **Target Audience:** US & Tier-1 B2B Operations Managers, No-code developers, and founders looking to build automated integrations.
- **Constraints:** $0 starting budget, 0 initial followers.
- **Monetization:** High-ticket B2B SaaS referrals and affiliate programs (Make.com, Clay, Monday, HubSpot).
- **Traffic Strategy:** 100% Free Organic Search (SEO) and Parasite SEO (publishing on Dev.to and social media).

---

## ⚙️ Active Integrations & Affiliate Profiles
1. **Make.com Affiliate Program:** 
   - **Status:** Active & Approved (In-house Make program).
   - **Affiliate Link:** `https://www.make.com/en/register?pc=shivamautomations`
   - **Payouts:** Recurrent 35% commission for 12 months (via Wise to India).
2. **PartnerStack Network:** 
   - **Status:** Application submitted (In review).
   - **Purpose:** To sign up for Clay, Monday.com, and HubSpot affiliate links once approved.
3. **Dev.to Publishing Platform:**
   - **Status:** Active & Configured.
   - **User Profile:** `shivam_automations_37e1a9`
   - **API Token:** Configured locally in `.env.local` as `DEVTO_API_KEY`.

---

## 📁 Key File Map

### Website Frontend (Next.js App Router)
- [src/app/page.tsx](file:///d:/AI%20automation/affilate%20web/src/app/page.tsx) - Dynamic landing page. Reads `.md` files from `content/sops` at build/render time, extracts details, and displays them as cards. Uses a static import for `SplineViewer`.
- [src/app/sops/[slug]/page.tsx](file:///d:/AI%20automation/affilate%20web/src/app/sops/%5Bslug%5D/page.tsx) - Dynamic article page. Uses `marked` library to convert markdown to HTML, styles elements, and automatically crops off marketing jargon (like `## Professional Call-To-Action` or `## Next Steps`) before displaying a visual CTA banner.
- [src/app/icon.png](file:///d:/AI%20automation/affilate%20web/src/app/icon.png) - Glowing custom brand logo (replacing default Vercel favicon).
- [content/sops/](file:///d:/AI%20automation/affilate%20web/content/sops) - Folder containing generated markdown SOP articles.

### Automation Engine & Scripts
- [scripts/pipeline.py](file:///d:/AI%20automation/affilate web/scripts/pipeline.py) - Main pipeline script. Fetches recent Make forum RSS feeds, scrapes posts, calls Groq (Llama 3) to analyze errors and write solutions, saves them to `content/sops/`, pushes to Github, publishes to Dev.to, and automatically generates Pinterest Graphic Pins.
- [scripts/publish_devto.py](file:///d:/AI%20automation/affilate web/scripts/publish_devto.py) - Helper module that makes POST requests to `https://dev.to/api/articles` with API key headers. Injects canonical URLs back to the Vercel site to transfer domain authority (SEO link juice).
- [scripts/pinterest_generator.py](file:///d:/AI%20automation/affilate web/scripts/pinterest_generator.py) - Programmatic graphic design script that draws premium 1000x1500px Pinterest Pins with typography, borders, and branding for each SOP.
- [scripts/install_startup.py](file:///d:/AI%20automation/affilate web/scripts/install_startup.py) - Windows utility that registers a silent VBScript in the Windows Startup Folder so that the pipeline runs completely in the background on PC logon.
- [run_pipeline.bat](file:///d:/AI%20automation/affilate web/run_pipeline.bat) - Helper batch script executed by the startup script. It triggers the python pipeline and appends outputs to `pipeline_run.log`.

---

## 🛠️ Running the Pipeline & Auto-Run Status

### How to Run Manually:
To fetch new threads, generate SOPs, build the website, publish to Dev.to, and create Pinterest graphics automatically, run this command in PowerShell:
```powershell
py scripts/pipeline.py
```

### Silent Auto-Run on PC Boot/Logon:
The system is configured to run **automatically and silently** in the background every time your PC turns on and you log in. 
- It creates a background process (no CMD window popup) that executes `run_pipeline.bat`.
- It appends all execution status and outputs to `pipeline_run.log` in the project root.
- Deduplication logic ensures it takes <3 seconds and makes 0 duplicate posts if no new forum threads are found.

---

## 🔮 Future Roadmap & Next Steps
- **Clay / Monday Affiliate Updates:** Once PartnerStack is approved, replace placeholder links in `src/app/page.tsx` with actual affiliate URLs.
- **Pinterest Auto-Scheduler:** Explore setting up programmatic Pinterest pinning using their developer API or using CSV bulk upload.

---

## 📜 Conversation History & Context (Preserved)

If the chat session is cleared or reset, this section provides a chronological context of how this project started and the decisions made:

1. **Initial Goal (Budget $0, India-friendly, B2B SaaS):**
   - The user requested a $0 budget automated affiliate system targeting US/Tier-1 traffic.
   - Strict constraint: Must be accessible from India (payouts via Wise, PayPal, Payoneer; no US SSN/address).
   - Selected niche: **B2B SaaS Automation & API Integrations** (Make.com, Monday.com, Clay, HubSpot).
   - Strategy: Build a website showing step-by-step SOPs (Standard Operating Procedures) for complex API integration errors, then drive traffic.

2. **Traffic Hack Strategy & Anti-Ban Security:**
   - Instead of using automated bots to spam links on day-0 Reddit/LinkedIn/Pinterest accounts (which triggers instant bans), the strategy pivoted to **High-Authority Parasite SEO**.
   - Platform: **Dev.to** (Domain Authority 92+). By auto-publishing high-quality developer SOPs on Dev.to and linking back to the Vercel site as the canonical source, we get high ranking in Google searches for specific error messages (e.g., "How to resolve Make.com rate limits").

3. **Built Infrastructure:**
   - **Frontend:** Next.js + Spline 3D viewer + Dynamic App Router `/sops/[slug]` pages that parse generated markdown files. Favicon customized to `icon.png` (our glowing branding logo).
   - **Data Store / Content:** All SOPs are stored as markdown files in `content/sops/`.
   - **Automated Pipeline (`scripts/pipeline.py`):** 
     - Scrapes/parses RSS feeds for Make.com forum errors.
     - Calls Groq (Llama-3 model) or Gemini to write step-by-step troubleshooting SOPs.
     - Saves markdown locally and commits/pushes to GitHub (Vercel auto-deploys).
     - Calls DEV.to API to post the SOP as an article with the canonical link pointing to our Vercel site (for SEO authority boost).

4. **Active Credentials & Secrets (Stored in `.env.local` - NOT committed to Git):**
   - `DEVTO_API_KEY`: API key for Dev.to publishing.
   - `GROQ_API_KEY` / `GEMINI_API_KEY`: Keys to power LLMs for auto-writing.
   - `GITHUB_PAT`: Personal Access Token for auto-pushing content changes.
   - `SCRAPER_DO_TOKEN`: Token for proxy requests when scraping forums.

