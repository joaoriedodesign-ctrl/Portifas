import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PillarCard } from "@/components/ui/PillarCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About Me — João Riedo",
  description:
    "Product Designer specialized in Design Systems, Design Ops and AI applied to end-to-end workflows.",
};

/**
 * English mirror of app/sobre/page.tsx — added 2026-09-01 as part of the
 * English site (separate `/en/...` routes, no PT/EN toggle; see the
 * "UPDATE 2026-09-01" notes on components/layout/Header.tsx and siblings
 * for the full decision). This file doesn't use any of the `lang`-prop
 * components (Header/Footer/BackLink/ContactSection etc.) directly — it's
 * a standalone page built from Badge/PillarCard/Reveal/next/image plus
 * its own local content arrays, exactly like the Portuguese original —
 * so it's a straight English translation of that file's copy and data,
 * not a new build. See app/sobre/page.tsx's own (much longer) doc
 * comment for the full palette/layout/photo-bleed/Figma-node history;
 * none of those decisions are re-litigated here, only the text changes.
 *
 * Two things deliberately did NOT get translated, both on purpose:
 * - `certifications`: titles/issuer/URLs are real Coursera/Tera
 *   credentials, already in English in the source data, and the URLs
 *   verify the exact English title — translating them would break the
 *   link between what's displayed and what the verification page shows.
 *   Reused verbatim from the Portuguese file.
 * - Contact values (email address, phone number, LinkedIn handle): real
 *   facts, language-independent. Only the field LABELS ("PHONE" instead
 *   of "TELEFONE") are translated.
 */

const differentiators = [
  {
    number: "01",
    title: "Design Systems & Ops",
    description:
      "Building consistent libraries with a real focus on handoff to development, support for multiple themes (Light/Dark), and advanced tokenization for product scale.",
  },
  {
    number: "02",
    title: "End-to-End Product",
    description:
      "From early discovery and research through high-fidelity design and rich prototyping, with strong experience across complex B2B, B2C and Sportsbook platforms.",
  },
  {
    number: "03",
    title: "AI in the Workflow",
    description:
      "Using cutting-edge tools to automate high-fidelity design processes, turning manual bureaucratic flows into intelligent generation frameworks.",
  },
  {
    number: "04",
    title: "Global Mindset",
    description:
      "Interfaces designed and culturally adapted to operate in large, high-complexity, high-demand markets, including LATAM and Asia.",
  },
] as const;

const experience = [
  {
    period: "February 2026 – Present",
    role: "Product Designer",
    company: "Multibet",
    description:
      "Responsible for end-to-end product and gamification design in complex iGaming/Betting environments. Leading a Design Tokens audit and the structured migration of libraries to Supernova DS.",
  },
  {
    period: "December 2025 – February 2026",
    role: "Product Designer Freelancer",
    company: "Freelance",
    description:
      "Worked as a freelancer on Product Design projects between the end of my time at Ana Gaming and starting at Multibet.",
  },
  {
    period: "April 2025 – December 2025",
    role: "UX Designer",
    company: "Ana Gaming (Cassino.bet / 7K.bet)",
    description:
      "Full redesign of Cassino.bet's sportsbook experience and laid the initial foundations of the unified multi-tenant Design System.",
  },
  {
    period: "April 2024 – April 2025",
    role: "UI/UX Freelancer",
    company: "Freelance",
    description:
      "Worked as a freelancer on UI/UX projects after returning from an exchange program in the United States, until starting at Ana Gaming.",
  },
  {
    period: "December 2023 – March 2024",
    role: "Work and Travel",
    company: "Alterra Mountain Company",
    description:
      "Exchange program in the United States focused on improving my English. Worked on designing and optimizing booking, back-office and digital hospitality-operations interfaces for mountain resort experiences.",
  },
  {
    period: "July 2023 – November 2023",
    role: "UI/UX Freelancer",
    company: "Freelance",
    description:
      "Worked as a freelancer on UI/UX projects between leaving Instituto ESPE and starting the exchange program in the United States.",
  },
  {
    period: "September 2020 – July 2023",
    role: "Design Supervisor",
    company: "Instituto ESPE",
    description:
      "Led and managed Instituto ESPE's graphic and digital design team, establishing processes and visual-consistency standards.",
  },
] as const;

const education = [
  {
    period: "2020 – 2022",
    title: "Bachelor's Degree, Graphic Design",
    institution: "UniFil - Centro Universitário Filadélfia",
  },
  {
    period: "2015 – 2018",
    title: "Integrated Technical Program in Information Technology",
    institution: "IFPR Londrina (Instituto Federal do Paraná)",
  },
] as const;

const skills = [
  "Claude Cowork",
  "Workflow Automation",
  "Design Tokens",
  "Design Ops",
  "iGaming & Sportsbook",
  "Market Research",
  "High-Fidelity Prototyping",
] as const;

