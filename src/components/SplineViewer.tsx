"use client";

import React, { useState, useEffect } from "react";
import { Server, Database, Cpu, Activity, Zap } from "lucide-react";

export default function SplineViewer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-white/5 bg-slate-900/30 backdrop-blur-md flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-xs text-slate-400 font-mono tracking-widest uppercase animate-pulse">
          Initializing Data Pipeline Model...
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-indigo-500/10 bg-slate-950/40 backdrop-blur-md flex flex-col items-center justify-center p-6">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-indigo-500/10 blur-[60px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-purple-500/10 blur-[60px] animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-8">
        {/* Animated flow diagram */}
        <div className="flex items-center justify-between w-full relative">
          
          {/* Connection Lines */}
          <div className="absolute left-[64px] right-[64px] top-[32px] h-[2px] bg-slate-800 overflow-hidden">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[flow_2.5s_linear_infinite]"></div>
          </div>

          {/* Node 1 */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-16 h-16 rounded-2xl bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10 group-hover:border-indigo-400 group-hover:scale-105 transition-all duration-300">
              <Database className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest">Data Source</span>
          </div>

          {/* Node 2 - Core Processor */}
          <div className="flex flex-col items-center gap-2 group relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-30 blur-sm group-hover:opacity-75 transition duration-500 animate-tilt"></div>
            <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-purple-500/30 flex items-center justify-center text-purple-400 relative z-10 shadow-xl shadow-purple-500/10 group-hover:border-purple-400 transition-all duration-300">
              <Cpu className="w-10 h-10 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <span className="text-[10px] font-mono text-purple-300 uppercase tracking-widest z-10">AI Pipeline</span>
          </div>

          {/* Node 3 */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-16 h-16 rounded-2xl bg-pink-950/50 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-lg shadow-pink-500/10 group-hover:border-pink-400 group-hover:scale-105 transition-all duration-300">
              <Server className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-mono text-pink-300 uppercase tracking-widest">CRM Endpoint</span>
          </div>

        </div>

        {/* Pulse monitor */}
        <div className="w-full bg-slate-900/60 border border-white/5 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
            <span className="text-xs font-mono text-slate-300 tracking-wider">PIPELINE MONITOR: ACTIVE</span>
          </div>
          <Activity className="w-4 h-4 text-green-400 animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        @keyframes flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
