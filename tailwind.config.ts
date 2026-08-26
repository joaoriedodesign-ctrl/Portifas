import type { Config } from "tailwindcss";

/**
 * Every color and font-size here resolves to a CSS custom property defined in
 * styles/tokens-colors.css and styles/tokens-typography.css, which mirror the
 * project's source-of-truth MDs (referencia-cores.md, REFERE_2.MD / typography ref)
 * 1:1 with the Figma variable collections (`Primitivas`, `Semânticas`).
 *
 * Rule: never add a raw hex or px value directly in a component. If a value is
 * missing here, it's missing from the token docs too — flag it and propose the
 * addition there first, don't invent it in Tailwind config.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic layer only — components should reach for these, never
        // for a primitive hex, matching the "always via semantic token" rule.
        page: "var(--bg-page)",
        surface: "var(--bg-surface)",
        border: {
          DEFAULT: "var(--border-default)",
          strong: "var(--border-strong)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          inverse: "var(--text-inverse)",
        },
        brand: {
          primary: "var(--brand-primary)",
          "primary-hover": "var(--brand-primary-hover)",
          secondary: "var(--brand-secondary)",
          "secondary-hover": "var(--brand-secondary-hover)",
          tertiary: "var(--brand-tertiary)",
          "tertiary-hover": "var(--brand-tertiary-hover)",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      // Mirrors the primitive type scale (size / line-height / letter-spacing)
      // from the typography reference MD. Prefer the .heading-* / .body-*
      // composite classes in tokens-typography.css for actual text styles;
      // these exist so arbitrary Tailwind usage still stays on-scale.
      fontSize: {
        display: ["56px", { lineHeight: "60px", letterSpacing: "-1.5px" }],
        h1: ["40px", { lineHeight: "46px", letterSpacing: "-1px" }],
        h2: ["32px", { lineHeight: "38px", letterSpacing: "-0.5px" }],
        h3: ["24px", { lineHeight: "30px", letterSpacing: "0px" }],
        h4: ["20px", { lineHeight: "26px", letterSpacing: "0px" }],
        "body-lg": ["18px", { lineHeight: "28px", letterSpacing: "0px" }],
        body: ["16px", { lineHeight: "26px", letterSpacing: "0px" }],
        "body-sm": ["14px", { lineHeight: "20px", letterSpacing: "0px" }],
        caption: ["12px", { lineHeight: "16px", letterSpacing: "0.2px" }],
      },
      // NOTE: no grid/spacing MD exists in the project reference yet.
      // Intentionally NOT overriding Tailwind's default spacing scale here —
      // that would mean inventing a system that hasn't been documented.
      // Proposal: add a `referencia-grid.md` (columns, gutters, spacing step)
      // before this scaffold grows past placeholder pages.
    },
  },
  plugins: [],
};

export default config;
