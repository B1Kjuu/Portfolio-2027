import type { MetadataRoute } from "next";

const baseUrl = "https://b1kjuu.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about", "/tech", "/editor", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
