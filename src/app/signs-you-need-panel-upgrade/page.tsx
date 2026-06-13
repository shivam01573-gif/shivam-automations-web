import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "7 Signs Your Electrical Panel Needs Upgrading",
  description: "Discover the top 7 warning signs that your home electrical service panel is outdated, overloaded, or unsafe, and when you should upgrade.",
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
          Home Safety Guide
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
          7 Signs Your Electrical Panel Needs Upgrading
        </h1>
        <p className="text-[14px] text-[#6B7280] font-mono">Published: June 13, 2026 • 5 Min Read</p>
      </div>

      {/* Article Content */}
      <article className="text-[16px] leading-[1.8] text-[#374151] flex flex-col gap-6">
        <p>
          Your electrical panel is the unsung hero of your home. It works silently in the background, distributing electricity to your outlets, appliances, and fixtures while protecting your family from electrical fires. However, like any mechanical or electrical system, panels age, degrade, and eventually become obsolete.
        </p>
        <p>
          With our modern homes drawing more power than ever due to multiple TVs, computers, air conditioners, and now electric vehicle chargers, an old or faulty panel box is a major hazard. Here are the 7 warning signs that it is time to upgrade your home service panel.
        </p>

        <h2 className="text-[20px] font-bold text-[#111827] mt-6 mb-2">
          1. Your Breakers Trip Frequently
        </h2>
        <p>
          Circuit breakers are designed to trip (cut power) when a circuit draws more current than it can handle. This prevents the wires from overheating and starting a fire. However, if a particular breaker trips weekly, or if the main breaker itself trips, your electrical system is telling you it is overloaded. A panel upgrade or circuit addition is required.
        </p>

        <h2 className="text-[20px] font-bold text-[#111827] mt-6 mb-2">
          2. Flickering or Dimming Lights
        </h2>
        <p>
          If your lights flicker or momentarily dim when your refrigerator kicks on, or when you turn on the vacuum cleaner, your electrical panel lacks the headroom to distribute power evenly. This drop in voltage is a clear sign that your panel is struggling to manage heavy loads.
        </p>

        <h2 className="text-[20px] font-bold text-[#111827] mt-6 mb-2">
          3. The Panel Box is Warm to the Touch or Smells Singed
        </h2>
        <p>
          An electrical panel box should remain cool to the touch. If the metal cover feels warm, or if you smell a faint scent of burning plastic or ozone near the panel, shut off your main breaker and call an emergency electrician. This indicates loose connections or failing breakers that are generating active electrical arcs and extreme heat.
        </p>

        <h2 className="text-[20px] font-bold text-[#111827] mt-6 mb-2">
          4. You See Signs of Rust or Corrosion
        </h2>
        <p>
          Water and electricity are a deadly combination. If you see rust on the metal box or white powdery corrosion on the breaker contacts, water is leaking into your panel (typically running down the inside of the main utility wire). Corrosion causes high resistance, which leads to overheating, failures, and shock hazards. The panel must be replaced immediately, and the water source must be sealed.
        </p>

        <h2 className="text-[20px] font-bold text-[#111827] mt-6 mb-2">
          5. Your Home Still Uses Fuses Instead of Breakers
        </h2>
        <p>
          If your home uses a screw-in fuse box instead of modern switch breakers, your system was built over 50 years ago. Fuses themselves are not inherently unsafe, but fuse boxes are outdated and not rated for modern high-power appliances. Furthermore, insurance companies often charge higher premiums or refuse coverage for homes with fuse panels.
        </p>

        <h2 className="text-[20px] font-bold text-[#111827] mt-6 mb-2">
          6. You are Adding High-Draw Appliances (EV Charger, A/C, Hot Tub)
        </h2>
        <p>
          If you are planning an upgrade to your home, such as adding a Level 2 electric vehicle charger (which draws 32 to 48 amps), a central air conditioning system (20 to 30 amps), or a hot tub (40 amps), a standard 100-amp panel will likely not have enough headroom. Upgrading to a 200-amp panel is standard practice to support these high-power additions.
        </p>

        <h2 className="text-[20px] font-bold text-[#111827] mt-6 mb-2">
          7. You Have a Recalled Panel Brand (Zinsco, Challenger, or Federal Pacific)
        </h2>
        <p>
          Certain brands of electrical panels manufactured between the 1950s and 1980s have been identified as fire hazards due to design flaws. Specifically:
        </p>
        <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
          <li><strong>Federal Pacific Electric (FPE) Stab-Lok panels:</strong> Have a high failure rate where breakers fail to trip during overloads, leading to hundreds of house fires.</li>
          <li><strong>Zinsco panels:</strong> Breakers are known to melt directly to the bus bar, rendering them unable to trip.</li>
          <li><strong>Challenger panels:</strong> Use defective bus bars that overheat and melt.</li>
        </ul>
        <p>
          If your home has any of these brands, do not wait for a failure. Contact an electrician to replace the box as soon as possible.
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
