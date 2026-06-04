import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "shivam automations | B2B API Integration & Data-Sync Solutions",
  description: "Stop wasting engineering hours. Resolve HubSpot, Make.com, and CRM integration errors with our step-by-step B2B automation SOPs and templates.",
  keywords: ["make.com", "hubspot API", "salesforce integration", "data sync", "B2B automation", "SOP", "API errors"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-indigo-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
