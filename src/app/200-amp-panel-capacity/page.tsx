import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "What Can a 200 Amp Panel Handle? Full Appliance Guide",
  description: "Learn about the electrical capacity of a 200-amp electrical panel and check our complete appliance amperage draw reference table.",
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
          Panel Capacity Guide
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
          What Can a 200 Amp Panel Handle? Full Appliance Guide
        </h1>
        <p className="text-[14px] text-[#6B7280] font-mono">Published: June 13, 2026 • 5 Min Read</p>
      </div>

      {/* Article Content */}
      <article className="text-[16px] leading-[1.8] text-[#374151] flex flex-col gap-6">
        <p>
          A 200-amp electrical panel is the modern standard for new home construction and major electrical renovations. With the push toward home electrification—incorporating electric vehicle (EV) charging, heat pumps, induction stoves, and hot tubs—older 100-amp panels are quickly reaching their limits.
        </p>
        <p>
          But what exactly does a 200-amp panel allow you to run? Does upgrading your electrical service guarantee that you can add any appliance you want without overloaded breakers?
        </p>

        <h2 className="text-[24px] font-bold text-[#111827] mt-8 mb-2">
          The 80% Safety Rule Explained
        </h2>
        <p>
          Under the National Electrical Code (NEC), you should not load an electrical panel to 100% capacity for continuous loads (loads that run for 3 hours or more, like heating, air conditioning, and EV chargers). 
        </p>
        <p>
          Instead, you must apply the **80% Safety Rule**:
        </p>
        <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
          <li>A **100-amp panel** has a safe continuous limit of **80 amps**.</li>
          <li>A **200-amp panel** has a safe continuous limit of **160 amps**.</li>
        </ul>
        <p>
          This safety margin prevents the main breaker from overheating and tripping due to thermal expansion during long periods of heavy use.
        </p>

        <h2 className="text-[24px] font-bold text-[#111827] mt-8 mb-2">
          Appliance Amperage Reference Table
        </h2>
        <p>
          To understand your panel's load, here is a reference table of common high-draw household appliances and their standard amp draw:
        </p>

        <div className="overflow-x-auto my-6 border border-[#E5E7EB] rounded-xl">
          <table className="w-full text-left border-collapse text-[14px]">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <th className="p-3 font-semibold text-[#111827]">Appliance</th>
                <th className="p-3 font-semibold text-[#111827]">Standard Amp Draw</th>
                <th className="p-3 font-semibold text-[#111827]">Voltage Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              <tr>
                <td className="p-3 text-[#374151]">Central AC (3 Ton)</td>
                <td className="p-3 font-semibold text-[#111827]">20 Amps</td>
                <td className="p-3 text-[#6B7280]">240V (Double-Pole)</td>
              </tr>
              <tr>
                <td className="p-3 text-[#374151]">Electric Water Heater</td>
                <td className="p-3 font-semibold text-[#111827]">25 Amps</td>
                <td className="p-3 text-[#6B7280]">240V (Double-Pole)</td>
              </tr>
              <tr>
                <td className="p-3 text-[#374151]">Electric Clothes Dryer</td>
                <td className="p-3 font-semibold text-[#111827]">30 Amps</td>
                <td className="p-3 text-[#6B7280]">240V (Double-Pole)</td>
              </tr>
              <tr>
                <td className="p-3 text-[#374151]">Electric Range/Stove</td>
                <td className="p-3 font-semibold text-[#111827]">40 Amps</td>
                <td className="p-3 text-[#6B7280]">240V (Double-Pole)</td>
              </tr>
              <tr>
                <td className="p-3 text-[#374151]">EV Charger Level 2 (32A)</td>
                <td className="p-3 font-semibold text-[#111827]">32 Amps</td>
                <td className="p-3 text-[#6B7280]">240V (Double-Pole)</td>
              </tr>
              <tr>
                <td className="p-3 text-[#374151]">EV Charger Level 2 (48A)</td>
                <td className="p-3 font-semibold text-[#111827]">48 Amps</td>
                <td className="p-3 text-[#6B7280]">240V (Double-Pole)</td>
              </tr>
              <tr>
                <td className="p-3 text-[#374151]">Hot Tub / Jacuzzi</td>
                <td className="p-3 font-semibold text-[#111827]">40 Amps</td>
                <td className="p-3 text-[#6B7280]">240V (Double-Pole)</td>
              </tr>
              <tr>
                <td className="p-3 text-[#374151]">Electric Furnace</td>
                <td className="p-3 font-semibold text-[#111827]">60 Amps</td>
                <td className="p-3 text-[#6B7280]">240V (Double-Pole)</td>
              </tr>
              <tr>
                <td className="p-3 text-[#374151]">Refrigerator</td>
                <td className="p-3 font-semibold text-[#111827]">6 Amps</td>
                <td className="p-3 text-[#6B7280]">120V (Single-Pole)</td>
              </tr>
              <tr>
                <td className="p-3 text-[#374151]">Dishwasher</td>
                <td className="p-3 font-semibold text-[#111827]">12 Amps</td>
                <td className="p-3 text-[#6B7280]">120V (Single-Pole)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[24px] font-bold text-[#111827] mt-8 mb-2">
          What Can You Run Simultaneously?
        </h2>
        <p>
          With a 200-amp panel, you have 160 amps of continuous headroom. Under normal operating conditions, this capacity allows you to easily support:
        </p>
        <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
          <li>Central air conditioning (26A)</li>
          <li>An electric range (40A) and oven (20A)</li>
          <li>A Level 2 EV charging station (32A)</li>
          <li>An electric water heater (25A)</li>
          <li>Standard household lighting and receptacles (15A)</li>
        </ul>
        <p>
          Even with all these items running together, your total continuous load sits at 158 amps, which is within the safe 160-amp threshold of your 200-amp panel. This demonstrates why a 200-amp panel is so highly recommended for modern electric homes; it provides the peace of mind to run your appliances without coordinating who can use what.
        </p>
      </article>

      {/* Sticky CTA */}
      <section className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-6 md:p-8 text-center flex flex-col items-center gap-4 mt-8">
        <h3 className="text-[20px] font-bold text-[#111827]">
          Check Your Panel Capacity Now — Free
        </h3>
        <p className="text-[14px] text-[#6B7280] leading-relaxed max-w-[480px]">
          Use our interactive calculator to check your continuous load headroom before adding new appliances.
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
