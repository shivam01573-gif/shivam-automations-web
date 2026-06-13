"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, AlertTriangle, XCircle, Info } from "lucide-react";

interface Appliance {
  id: string;
  name: string;
  amps: number;
}

const APPLIANCES: Appliance[] = [
  { id: "central_ac_3", name: "Central AC (3 ton)", amps: 20 },
  { id: "central_ac_4", name: "Central AC (4 ton)", amps: 26 },
  { id: "mini_split", name: "Mini Split AC", amps: 15 },
  { id: "water_heater", name: "Electric Water Heater", amps: 25 },
  { id: "dryer", name: "Electric Dryer", amps: 30 },
  { id: "stove", name: "Electric Stove/Range", amps: 40 },
  { id: "oven", name: "Electric Oven", amps: 20 },
  { id: "microwave", name: "Microwave", amps: 12 },
  { id: "refrigerator", name: "Refrigerator", amps: 6 },
  { id: "dishwasher", name: "Dishwasher", amps: 12 },
  { id: "washer", name: "Washing Machine", amps: 10 },
  { id: "ev_32", name: "EV Charger Level 2 (32A)", amps: 32 },
  { id: "ev_48", name: "EV Charger Level 2 (48A)", amps: 48 },
  { id: "hot_tub", name: "Hot Tub / Jacuzzi", amps: 40 },
  { id: "pool_pump", name: "Pool Pump", amps: 20 },
  { id: "furnace", name: "Electric Furnace", amps: 60 },
  { id: "heat_pump", name: "Heat Pump", amps: 15 },
  { id: "baseboard", name: "Electric Baseboard Heater", amps: 15 },
  { id: "garage", name: "Garage Door Opener", amps: 4 },
  { id: "office", name: "Home Office Setup", amps: 8 },
  { id: "pc", name: "Gaming PC Setup", amps: 10 },
  { id: "freezer", name: "Chest Freezer", amps: 5 },
  { id: "window_ac", name: "Window AC Unit", amps: 12 },
];

