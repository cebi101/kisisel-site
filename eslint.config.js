// Lint kuralları — Astro + TypeScript. `any` hata sayılır (T0.3).
import js from "@eslint/js";
import ts from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default [
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "node_modules/**",
      ".wrangler/**",
      "test-results/**",
      "playwright-report/**",
      "scratchpad/**",
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    // Astro bileşenlerinin içindeki tarayıcı script'leri
    files: ["**/*.astro"],
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        localStorage: "readonly",
        matchMedia: "readonly",
        fetch: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        IntersectionObserver: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        addEventListener: "readonly",
        innerWidth: "readonly",
        getComputedStyle: "readonly",
        CustomEvent: "readonly",
        HTMLElement: "readonly",
        devicePixelRatio: "readonly",
      },
    },
  },
  {
    files: ["functions/**/*.ts"],
    languageOptions: {
      globals: {
        Response: "readonly",
        Request: "readonly",
        crypto: "readonly",
        TextEncoder: "readonly",
        console: "readonly",
        caches: "readonly",
        fetch: "readonly",
        URL: "readonly",
      },
    },
  },
  {
    files: ["scripts/**/*.mjs", "*.config.*", "**/*.test.ts"],
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
        URL: "readonly",
        fetch: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
      },
    },
  },
];
