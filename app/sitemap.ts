import type { MetadataRoute } from "next";
const baseUrl = "https://b1kjuu.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about", "/tech", "/editor", "/contact"];
  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
