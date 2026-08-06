// CSS kuralları. Astro bileşenlerinin scoped <style> blokları da denetlenir.
export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: ["dist/**", "node_modules/**", "public/**"],
  overrides: [
    {
      files: ["**/*.astro"],
      customSyntax: "postcss-html",
      extends: ["stylelint-config-html/astro"],
    },
  ],
  rules: {
    "no-descending-specificity": null,
    "custom-property-empty-line-before": null,
    "comment-empty-line-before": null,
    "declaration-empty-line-before": null,
    "rule-empty-line-before": null,
    "media-feature-range-notation": null,
    "selector-class-pattern": null,
    "alpha-value-notation": null,
    "color-function-notation": null,
    "value-keyword-case": null,
    "at-rule-empty-line-before": null,
  },
};
