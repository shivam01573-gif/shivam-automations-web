import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shivam-automations-web.vercel.app";
  
  const pages = [
    "",
    "/how-to-read-your-electrical-panel",
    "/can-i-add-ev-charger-to-100-amp-panel",
    "/200-amp-panel-capacity",
    "/signs-you-need-panel-upgrade",
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "daily" : "weekly",
    priority: page === "" ? 1.0 : 0.8,
  }));
}
