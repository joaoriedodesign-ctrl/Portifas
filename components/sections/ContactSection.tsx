"use client";

import { FormEvent } from "react";
import { ArrowRight } from "lucide-react";

/**
 * "Entre em contato" section — a simple form that hands off straight to
 * WhatsApp instead of collecting submissions somewhere, since this is a
 * static site with no backend. Built 2026-08-27 per explicit user
 * request ("pode ser um forms simples que redireciona para o whatsapp").
 * No Figma node exists for this yet (same situation MobileNav.tsx was in
 * when it was first built) — flagging that it should get added to the
 * PORTIFÓLIO Figma file once validated, so Figma stays the source of
 * truth going forward instead of drifting from what's shipped.
 *
 * Reused in three places, per the same request:
 * 1. `app/contato/page.tsx` — the dedicated screen every "Entrar em
 *    contato" CTA (Hero has none, but Footer and MobileNav do) and the
 *    header's "CONTATO" link now point to (previously `/#contato`, a
 *    homepage anchor into a section that never existed — see the dated
 *    updates on Header.tsx/HeaderNav.tsx/MobileNav.tsx/Footer.tsx's own
 *    doc comments for that history).
 * 2. `app/page.tsx` (home), appended after `<ProjectsSection />`.
 * 3. `app/case-studies/[slug]/page.tsx`, appended after "Próximo
 *    Projeto", so every case study ends with a way to reach out.
 *
 * WHATSAPP NUMBER: the user's personal number, given directly in chat —
 * "+55 43 98412-1348". `wa.me` links want country code + DDD + number,
 * digits only, no `+`/spaces/dashes: `5543984121348`. This is
 * deliberately the personal WhatsApp, not the landline
 * (`+55 43 3191-0157`) already listed on `/sobre`'s "Contato Direto"
 * cards — the user asked for this specific number for this form.
 *
 * REDIRECT BEHAVIOR: `window.open(url, "_blank")` instead of a same-tab
 * `location.href` navigation, so the portfolio tab stays open in the
 * background instead of being replaced — standard practice for a
 * WhatsApp CTA, and matches how an external link (e.g. the LinkedIn card
 * on `/sobre`) already behaves on this site. This only ever runs from a
 * real form-submit click (a user gesture), so the browser's popup
 * blocker doesn't interfere.
 *
 * FORM FIELDS: kept to the two the message actually needs (Nome,
 * Mensagem) — no e-mail/phone field, since the whole point of this form
 * is to skip email and go straight to a WhatsApp conversation. Both are
 * required (native HTML validation, no JS needed) so the WhatsApp
 * message this builds is never sent blank.
 *
 * INPUT STYLING IS A NEW, UNDOCUMENTED PATTERN — flagging per the
 * project's token rule (docs/design-tokens.md): there's no "form field"
 * section yet, since every prior interactive surface on this site is a
 * button or a link. Built entirely from existing semantic tokens rather
 * than a raw hex/size (`surface/primary` fill, `border/surface-primary`
 * default border stepping to `border/surface-secondary` on focus,
 * `body-base` text style, `caption` for the field label) so nothing here
 * is a value outside the documented scale — but the *pattern* (a
 * bordered rounded input matching card styling) is a proposal, not
 * pulled from an existing spec. Worth formalizing an "Inputs" section in
 * docs/design-tokens.md if more forms get added later. The global
 * `:focus-visible` rule (app/globals.css) already gives both fields a
 * visible keyboard-focus outline on top of this — accessibility is not
 * opt-in per the project persona checklist.
 *
 * Submit button mirrors Hero's/Footer's primary CTA link exactly
 * (`hover:scale-105` + a translating trailing arrow) rather than the
 * shared `Button` component — same reasoning Footer.tsx's own comment
 * already gives: this is one of the most important CTAs on the site, so
 * it gets the richer treatment already established for that class of
 * CTA instead of introducing a third button style.
 */
const WHATSAPP_NUMBER = "5543984121348";

export function ContactSection() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nome = String(data.get("nome") ?? "").trim();
    const mensagem = String(data.get("mensagem") ?? "").trim();

    const text = `Olá, João! Meu nome é ${nome}.\n\n${mensagem}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    form.reset();
  }

  return (
    <section
      id="contato"
      className="flex w-full flex-col items-center gap-10 px-6 py-16 sm:gap-12 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      <div className="flex w-full max-w-[640px] flex-col items-center gap-4 text-center">
        <p className="caption text-brand-500">CONTATO</p>
        <p className="heading-h2 text-text-primary">
          Vamos conversar sobre o seu projeto?
        </p>
        <p className="body-lg text-text-secondary">
          Preencha os campos abaixo — sua mensagem chega direto no meu
          WhatsApp, sem formulário de e-mail e sem espera.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[560px] flex-col items-center gap-5"
      >
        <div className="flex w-full flex-col gap-2 text-left">
          <label
            htmlFor="contato-nome"
            className="caption uppercase tracking-wide text-text-secondary"
          >
            Nome
          </label>
          <input
            id="contato-nome"
            name="nome"
            type="text"
            autoComplete="name"
            required
            placeholder="Como posso te chamar?"
            className="body-base w-full rounded-2xl border border-border-surface-primary bg-surface-primary px-5 py-3.5 text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-border-surface-secondary"
          />
        </div>

        <div className="flex w-full flex-col gap-2 text-left">
          <label
            htmlFor="contato-mensagem"
            className="caption uppercase tracking-wide text-text-secondary"
          >
            Mensagem
          </label>
          <textarea
            id="contato-mensagem"
            name="mensagem"
            required
            rows={5}
            placeholder="Conte um pouco sobre o que você precisa..."
            className="body-base w-full resize-none rounded-2xl border border-border-surface-primary bg-surface-primary px-5 py-3.5 text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-border-surface-secondary"
          />
        </div>

        <button
          type="submit"
          className="group mt-2 inline-flex items-center gap-3 rounded-full bg-cta-primary-bg px-9 py-4 transition-all duration-300 hover:scale-105 hover:bg-cta-primary-bg-hover active:scale-95"
        >
          <span className="label-button text-cta-primary-text">
            ENVIAR NO WHATSAPP
          </span>
          <ArrowRight
            aria-hidden
            className="size-[18px] text-cta-primary-text transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </form>
    </section>
  );
}
