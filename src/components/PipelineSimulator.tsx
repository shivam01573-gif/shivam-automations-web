"use client";

import React, { useState, useEffect } from "react";
import { 
  Database, ArrowRight, CheckCircle2, AlertTriangle, 
  RefreshCw, Play, ShieldAlert, Cpu, Sparkles 
} from "lucide-react";

interface Node {
  id: string;
  name: string;
  type: "source" | "processor" | "destination";
  icon: string;
  status: "idle" | "running" | "success" | "error";
  color: string;
}

export default function PipelineSimulator() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "shopify", name: "Shopify Store", type: "source", icon: "🛒", status: "idle", color: "from-green-500 to-emerald-600" },
    { id: "make", name: "Make.com Flow", type: "processor", icon: "🔄", status: "idle", color: "from-indigo-500 to-purple-600" },
    { id: "gemini", name: "Gemini AI Node", type: "processor", icon: "✨", status: "idle", color: "from-cyan-400 to-blue-600" },
    { id: "hubspot", name: "HubSpot CRM", type: "destination", icon: "🎯", status: "idle", color: "from-orange-500 to-amber-600" },
  ]);

  const [activeStep, setActiveStep] = useState<number>(-1);
  const [log, setLog] = useState<string[]>(["System initialized. Click 'Run Data Sync' to start."]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [errorSimulated, setErrorSimulated] = useState<boolean>(false);

  const runSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setErrorSimulated(false);
    setLog(["Starting automated pipeline...", "Querying new Shopify orders..."]);
    
    // Step 0: Shopify active
    setNodes(prev => prev.map((n, i) => i === 0 ? { ...n, status: "running" } : { ...n, status: "idle" }));
    setActiveStep(0);
    await new Promise(r => setTimeout(r, 1200));

    setLog(prev => [...prev, "✓ 3 New Orders detected in Shopify.", "Routing payload to Make.com Webhook..."]);
    setNodes(prev => prev.map((n, i) => i === 0 ? { ...n, status: "success" } : i === 1 ? { ...n, status: "running" } : n));
    setActiveStep(1);
    await new Promise(r => setTimeout(r, 1200));

    if (Math.random() > 0.5) {
      // Simulate Error State first (so user understands what we debug)
      setErrorSimulated(true);
      setLog(prev => [
        ...prev, 
        "⚠ Make.com pipeline execution failed: API Rate Limit hit at Destination CRM.",
        "✖ HubSpot integration error: 429 Too Many Requests.",
        "💡 Solution SOP suggested: Enable queue buffering & auto-backoff."
      ]);
      setNodes(prev => prev.map((n, i) => i === 1 ? { ...n, status: "error" } : i === 3 ? { ...n, status: "error" } : n));
      setActiveStep(-1);
      setIsSyncing(false);
      return;
    }

    setLog(prev => [...prev, "Processing details via Gemini AI (semantic enrichment)..."]);
    setNodes(prev => prev.map((n, i) => i === 1 ? { ...n, status: "success" } : i === 2 ? { ...n, status: "running" } : n));
    setActiveStep(2);
    await new Promise(r => setTimeout(r, 1200));

    setLog(prev => [...prev, "✓ Data enriched. Standardizing data schemas...", "Pushing payloads to HubSpot CRM contacts..."]);
    setNodes(prev => prev.map((n, i) => i === 2 ? { ...n, status: "success" } : i === 3 ? { ...n, status: "running" } : n));
    setActiveStep(3);
    await new Promise(r => setTimeout(r, 1200));

    setLog(prev => [...prev, "✓ Sync successful. HubSpot profiles created & tagged.", "Pipeline resting. Status: OK."]);
    setNodes(prev => prev.map(n => ({ ...n, status: "success" })));
    setActiveStep(4);
    setIsSyncing(false);
  };

  const resetPipeline = () => {
    setNodes(prev => prev.map(n => ({ ...n, status: "idle" })));
    setLog(["Pipeline reset. Ready for sync."]);
    setActiveStep(-1);
    setErrorSimulated(false);
  };

  return (
    <div className="w-full bg-slate-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden">
      {/* Background neon glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" /> B2B Pipeline Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-1">See how our automated systems detect anomalies, enrich fields, and repair data syncs.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button 
            onClick={resetPipeline}
            disabled={isSyncing}
            className="px-3 py-1.5 text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 rounded-lg flex items-center gap-2 transition disabled:opacity-50"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
          <button 
            onClick={runSync}
            disabled={isSyncing}
            className="px-4 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-2 transition shadow-md shadow-indigo-600/20 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Run Data Sync
          </button>
        </div>
      </div>

      {/* Nodes Map */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2 items-center relative py-6">
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              node.status === "running" ? "bg-indigo-950/20 border-indigo-500 shadow-md shadow-indigo-500/10 animate-pulse scale-105" :
              node.status === "success" ? "bg-slate-900/80 border-green-500/40" :
              node.status === "error" ? "bg-red-950/10 border-red-500/50 shadow-md shadow-red-500/5" :
              "bg-slate-950/40 border-white/5"
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{node.icon}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider ${
                  node.status === "running" ? "bg-indigo-500/20 text-indigo-300" :
                  node.status === "success" ? "bg-green-500/20 text-green-300" :
                  node.status === "error" ? "bg-red-500/20 text-red-300 animate-bounce" :
                  "bg-white/5 text-slate-500"
                }`}>
                  {node.status}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-200">{node.name}</h4>
              <p className="text-[10px] text-slate-400 capitalize mt-0.5">{node.type}</p>
            </div>
            
            {index < nodes.length - 1 && (
              <div className="hidden md:flex justify-center items-center text-slate-600">
                <ArrowRight className={`w-5 h-5 transition-all duration-500 ${
                  activeStep === index ? "text-indigo-400 animate-bounce translate-x-1" : ""
                }`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Terminal logs panel */}
      <div className="mt-6 bg-slate-950 border border-white/5 rounded-xl p-4 font-mono text-[11px] leading-relaxed text-slate-300 max-h-[180px] overflow-y-auto">
        <div className="flex items-center justify-between text-slate-500 border-b border-white/5 pb-2 mb-2">
          <span>PIPELINE LOG CONSOLE</span>
          {errorSimulated && (
            <span className="flex items-center gap-1 text-red-400 font-semibold uppercase animate-pulse">
              <ShieldAlert className="w-3.5 h-3.5" /> ERROR INTERRUPT DETECTED
            </span>
          )}
        </div>
        {log.map((line, i) => (
          <div key={i} className={`py-0.5 ${
            line.startsWith("✓") ? "text-green-400" :
            line.startsWith("✖") || line.startsWith("⚠") ? "text-red-400 font-semibold" :
            line.startsWith("💡") ? "text-cyan-400 font-semibold bg-cyan-950/20 px-2 rounded mt-1" :
            "text-slate-400"
          }`}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
