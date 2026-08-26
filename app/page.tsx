import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="heading-display">João Lucas</h1>
      <p className="body-lg mt-4 text-text-secondary">
        Product Designer especializado em Design Systems — arquitetura de
        tokens, governança multi-tenant e workflows AI-assisted.
      </p>

      <div className="mt-8 flex gap-3">
        <Link href="/case-studies">
          <Button variant="primary">Ver case studies</Button>
        </Link>
        <a href="mailto:hello@example.com">
          <Button variant="secondary">Contato</Button>
        </a>
      </div>
    </main>
  );
}
