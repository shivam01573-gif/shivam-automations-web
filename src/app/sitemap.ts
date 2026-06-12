import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shivam-automations-web.vercel.app";
  
  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];
  
  // Dynamic SOP routes
  const sopsDir = path.join(process.cwd(), "content", "sops");
  if (fs.existsSync(sopsDir)) {
    const files = fs.readdirSync(sopsDir);
    const sopRoutes = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const slug = file.replace(/\.md$/, "");
        const filePath = path.join(sopsDir, file);
        let mtime = new Date();
        try {
          const stats = fs.statSync(filePath);
          mtime = stats.mtime;
        } catch (e) {
          // fallback
        }
        return {
          url: `${baseUrl}/sops/${slug}`,
          lastModified: mtime,
          changeFrequency: "weekly" as const,
          priority: 0.8,
        };
      });
    routes.push(...sopRoutes);
  }
  
  return routes;
}
