import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/botanica";

// Required for `output: "export"` - emit a static sitemap.xml at build time.
export const dynamic = "force-static";

// Full public URLs must include the /Cafe-Botanica basePath, so build them
// from `siteUrl` (origin + basePath) rather than relying on metadata resolution.
const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/menu", priority: 0.9 },
  { path: "/about", priority: 0.8 },
  { path: "/gatherings", priority: 0.8 },
  { path: "/gallery", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  { path: "/accessibility", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    priority,
  }));
}
