import type {MetadataRoute} from "next";
export default function sitemap():MetadataRoute.Sitemap {
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const base = process.env.NEXT_PUBLIC_SITE_URL || (productionHost ? "https://" + productionHost : "https://leadfy-site-beditsexpress-5567.vercel.app");
  return ["", "/privacy"].map((path) => ({
    url: base + path,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.3,
  }));
}
