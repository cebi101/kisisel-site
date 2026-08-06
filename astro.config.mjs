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
      // CV belgesi ve yönetim ekranı arama motorlarına verilmez
      filter: (page) => !page.includes("/cv") && !page.includes("/yonetim"),
    }),
  ],
});
