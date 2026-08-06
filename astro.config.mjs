// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Yayın adresi — sitemap, canonical, hreflang ve paylaşım kartı bundan türer
export default defineConfig({
  site: "https://seymanurcebi.dev",
  trailingSlash: "ignore",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "tr",
        locales: { tr: "tr-TR", en: "en-US" },
      },
      filter: (page) => !page.includes("/cv"), // CV belgesi indekslenmesin
    }),
  ],
});
