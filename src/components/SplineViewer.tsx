"use client";

import React, { useState } from "react";
import Spline from "@splinetool/react-spline";

interface SplineViewerProps {
  sceneUrl?: string;
}

export default function SplineViewer({
  sceneUrl = "https://prod.spline.design/kZiKo5ot7czNsZ3F/scene.splinecode",
}: SplineViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-white/5 bg-slate-900/30 backdrop-blur-md">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 z-10">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-xs text-slate-400 font-mono tracking-widest uppercase animate-pulse">
            Loading 3D Data Pipeline Model...
          </p>
        </div>
      )}
      <div className="w-full h-full">
        <Spline
          scene={sceneUrl}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
