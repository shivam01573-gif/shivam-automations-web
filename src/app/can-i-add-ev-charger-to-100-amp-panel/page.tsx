import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Can I Add an EV Charger to a 100 Amp Panel?",
  description: "Find out if it's safe to add a Level 2 EV charger to an existing 100-amp service panel, the costs to upgrade, and smart load management options.",
};

export default function ArticlePage() {
  return (
    <div className="max-w-[680px] mx-auto px-6 md:px-10 py-16 flex flex-col gap-10">
      {/* Back Link */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#2563EB] transition-colors w-fit group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Calculator
      </Link>

      {/* Article Header */}
      <div className="flex flex-col gap-4 border-b border-[#E5E7EB] pb-6">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#2563EB]">
          EV Charging Guide
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
          Can I Add an EV Charger to a 100 Amp Panel?
        </h1>
        <p className="text-[14px] text-[#6B7280] font-mono">Published: June 13, 2026 • 5 Min Read</p>
      </div>

      {/* Article Content */}
      <article className="text-[16px] leading-[1.8] text-[#374151] flex flex-col gap-6">
        <p>
          As electric vehicles (EVs) become mainstream, one of the first questions new owners face is: "How will I charge it at home?" While a standard 120-volt household outlet (Level 1 charging) can add about 3 to 5 miles of range per hour, most EV owners prefer to install a 240-volt Level 2 charging station, which charges 6 to 10 times faster.
        </p>
        <p>
          However, installing a Level 2 charger requires a dedicated 240-volt circuit box that pulls significant current—often between 32 to 48 amps. If your home has an older 100-amp electrical panel, you might wonder if your system can safely handle this load without overloading the main breaker.
        </p>

        <h2 className="text-[24px] font-bold text-[#111827] mt-8 mb-2">
          What are the Requirements for a Level 2 Charger?
        </h2>
        <p>
          To understand why a 100-amp panel struggles, we must look at the math. A standard Level 2 EV charging station pulls substantial power:
        </p>
        <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
          <li><strong>32-Amp Charger:</strong> Requires a <strong>40-amp circuit breaker</strong> (under the NEC 80% continuous load rule, where continuous loads must not exceed 80% of the breaker rating).</li>
          <li><strong>48-Amp Charger:</strong> Requires a <strong>60-amp circuit breaker</strong>.</li>
        </ul>
        <p>
          If you install a 48-amp charger on a 100-amp panel, that single appliance is consuming <strong>60% of your entire home's electrical capacity</strong> while charging.
        </p>

        <h2 className="text-[24px] font-bold text-[#111827] mt-8 mb-2">
          Why 100 Amp Service Panels Struggle
        </h2>
        <p>
          A typical household has several large appliances: a refrigerator (6A), an electric stove (40A), a water heater (25A), a clothes dryer (30A), and a central AC unit (20A). Under the National Electrical Code (NEC) load calculation guidelines, your continuous load is calculated using a demand factor. 
        </p>
        <p>
          If your base load is already 60 amps, and you add a 32-amp EV charger, your total load jumps to 92 amps. This leaves just 8 amps of headroom before you trip the main breaker. If you run your stove or dryer while the car is charging, your main breaker will overload and shut down power to your whole home.
        </p>

        <h2 className="text-[24px] font-bold text-[#111827] mt-8 mb-2">
          The Cost to Upgrade to 200 Amp Service
        </h2>
        <p>
          For most homeowners, the safest and most reliable solution is to upgrade their electrical service panel from 100 amps to 200 amps. 
        </p>
        <p>
          An electrical panel upgrade is not a DIY task and must be performed by a licensed electrician. The cost typically ranges from <strong>$1,500 to $4,000</strong> depending on:
        </p>
        <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
          <li><strong>Local Utility Requirements:</strong> Whether the incoming service wires need to be replaced.</li>
          <li><strong>Permits and Inspections:</strong> City building permits and inspector fees.</li>
          <li><strong>Panel Placement:</strong> If the panel needs to be relocated to meet modern clearance codes.</li>
          <li><strong>Materials:</strong> The cost of the new panel box, heavy-gauge wiring, and individual circuit breakers.</li>
        </ul>

        <h2 className="text-[24px] font-bold text-[#111827] mt-8 mb-2">
          Alternative: Smart Load Management Systems
        </h2>
        <p>
          If upgrading your panel is structurally difficult or too expensive, you can ask your electrician about an **EVSE Load Management System** or a **Smart Splitter**.
        </p>
        <p>
          These devices monitor your main panel's real-time electricity draw. If you turn on a high-draw appliance (like an electric oven), the smart controller automatically pauses or throttles the EV charger to keep the home's total load below safe limits. Once the oven turns off, the charger resumes at full speed. This allows you to safely operate a Level 2 charger on a 100-amp service without risking an overload.
        </p>
      </article>

      {/* Sticky CTA */}
      <section className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-6 md:p-8 text-center flex flex-col items-center gap-4 mt-8">
        <h3 className="text-[20px] font-bold text-[#111827]">
          Check Your Panel Capacity Now — Free
        </h3>
        <p className="text-[14px] text-[#6B7280] leading-relaxed max-w-[480px]">
          Use our interactive calculator to check your continuous load headroom before adding an EV charger.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full transition-colors duration-150"
        >
          Open Load Calculator <ArrowRight className="w-4 h-4" />
        </Link>
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