export default function Home() {
  const [panelSize, setPanelSize] = useState<100 | 200>(100);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [applianceAmps, setApplianceAmps] = useState<Record<string, number>>(
    APPLIANCES.reduce((acc, app) => ({ ...acc, [app.id]: app.amps }), {})
  );
  
  const [result, setResult] = useState<{
    totalAmps: number;
    safeLimit: number;
    headroom: number;
    status: "green" | "yellow" | "red";
    message: string;
    showEVWarning: boolean;
  } | null>(null);

  const handleCheckboxChange = (id: string) => {
    setSelected(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleIncrement = (id: string) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }));
  };

  const handleDecrement = (id: string) => {
    setQuantities(prev => {
      const current = prev[id] || 1;
      if (current <= 1) return prev;
      return {
        ...prev,
        [id]: current - 1
      };
    });
  };

  const handleAmpChange = (id: string, value: string) => {
    const num = parseInt(value) || 0;
    setApplianceAmps(prev => ({
      ...prev,
      [id]: num
    }));
  };

  const calculateLoad = () => {
    let total = 0;
    let hasEV = false;

    APPLIANCES.forEach(app => {
      if (selected[app.id]) {
        const qty = quantities[app.id] || 1;
        const baseAmps = applianceAmps[app.id] !== undefined ? applianceAmps[app.id] : app.amps;
        total += baseAmps * qty;
        if (app.id === "ev_32" || app.id === "ev_48") {
          hasEV = true;
        }
      }
    });

    const safeLimit = panelSize === 100 ? 80 : 160; // 80% NEC Rule
    const capacityThreshold = panelSize; // 100 or 200
    const ratio = total / capacityThreshold;

    let status: "green" | "yellow" | "red" = "green";
    let message = "";

    if (total > safeLimit) {
      status = "red";
      message = "Your panel is overloaded. You need a panel upgrade before adding these appliances.";
    } else if (ratio >= 0.7) {
      status = "yellow";
      message = "Your panel is near capacity. Adding more appliances is risky.";
    } else {
      status = "green";
      message = "Your panel can handle this load safely.";
    }

    const headroom = safeLimit - total;
    const showEVWarning = hasEV && panelSize === 100;

    setResult({
      totalAmps: total,
      safeLimit,
      headroom,
      status,
      message,
      showEVWarning
    });
  };

  // Structured Data FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a safe electrical load for a 100 amp panel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 100 amp panel should not exceed 80 amps of continuous load per National Electrical Code (NEC) guidelines, which specify an 80% continuous load safety limit."
        }
      },
      {
        "@type": "Question",
        "name": "Can I add an EV charger to my existing panel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on your current electrical load. Use our calculator above to check your available capacity and headroom before adding an EV charger."
        }
      },
      {
        "@type": "Question",
        "name": "How do I know if my panel needs upgrading?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If your total load exceeds 80% of your panel's capacity, or if you want to add high-draw appliances like Level 2 EV chargers, heat pumps, or hot tubs, a panel upgrade is recommended."
        }
      }
    ]
  };

  return (
    <div className="max-w-[760px] mx-auto px-6 md:px-10 py-16 flex flex-col gap-16">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header / Hero */}
      <section className="text-center flex flex-col items-center gap-4">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#2563EB]">
          Free Tool
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.1]">
          Home Electrical Load Calculator
        </h1>
        <p className="text-[16px] md:text-[18px] text-[#6B7280] leading-relaxed max-w-[520px]">
          Find out if your electrical panel can safely handle your appliances — including EV chargers, hot tubs, and air conditioning. Free, instant, no signup.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-[13px] font-medium text-[#6B7280]">
          <span className="flex items-center gap-1"><Check className="w-4 h-4 text-[#16A34A]" /> Free forever</span>
          <span className="flex items-center gap-1"><Check className="w-4 h-4 text-[#16A34A]" /> No signup</span>
          <span className="flex items-center gap-1"><Check className="w-4 h-4 text-[#16A34A]" /> NEC standard</span>
        </div>
      </section>

      {/* Calculator Main Card */}
      <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.04)] flex flex-col gap-8">
        
        {/* Panel Size Selection */}
        <div className="flex flex-col gap-3">
          <label className="text-[12px] font-semibold uppercase tracking-wider text-[#6B7280]">
            Your Panel Size
          </label>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={() => setPanelSize(100)}
              className={`flex-1 h-12 rounded-lg font-semibold text-[15px] border transition-all duration-150 ${
                panelSize === 100 
                  ? "bg-[#2563EB] border-[#2563EB] text-white" 
                  : "bg-[#F9FAFB] border-[#E5E7EB] text-[#374151] hover:bg-neutral-100"
              }`}
            >
              100 Amp Panel
            </button>
            <button
              onClick={() => setPanelSize(200)}
              className={`flex-1 h-12 rounded-lg font-semibold text-[15px] border transition-all duration-150 ${
                panelSize === 200 
                  ? "bg-[#2563EB] border-[#2563EB] text-white" 
                  : "bg-[#F9FAFB] border-[#E5E7EB] text-[#374151] hover:bg-neutral-100"
              }`}
            >
              200 Amp Panel
            </button>
          </div>
        </div>

        <div className="border-t border-[#F3F4F6] w-full"></div>

        {/* Appliances Checklist */}
        <div className="flex flex-col gap-4">
          <label className="text-[12px] font-semibold uppercase tracking-wider text-[#6B7280]">
            Select Your Appliances
          </label>
          <div className="flex flex-col border border-[#E5E7EB] rounded-xl overflow-hidden divide-y divide-[#F3F4F6]">
            {APPLIANCES.map((app) => {
              const isChecked = !!selected[app.id];
              const qty = quantities[app.id] || 1;
              return (
                <div
                  key={app.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:px-6 gap-3 transition-all duration-150 hover:bg-[#F9FAFB] ${
                    isChecked ? "bg-[#EFF6FF]" : "bg-white"
                  }`}
                >
                  {/* Left: Checkbox + Name Label */}
                  <label className="flex items-center gap-3.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(app.id)}
                      className="sr-only"
                    />
                    <div className={`w-[18px] h-[18px] rounded border transition-all duration-150 flex items-center justify-center shrink-0 ${
                      isChecked ? "bg-[#2563EB] border-[#2563EB]" : "border-[#C4C4C6]"
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
                    </div>
                    <span className="text-[15px] font-medium text-[#374151]">
                      {app.name}
                    </span>
                  </label>
                  
                  {/* Right: Quantity Adjuster + Amp Input (Outside label click area) */}
                  <div className="flex items-center gap-4 ml-8 sm:ml-0">
                    {/* Quantity Decrement/Increment Controls */}
                    <div className="flex items-center border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] overflow-hidden h-8">
                      <button
                        type="button"
                        onClick={() => handleDecrement(app.id)}
                        className="w-8 h-full flex items-center justify-center text-[#6B7280] hover:bg-neutral-200 transition-colors border-r border-[#E5E7EB] text-lg font-medium select-none"
                      >
                        -
                      </button>
                      <span className="px-3 text-[13px] font-semibold text-[#111827] min-w-[20px] text-center select-none">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleIncrement(app.id)}
                        className="w-8 h-full flex items-center justify-center text-[#6B7280] hover:bg-neutral-200 transition-colors border-l border-[#E5E7EB] text-lg font-medium select-none"
                      >
                        +
                      </button>
                    </div>

                    {/* Amp Input Badge */}
                    <div className="flex items-center gap-1 bg-[#F3F4F6] px-2.5 py-0.5 rounded-full border border-transparent focus-within:border-[#2563EB] focus-within:bg-white transition-all h-8">
                      <input
                        type="number"
                        value={applianceAmps[app.id] ?? app.amps}
                        onChange={(e) => handleAmpChange(app.id, e.target.value)}
                        className="w-10 bg-transparent text-[#374151] font-semibold text-[13px] text-center focus:outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-[11px] font-bold text-[#6B7280] uppercase select-none">A</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={calculateLoad}
          className="w-full h-[52px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-[16px] rounded-xl transition-all duration-150 active:translate-y-[0px] hover:-translate-y-[1px] shadow-sm flex items-center justify-center"
        >
          Calculate My Panel Load
        </button>

        {/* Results Card */}
        {result && (
          <div className={`animate-fade-in-up border rounded-xl p-6 border-l-4 transition-all duration-300 ${
            result.status === "green" 
              ? "bg-[#F0FDF4] border-[#BBF7D0] border-l-[#16A34A]" 
              : result.status === "yellow"
              ? "bg-[#FFFBEB] border-[#FDE68A] border-l-[#D97706]"
              : "bg-[#FEF2F2] border-[#FECACA] border-l-[#DC2626]"
          }`}>
            <div className="flex items-start gap-2.5 mb-5">
              {result.status === "green" && <Check className="w-5.5 h-5.5 text-[#16A34A] shrink-0 mt-0.5" />}
              {result.status === "yellow" && <AlertTriangle className="w-5.5 h-5.5 text-[#D97706] shrink-0 mt-0.5" />}
              {result.status === "red" && <XCircle className="w-5.5 h-5.5 text-[#DC2626] shrink-0 mt-0.5" />}
              <div>
                <h3 className={`text-[18px] font-semibold leading-snug ${
                  result.status === "green" 
                    ? "text-[#15803D]" 
                    : result.status === "yellow"
                    ? "text-[#92400E]"
                    : "text-[#991B1B]"
                }`}>
                  {result.status === "green" && "Your Panel Can Handle This Load"}
                  {result.status === "yellow" && "Your Panel Is Near Capacity"}
                  {result.status === "red" && "Your Panel Is Overloaded"}
                </h3>
                <p className="text-[14px] text-[#6B7280] mt-1">{result.message}</p>
              </div>
            </div>

            {/* Stat Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-3.5 flex flex-col gap-1">
                <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">Total Load</span>
                <span className="text-2xl font-bold text-[#111827]">{result.totalAmps} A</span>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-3.5 flex flex-col gap-1">
                <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">Safe Limit</span>
                <span className="text-2xl font-bold text-[#111827]">{result.safeLimit} A</span>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-3.5 flex flex-col gap-1">
                <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">Headroom</span>
                <span className={`text-2xl font-bold ${result.headroom < 0 ? "text-[#DC2626]" : "text-[#111827]"}`}>
                  {result.headroom} A
                </span>
              </div>
            </div>

            {/* EV Charger Alert */}
            {result.showEVWarning && (
              <div className="mt-5 p-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg flex gap-2.5 text-[14px] text-[#1D4ED8] leading-relaxed">
                <Info className="w-5 h-5 shrink-0 text-[#2563EB] mt-0.5" />
                <span>
                  <strong>EV Charger Warning:</strong> Most 100 amp panels cannot safely support a Level 2 EV charger along with standard home appliances. Consider upgrading to a 200 amp panel or deploying an active load management system.
                </span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Quote Call-To-Action (Affiliate Placeholder) */}
      <section className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-6 md:p-8 text-center flex flex-col items-center gap-4">
        <h3 className="text-[20px] font-bold text-[#111827]">
          Need a panel upgrade? Get free quotes from licensed electricians near you.
        </h3>
        <p className="text-[14px] text-[#6B7280] leading-relaxed max-w-[480px]">
          Compare rates from trusted local electrical contractors. Safe, fast, and completely free service.
        </p>
        <a 
          href="https://shivam-automations-web.vercel.app/quotes-placeholder" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full transition-colors duration-150"
        >
          Get Free Local Quotes <ArrowRight className="w-4 h-4" />
        </a>
      </section>

      {/* SEO Articles Links (Internal Linking) */}
      <section className="flex flex-col gap-6">
        <h2 className="text-[24px] font-bold text-[#111827] border-b border-[#E5E7EB] pb-3">
          Educational Guides & Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/how-to-read-your-electrical-panel" className="bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#2563EB] p-5 rounded-xl transition-all duration-150 flex flex-col gap-2">
            <h4 className="font-semibold text-[16px] text-[#111827]">How to Read Your Electrical Panel</h4>
            <p className="text-xs text-[#6B7280] leading-relaxed">Understand how to check your panel rating, breaker types, and identify upgrade warning signs.</p>
          </Link>
          <Link href="/can-i-add-ev-charger-to-100-amp-panel" className="bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#2563EB] p-5 rounded-xl transition-all duration-150 flex flex-col gap-2">
            <h4 className="font-semibold text-[16px] text-[#111827]">EV Chargers on 100 Amp Panels</h4>
            <p className="text-xs text-[#6B7280] leading-relaxed">Can your 100 amp service safely support a Level 2 EV charging station? Discover your choices.</p>
          </Link>
          <Link href="/200-amp-panel-capacity" className="bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#2563EB] p-5 rounded-xl transition-all duration-150 flex flex-col gap-2">
            <h4 className="font-semibold text-[16px] text-[#111827]">200 Amp Panel Capacity Guide</h4>
            <p className="text-xs text-[#6B7280] leading-relaxed">A complete appliance mapping chart detailing exactly what a 200A panel can handle.</p>
          </Link>
          <Link href="/signs-you-need-panel-upgrade" className="bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#2563EB] p-5 rounded-xl transition-all duration-150 flex flex-col gap-2">
            <h4 className="font-semibold text-[16px] text-[#111827]">7 Signs You Need an Upgrade</h4>
            <p className="text-xs text-[#6B7280] leading-relaxed">Flickering lights? Warm panel box? Check these critical warning signs immediately.</p>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] pt-8 text-center text-[13px] text-[#9CA3AF] leading-relaxed">
        <p>
          Disclaimer: This calculator provides estimates based on standard National Electrical Code (NEC) guidelines. Always consult a licensed electrician before making changes to your home electrical system.
        </p>
      </footer>
    </div>
  );
}
