import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Home Electrical Load Calculator",
    template: "%s | Home Electrical Load Calculator",
  },
  description: "Find out if your electrical panel can handle your appliances, EV charger, hot tub, and more. Free, instant, no signup.",
  metadataBase: new URL("https://shivam-automations-web.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-white text-[#111827] min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