// Real credentials, already in English — reused verbatim from
// app/sobre/page.tsx (see this file's own top comment for why these
// aren't translated: the URLs verify the exact English title shown).
const certifications = [
  {
    title: "Google UX Design Professional Certificate",
    issuer: "Google",
    url: "https://www.coursera.org/account/accomplishments/specialization/Y2WKA6Q7A19U",
    logo: "google",
  },
  {
    title: "Design a User Experience for Social Good & Prepare for Jobs",
    issuer: "Google",
    url: "https://www.coursera.org/account/accomplishments/verify/IBJJNGCDBRSR",
    logo: "google",
  },
  {
    title: "Build Dynamic User Interfaces (UI) for Websites",
    issuer: "Google",
    url: "https://www.coursera.org/account/accomplishments/verify/DPWEC33B85JH",
    logo: "google",
  },
  {
    title: "Create High-Fidelity Designs and Prototypes in Figma",
    issuer: "Google",
    url: "https://www.coursera.org/account/accomplishments/verify/HZW8WR203NHO",
    logo: "google",
  },
  {
    title: "Claude para Designers",
    issuer: "Tera",
    url: "https://credentials.somostera.com/d2a2aaf94c6cd04c9afdf55dcdadbebb",
    logo: "tera",
  },
  {
    title: "Conduct UX Research and Test Early Concepts",
    issuer: "Google",
    url: "https://www.coursera.org/account/accomplishments/verify/ILK6P2UV4GLU?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    logo: "google",
  },
  {
    title: "Build Wireframes and Low-Fidelity Prototype",
    issuer: "Google",
    url: "https://www.coursera.org/account/accomplishments/verify/UMN275LDU6GZ",
    logo: "google",
  },
  {
    title: "Foundations of User Experience (UX) Design",
    issuer: "Google",
    url: "https://www.coursera.org/account/accomplishments/verify/BM65601UQ0NF",
    logo: "google",
  },
  {
    title: "Start the UX Design Process: Empathize, Define, and Ideate",
    issuer: "Google",
    url: "https://www.coursera.org/account/accomplishments/verify/LWRYK5Q53102",
    logo: "google",
  },
] as const;

const certificationLogos = {
  google: "/images/sobre/logos/google.png",
  tera: "/images/sobre/logos/tera.png",
} as const;

/** Standard LinkedIn "in" brand glyph — see app/sobre/page.tsx's own
 * file-level comment for why this is inlined instead of a lucide import
 * or a downloaded Figma asset. Identical copy, reused here. */
