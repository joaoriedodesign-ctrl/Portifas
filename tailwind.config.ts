import type { Config } from "tailwindcss";

/**
 * Every color and font-size here resolves to a CSS custom property defined in
 * styles/tokens-colors.css and styles/tokens-typography.css, which mirror the
 * project's source-of-truth doc (docs/design-tokens.md, v2) 1:1 with the
 * Figma variable collections (`Primitivas`, `Semânticas`).
 *
 * Rule: never add a raw hex or px value directly in a component. If a value is
 * missing here, it's missing from the token docs too — flag it and propose the
 * addition there first, don't invent it in Tailwind config.
 *
 * Colors are wired as `rgb(var(--x) / <alpha-value>)` (not plain hex/var())
 * so Tailwind's opacity modifiers (e.g. `bg-surface-primary/60`) work on any
 * token, primitive or semantic, without ever needing a one-off rgba() value.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primitives — only meant to be reached for directly when the doc
        // itself documents that shade's use as a one-off ("destaque
        // pontual"), e.g. brand-500 for an accent highlight. Everything
        // else should go through the semantic layer below.
        primary: {
          50: "rgb(var(--color-primary-50) / <alpha-value>)",
          100: "rgb(var(--color-primary-100) / <alpha-value>)",
          200: "rgb(var(--color-primary-200) / <alpha-value>)",
          300: "rgb(var(--color-primary-300) / <alpha-value>)",
          400: "rgb(var(--color-primary-400) / <alpha-value>)",
          500: "rgb(var(--color-primary-500) / <alpha-value>)",
          600: "rgb(var(--color-primary-600) / <alpha-value>)",
          700: "rgb(var(--color-primary-700) / <alpha-value>)",
          800: "rgb(var(--color-primary-800) / <alpha-value>)",
          900: "rgb(var(--color-primary-900) / <alpha-value>)",
          950: "rgb(var(--color-primary-950) / <alpha-value>)",
        },
        brand: {
          50: "rgb(var(--color-brand-50) / <alpha-value>)",
          100: "rgb(var(--color-brand-100) / <alpha-value>)",
          200: "rgb(var(--color-brand-200) / <alpha-value>)",
          300: "rgb(var(--color-brand-300) / <alpha-value>)",
          400: "rgb(var(--color-brand-400) / <alpha-value>)",
          500: "rgb(var(--color-brand-500) / <alpha-value>)",
          600: "rgb(var(--color-brand-600) / <alpha-value>)",
          700: "rgb(var(--color-brand-700) / <alpha-value>)",
          800: "rgb(var(--color-brand-800) / <alpha-value>)",
          900: "rgb(var(--color-brand-900) / <alpha-value>)",
          950: "rgb(var(--color-brand-950) / <alpha-value>)",
        },
        // Semantic layer — components should reach for these first.
        surface: {
          background: "rgb(var(--surface-background) / <alpha-value>)",
          primary: "rgb(var(--surface-primary) / <alpha-value>)",
          secondary: "rgb(var(--surface-secondary) / <alpha-value>)",
        },
        border: {
          background: "rgb(var(--border-background) / <alpha-value>)",
          "surface-primary": "rgb(var(--border-surface-primary) / <alpha-value>)",
          "surface-secondary": "rgb(var(--border-surface-secondary) / <alpha-value>)",
        },
        "on-surface": {
          primary: "rgb(var(--on-surface-primary) / <alpha-value>)",
          secondary: "rgb(var(--on-surface-secondary) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          disable: "rgb(var(--text-disable) / <alpha-value>)",
        },
        // CTA tokens. Default `bg`/`border` = transparent is expressed with
        // Tailwind's built-in `bg-transparent`/`border-transparent` in
        // components — "transparent" isn't a color value to wire here.
        cta: {
          "primary-bg": "rgb(var(--cta-primary-bg) / <alpha-value>)",
          "primary-bg-hover": "rgb(var(--cta-primary-bg-hover) / <alpha-value>)",
          "primary-text": "rgb(var(--cta-primary-text) / <alpha-value>)",
          "secondary-bg-hover": "rgb(var(--cta-secondary-bg-hover) / <alpha-value>)",
          "secondary-border": "rgb(var(--cta-secondary-border) / <alpha-value>)",
          "secondary-text": "rgb(var(--cta-secondary-text) / <alpha-value>)",
          "transparent-bg-hover": "rgb(var(--cta-transparent-bg-hover) / <alpha-value>)",
          "transparent-text": "rgb(var(--cta-transparent-text) / <alpha-value>)",
          "transparent-text-hover": "rgb(var(--cta-transparent-text-hover) / <alpha-value>)",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      // Mirrors the primitive type scale (size / line-height / letter-spacing)
      // from the typography reference doc. Prefer the .heading-* / .body-*
      // composite classes in tokens-typography.css for actual text styles
      // (those are also where the mobile-first responsive step-down for
      // display/h1/h2/h3 lives) — these exist so arbitrary Tailwind usage
      // still stays on-scale.
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
      // Breakpoints: intentionally left at Tailwind's defaults
      // (sm/md/lg/xl/2xl), per docs/diretrizes-responsividade.md §1 — no
      // documented override exists yet.
    },
  },
  plugins: [],
};

export default config;
