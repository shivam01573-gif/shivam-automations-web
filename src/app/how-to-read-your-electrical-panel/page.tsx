import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Read Your Electrical Panel: A Homeowner's Guide",
  description: "Learn how to read your electrical breaker panel, find its amp rating, decode breakers, and identify critical signs that it needs an upgrade.",
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
          Educational Guide
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
          How to Read Your Electrical Panel: A Homeowner's Guide
        </h1>
        <p className="text-[14px] text-[#6B7280] font-mono">Published: June 13, 2026 • 5 Min Read</p>
      </div>

      {/* Article Content */}
      <article className="text-[16px] leading-[1.8] text-[#374151] flex flex-col gap-6">
        <p>
          Every modern home relies on a steady flow of electrical power to run lights, appliances, heating, cooling, and electronic devices. But where does this power go, and how is it distributed safely throughout your house? The answer lies inside your electrical service panel—commonly known as the breaker box, fuse board, or load center.
        </p>

        {/* Embedded Image */}
        <div className="my-6 rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm">
          <img 
            src="/images/electrical_panel.png" 
            alt="Electrical Service Panel Box" 
            className="w-full h-auto object-cover max-h-[360px]"
          />
        </div>

        <p>
          Understanding how to read and navigate your electrical panel is one of the most critical safety skills a homeowner can possess. Whether you are dealing with a tripped circuit breaker, planning to install a new high-power appliance (like a Level 2 EV charger or a hot tub), or trying to assess if your electrical service is sufficient, your panel box holds all the answers.
        </p>

        <h2 className="text-[24px] font-bold text-[#111827] mt-8 mb-2">
          What is an Electrical Service Panel?
        </h2>
        <p>
          Think of your service panel as the central switchboard for your home's electricity. Power enters your house from the utility company via overhead or underground service wires, runs through your electrical meter box, and flows directly into the main service panel. From there, the panel divides the total electrical load into smaller, individual pathways called circuits. Each circuit feeds electricity to a specific zone of your home, such as your kitchen countertops, garage receptacles, or living room lights.
        </p>

        <h2 className="text-[24px] font-bold text-[#111827] mt-8 mb-2">
          How to Find Your Panel's Amp Rating
        </h2>
        <p>
          Before adding any new high-draw electrical equipment to your home, you must determine your panel's total amperage capacity. Most modern residential homes have either a 100-amp, 150-amp, or 200-amp service capacity. Older homes built before the 1970s may only have a 60-amp service.
        </p>
        <p>
          To find your panel's overall amp rating, follow these steps:
        </p>
        <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
          <li><strong>Locate the Main Breaker:</strong> Open the metal door of your panel box. Near the top (or occasionally the bottom), you will see one large double-wide breaker switch. This switch shuts off power to the entire house in an emergency.</li>
          <li><strong>Read the Number:</strong> Look at the stamp or sticker on the handle of the main breaker. It will typically be stamped with a number like <strong>100</strong>, <strong>150</strong>, or <strong>200</strong>. This represents the maximum current capacity of your electrical panel.</li>
          <li><strong>Verify the Label:</strong> If the stamp on the breaker is worn off, check the paper manufacturer label glued to the inside of the panel door. It will list the maximum service rating of the box.</li>
        </ul>

        <h2 className="text-[24px] font-bold text-[#111827] mt-8 mb-2">
          Decoding Your Breakers: Single-Pole vs. Double-Pole
        </h2>
        <p>
          Individual breaker switches inside the panel look like toggle switches and act as safety fuses. If a circuit draws too much current, the breaker automatically flips to the "Off" position (trips) to prevent the wiring from overheating and catching fire.
        </p>
        <p>
          There are two primary types of circuit breakers in a residential panel:
        </p>
        <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
          <li><strong>Single-Pole Breakers:</strong> These are single-width switches. They supply 120 volts of electricity and typically handle 15-amp or 20-amp loads. These power standard outlets, light switches, and basic household items.</li>
          <li><strong>Double-Pole Breakers:</strong> These are double-width, linked switches that snap onto two hot bus bars simultaneously. They supply 240 volts of electricity and are rated for 30, 40, or 50 amps. These feed heavy appliances like clothes dryers, stoves, central AC compressors, and EV charging stations.</li>
        </ul>

        <h2 className="text-[24px] font-bold text-[#111827] mt-8 mb-2">
          4 Critical Signs Your Panel Box Needs an Upgrade
        </h2>
        <p>
          An outdated or overloaded electrical panel is a leading cause of residential electrical fires. If your panel is experiencing any of the following symptoms, it should be examined by a licensed electrician immediately:
        </p>
        <ol className="list-decimal list-inside pl-4 flex flex-col gap-2">
          <li><strong>Frequent Circuit Trips:</strong> If you trip a breaker every time you run the microwave and the coffee pot together, your circuits are overloaded.</li>
          <li><strong>Flickering or Dimming Lights:</strong> Dimming or flickering lights when large appliances kick on (like the AC or vacuum) indicate your electrical service is struggling to meet demand.</li>
          <li><strong>Warmth or Rust:</strong> The breaker box should be cool to the touch. Rust inside the panel door or water stains indicate moisture intrusion, which is extremely dangerous.</li>
          <li><strong>Outdated Brands (Federal Pacific or Zinsco):</strong> If your home has a panel made by Federal Pacific Electric (FPE), Zinsco, or Challenger, it must be replaced immediately. These brands are known to have high failure rates and may not trip during an overload.</li>
        </ol>
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