function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function AboutPageEn() {
  return (
    <main className="w-full">
      {/* Hero — see app/sobre/page.tsx for the full-bleed/photo-bleed
          layout history. Structure copied 1:1, only text changed. */}
      <section className="relative w-full overflow-hidden bg-surface-primary">
        <div className="relative z-10 mx-auto flex w-full max-w-[1312px] flex-col px-6 pb-16 pt-28 sm:pt-32 lg:px-16 lg:pb-24 lg:pt-40">
          <div className="flex w-full max-w-[640px] flex-col items-start gap-8 lg:max-w-[48%]">
            <div className="flex flex-col items-start gap-4">
              <p className="caption text-brand-500">ABOUT ME</p>
              <h1 className="heading-display text-text-primary">
                Building systems that help teams and products scale
              </h1>
              <p className="heading-h4 text-text-secondary">
                Product Designer specialized in{" "}
                <span className="text-brand-500">Design Systems</span>,{" "}
                <span className="text-brand-500">Design Ops</span> and{" "}
                <span className="text-brand-500">applied AI</span> across
                end-to-end workflows.
              </p>
            </div>

            <div className="flex w-full items-start gap-6 sm:gap-10">
              <div className="flex flex-col gap-1">
                <p className="heading-h2 text-brand-500">+2 Years</p>
                <p className="body-sm text-text-secondary">
                  Of experience focused on product
                </p>
              </div>
              <div className="h-[60px] w-px shrink-0 bg-border-background" />
              <div className="flex flex-col gap-1">
                <p className="heading-h2 text-text-primary">
                  LATAM &amp; Asia
                </p>
                <p className="body-sm text-text-secondary">
                  Focused on global products
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Photo — edge-to-edge bleed, no card. See app/sobre/page.tsx. */}
        <div className="relative mt-10 aspect-[4/5] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[40%]">
          <Image
            src="/images/sobre/portrait.jpg"
            alt="Photo of João Riedo"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* Perspective */}
      <section className="flex w-full flex-col px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1312px] flex-col gap-8 lg:flex-row lg:gap-20">
          <div className="flex w-full flex-col items-start gap-4 lg:w-[400px] lg:shrink-0">
            <Badge accent>Approach</Badge>
            <h2 className="heading-h2 text-text-primary">
              My Work Philosophy
            </h2>
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <p className="body-lg text-text-primary">
              I believe design goes far beyond aesthetics. My main focus is
              building intelligent systems that let product teams create and
              scale with maximum technical efficiency.
            </p>
            <p className="body-base text-text-secondary">
              Today I specialize in Design Operations, using advanced AI
              (like Claude and automation workflows) to eliminate repetitive
              operational work. My mission is to turn days of documentation,
              color tokenization and handoff prep into tasks completed
              consistently and precisely in just a few hours.
            </p>
            <p className="body-base text-text-secondary">
              By combining a product-metrics-driven mindset with the
              solidity of a robust design system, I make sure the
              engineering team receives flawless specs and the end user
              gets a seamless, integrated experience.
            </p>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section
        id="diferenciais"
        className="flex w-full flex-col items-center justify-center gap-8 p-6 sm:p-10 lg:p-16"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <p className="caption text-brand-500">WHAT SETS ME APART</p>
          <h2 className="heading-h2 text-text-primary">
            What I bring to the table
          </h2>
        </div>

        <div className="mx-auto flex w-full max-w-[1312px] flex-wrap items-stretch justify-center gap-x-4 gap-y-4">
          {differentiators.map((pillar, i) => (
            <Reveal
              key={pillar.number}
              className="flex-1 basis-[260px]"
              delay={i * 130}
            >
              <PillarCard
                number={pillar.number}
                title={pillar.title}
                description={pillar.description}
                variant="home"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Career path */}
      <section
        id="trajetoria"
        className="flex w-full flex-col items-center gap-8 p-6 sm:p-10 lg:p-16"
      >
        <div className="flex flex-col items-center text-center">
          <p className="caption text-brand-500">CAREER PATH</p>
          <h2 className="heading-h2 text-text-primary">
            Professional Experience
          </h2>
        </div>

        <div className="flex w-full max-w-[1000px] flex-col gap-8">
          {experience.map((role, i) => (
            <Reveal key={role.company + role.period} delay={i * 90}>
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-10">
                <div className="w-full shrink-0 sm:w-[200px]">
                  <p className="label-button text-brand-500">{role.period}</p>
                </div>
                <div className="hidden shrink-0 flex-col items-center sm:flex sm:w-6">
                  <span className="size-4 shrink-0 rounded-full bg-on-surface-primary" />
                  {i < experience.length - 1 && (
                    <span className="w-px flex-1 bg-border-background" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 pb-2">
                  <p className="heading-h3 text-text-primary">{role.role}</p>
                  <p className="body-lg text-brand-500">{role.company}</p>
                  <p className="body-base text-text-secondary">
                    {role.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Education */}
      <section
        id="formacao"
        className="flex w-full flex-col items-center gap-10 bg-surface-primary px-6 py-16 sm:px-10 lg:px-16 lg:py-20"
      >
        <div className="mx-auto flex w-full max-w-[1312px] flex-col gap-10 lg:flex-row lg:gap-20">
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex flex-col items-start gap-3">
              <Badge accent>Education</Badge>
              <h3 className="heading-h3 text-text-primary">
                Education &amp; Technical Foundation
              </h3>
            </div>
            <div className="flex flex-col gap-6">
              {education.map((edu) => (
                <div key={edu.title} className="flex flex-col gap-2">
                  <p className="label-button text-brand-500">{edu.period}</p>
                  <p className="heading-h4 text-text-primary">{edu.title}</p>
                  <p className="body-base text-text-secondary">
                    {edu.institution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <h4 className="heading-h4 text-text-primary">Top Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="body-sm rounded-full border border-border-surface-primary bg-surface-primary px-3.5 py-2 text-on-surface-secondary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1312px] flex-col gap-6">
          <h4 className="heading-h4 text-text-primary">Certifications</h4>
          <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-6">
            {certifications.map((cert) => (
              <a
                key={cert.title}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-2xl transition-opacity hover:opacity-80"
              >
                <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-surface-secondary">
                  <Image
                    src={certificationLogos[cert.logo]}
                    alt={cert.issuer}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5 pt-1">
                  <p className="body-base font-semibold text-text-primary">
                    {cert.title}
                  </p>
                  <p className="body-sm text-text-secondary">{cert.issuer}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Direct contact */}
      <section
        id="contato-direto"
        className="flex w-full flex-col items-center gap-8 px-6 py-16 sm:px-10 lg:px-16 lg:py-20"
      >
        <p className="caption text-brand-500">DIRECT CONTACT</p>

        <div className="flex w-full max-w-[1000px] flex-col items-stretch gap-4 sm:flex-row sm:justify-center">
          {[
            {
              key: "email",
              href: "mailto:joaoriedodesign@gmail.com",
              label: "E-MAIL",
              value: "joaoriedodesign@gmail.com",
              Icon: Mail,
              external: false,
            },
            {
              key: "phone",
              href: "tel:+554331910157",
              label: "PHONE",
              value: "+55 43 3191-0157",
              Icon: Smartphone,
              external: false,
            },
            {
              key: "linkedin",
              href: "https://linkedin.com/in/ri3do",
              label: "LINKEDIN",
              value: "in/ri3do",
              Icon: LinkedInIcon,
              external: true,
            },
          ].map(({ key, href, label, value, Icon, external }, i) => (
            <Reveal key={key} className="flex-1 sm:max-w-[280px]" delay={i * 90}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-full w-full flex-col items-center gap-2 rounded-3xl border border-border-surface-primary bg-surface-primary p-6 text-center transition-colors hover:border-border-surface-secondary"
              >
                <Icon className="size-6 text-brand-500" />
                <p className="body-sm text-on-surface-secondary">{label}</p>
                <p className="body-lg break-words text-on-surface-primary">
                  {value}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
