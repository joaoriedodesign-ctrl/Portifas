import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// These two variables are the ONLY place font-family is decided.
// tokens-typography.css just reads var(--font-heading) / var(--font-body) —
// it never hardcodes a family name, so swapping a typeface later is a
// one-line change here, not a find-and-replace across the codebase.
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "João Lucas — Product Designer",
  description:
    "Product Designer especializado em Design Systems — arquitetura de tokens, governança multi-tenant e workflows AI-assisted.",
};

/**
 * `viewportFit: "cover"` fixes a real bug (2026-08-26, user-reported via
 * screenshot on an iPhone): without it, the page only renders inside the
 * device's "safe" rectangle, so any `fixed inset-0` full-screen element —
 * MobileNav's open-menu overlay, specifically — stopped short of the
 * actual screen edges. The gap outside that safe rectangle isn't page
 * content at all, it's the OS/browser's own chrome color showing through
 * around the physical rounded corners and home-indicator area, which is
 * why it looked like an unwanted border. `themeColor` is set to match
 * `surface-background` (`--color-primary-50`, `#171717`) so that on
 * Android (which tints the system status/nav bar from this value) that
 * chrome matches the site instead of a default color.
 */
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#171717",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${dmSans.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
