import React, { Suspense } from "react";
import fs from "fs";
import path from "path";
import { 
  ArrowRight, ShieldAlert, Cpu, Sparkles, CheckCircle2, 
  ExternalLink, Layers, Terminal, Zap, BookOpen, AlertTriangle 
} from "lucide-react";
import PipelineSimulator from "@/components/PipelineSimulator";
import SplineViewer from "@/components/SplineViewer";

interface SOP {
  id: string;
  title: string;
  description: string;
  tools: string[];
  affiliateLink: string;
  affiliateText: string;
  difficulty: string;
  readTime: string;
}

function getSOPs(): SOP[] {
  const sopsDir = path.join(process.cwd(), "content", "sops");
  if (!fs.existsSync(sopsDir)) {
    return [];
  }
  
  const files = fs.readdirSync(sopsDir);
  return files
    .filter(file => file.endsWith(".md"))
    .map(file => {
      const filePath = path.join(sopsDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      
      const slug = file.replace(/\.md$/, "");
      
      // Parse Title
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : slug;
      
      // Parse Overview / Description
      let description = "";
      const overviewIndex = content.indexOf("## Overview");
      if (overviewIndex !== -1) {
        const afterOverview = content.substring(overviewIndex + "## Overview".length).trim();
        const firstParagraph = afterOverview.split("\n\n")[0];
        description = firstParagraph ? firstParagraph.trim() : "";
      }
      
      description = description.replace(/[#*`_]/g, "");
      if (description.length > 150) {
        description = description.substring(0, 147) + "...";
      }
      
      const tools = ["Make.com"];
      if (slug.includes("jotform")) {
        tools.push("Jotform");
      }
      if (slug.includes("arcgis")) {
        tools.push("ArcGIS");
        tools.push("API");
      }
      if (slug.includes("agentic")) {
        tools.push("AI Agents");
      }
      
      return {
        id: slug,
        title,
        description,
        tools,
        affiliateLink: "/sops/" + slug,
        affiliateText: "Read Step-by-Step SOP",
        difficulty: slug.includes("arcgis") || slug.includes("agentic") ? "Advanced" : "Intermediate",
        readTime: "5 min read"
      };
    });
}

export default function Home() {
  const sops = getSOPs();

  return (
    <div className="flex-1 flex flex-col relative overflow-x-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="border-b border-white/5 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50 transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              shivam automations
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#simulator" className="text-xs text-slate-400 hover:text-slate-200 transition">Simulator</a>
            <a href="#sops" className="text-xs text-slate-400 hover:text-slate-200 transition">Integration SOPs</a>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col gap-20">
        
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/25 bg-indigo-950/30 text-indigo-300 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase font-mono tracking-wider font-semibold">Zero Integration Errors</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-100 tracking-tight leading-none">
              Deploy Fault-Tolerant{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Data Pipelines
              </span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
              Stop losing leads to rate-limit timeouts, API schema changes, and webhook failures. We build, document, and share step-by-step integrations that scale.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a 
                href="#sops"
                className="px-6 py-3 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/25"
              >
                Explore Integration SOPs <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="https://www.make.com/en/register?pc=shivamautomations"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-xl flex items-center justify-center gap-2 transition"
              >
                Try Make.com For Free <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Micro stats banner */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5 mt-4">
              <div>
                <span className="text-2xl font-bold text-slate-200">100%</span>
                <p className="text-[10px] text-slate-400 uppercase mt-0.5">Automated Architecture</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-200">0ms</span>
                <p className="text-[10px] text-slate-400 uppercase mt-0.5">Cumulative Layout Shift</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-200">Free</span>
                <p className="text-[10px] text-slate-400 uppercase mt-0.5">SOP & Code Access</p>
              </div>
            </div>
          </div>

          {/* 3D Spline Container */}
          <div className="relative">
            <SplineViewer />
          </div>
        </section>

        {/* Pipeline Simulator Section */}
        <section id="simulator" className="flex flex-col gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
              <Layers className="w-6 h-6 text-indigo-400" /> Interactive Pipeline Sandbox
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Test data anomalies, simulation payloads, and automated repair triggers in our visual simulator.
            </p>
          </div>
          <PipelineSimulator />
        </section>

        {/* SOP Article Grid */}
        <section id="sops" className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-purple-400" /> API Integration SOPs
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Step-by-step blueprints to configure, monitor, and debug complex multi-app data sync pipelines.
              </p>
            </div>
          </div>

          {sops.length === 0 ? (
            <div className="bg-slate-900/10 border border-white/5 rounded-2xl p-8 text-center text-slate-400 font-mono text-xs">
              No SOP integration templates found. Run the automation pipeline script to populate articles.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sops.map((sop) => (
                <div 
                  key={sop.id} 
                  className="bg-slate-900/20 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 backdrop-blur-md group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      {sop.tools.map((tool, i) => (
                        <span 
                          key={i} 
                          className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-white/10 bg-slate-950 text-slate-400 font-semibold"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-base font-bold text-slate-200 leading-snug group-hover:text-indigo-300 transition mb-3">
                      {sop.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      {sop.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    <span className="text-[10px] text-slate-500 font-mono">{sop.difficulty}</span>
                    <a 
                      href={sop.affiliateLink}
                      className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
                    >
                      {sop.affiliateText} <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-indigo-950/20 to-purple-950/20 border border-indigo-500/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="flex flex-col gap-3 relative z-10 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">Ready to build your next automation workflow?</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Join thousands of operations managers leveraging no-code integration templates. Get started with Make.com today for free.
            </p>
          </div>
          <div className="shrink-0 relative z-10 w-full sm:w-auto">
            <a 
              href="https://www.make.com/en/register?pc=shivamautomations"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/20"
            >
              Start Automating Free <ArrowRight className="w-4 h-4" />
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
    </div>
  );
}
