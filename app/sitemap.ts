import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * V1 : une seule URL. Les futures pages (/services, /realisations, /galerie,
 * /rendez-vous, /contact) n'auront qu'à être ajoutées ici.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
