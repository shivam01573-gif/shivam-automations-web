import React from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { ArrowLeft, ExternalLink, Calendar, Clock, Award, Sparkles, BookOpen } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SOPPage({ params }: PageProps) {
  const { slug } = await params;
  
  const sopsDir = path.join(process.cwd(), "content", "sops");
  const filePath = path.join(sopsDir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  
  let markdown = fs.readFileSync(filePath, "utf-8");
  
  // Extract schema JSON-LD block if present
  let schemaBlock = "";
  const scriptRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/i;
  const match = markdown.match(scriptRegex);
  if (match) {
    schemaBlock = match[0];
    // Remove schema script from markdown to prevent rendering issues or double injection
    markdown = markdown.replace(scriptRegex, "");
  }
  
  // Parse H1 Title and remove it from markdown content (since we'll render it custom)
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : slug;
  if (titleMatch) {
    markdown = markdown.replace(/^#\s+.+$/m, "");
  }
  
  // Render markdown to HTML
  const htmlContent = await marked.parse(markdown);
  
  const dateStr = "June 4, 2026";
  const readTimeStr = "5 min read";
  const difficultyStr = slug.includes("arcgis") || slug.includes("agentic") ? "Advanced" : "Intermediate";

  return (
    <div className="flex-1 flex flex-col relative overflow-x-hidden min-h-screen bg-slate-950">
      {/* CSS styling injection for markdown elements */}
      <style dangerouslySetInnerHTML={{ __html: `
        .sop-content h2 { font-size: 1.5rem; font-weight: 700; color: #f1f5f9; margin-top: 2.5rem; margin-bottom: 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.5rem; }
        .sop-content h3 { font-size: 1.25rem; font-weight: 600; color: #e2e8f0; margin-top: 2rem; margin-bottom: 0.75rem; }
        .sop-content p { font-size: 0.95rem; line-height: 1.7; color: #94a3b8; margin-bottom: 1.5rem; }
        .sop-content ul, .sop-content ol { margin-left: 1.75rem; margin-bottom: 1.5rem; }
        .sop-content li { font-size: 0.95rem; color: #94a3b8; margin-bottom: 0.6rem; line-height: 1.7; }
        .sop-content ul { list-style-type: disc; }
        .sop-content ol { list-style-type: decimal; }
        .sop-content a { color: #818cf8; text-decoration: underline; transition: color 0.2s; font-weight: 500; }
        .sop-content a:hover { color: #a5b4fc; }
        .sop-content code { font-family: monospace; font-size: 0.85rem; background: rgba(255,255,255,0.07); padding: 0.2rem 0.4rem; border-radius: 4px; color: #f472b6; }
        .sop-content blockquote { border-left: 4px solid #6366f1; padding-left: 1rem; color: #cbd5e1; font-style: italic; margin-bottom: 1.5rem; }
      `}} />
      
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="border-b border-white/5 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50 transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              shivam automations
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/#simulator" className="text-xs text-slate-400 hover:text-slate-200 transition">Simulator</Link>
            <Link href="/#sops" className="text-xs text-slate-400 hover:text-slate-200 transition">Integration SOPs</Link>
            <a 
              href="https://www.make.com/en/register?pc=shivamautomations" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 text-xs font-semibold bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/20 rounded-lg transition"
            >
              Get Free Templates
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col gap-10">
        {/* Back Link */}
        <Link href="/#sops" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 transition-colors w-fit group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to SOP Directory
        </Link>
        
        {/* Article Meta */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
            {title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 font-mono border-b border-white/5 pb-6">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-indigo-500/80" /> {dateStr}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-indigo-500/80" /> {readTimeStr}</span>
            <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-indigo-500/80" /> {difficultyStr}</span>
          </div>
        </div>
        
        {/* SOP Article Content */}
        <article className="sop-content bg-slate-900/10 border border-white/5 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>
        
        {/* Call to Action Box */}
        <section className="bg-gradient-to-r from-indigo-950/20 to-purple-950/20 border border-indigo-500/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="flex flex-col gap-3 relative z-10 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">Deploy this B2B automation instantly</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Skip the manual configurations. Register your free account on Make.com using our partner code and deploy pre-built templates for this SOP.
            </p>
          </div>
          <div className="shrink-0 relative z-10 w-full sm:w-auto">
            <a 
              href="https://www.make.com/en/register?pc=shivamautomations"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/20"
            >
              Start Automating Free <ArrowLeft className="w-4 h-4 rotate-180" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-950 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs font-mono">
          <span>&copy; {new Date().getFullYear()} shivam automations. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="https://www.make.com/en/register?pc=shivamautomations" className="hover:text-slate-400">Make.com Affiliate Partner</a>
            <span>•</span>
            <a href={`mailto:shivam01573@gmail.com`} className="hover:text-slate-400">Contact Support</a>
          </div>
        </div>
      </footer>
      
      {/* Inject JSON-LD FAQ schema for search snippet eligibility */}
      {schemaBlock && <div dangerouslySetInnerHTML={{ __html: schemaBlock }} />}
    </div>
  );
}
