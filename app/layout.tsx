import type { Metadata } from "next";
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
