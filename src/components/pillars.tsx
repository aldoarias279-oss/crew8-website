import { Container } from "@/components/container";
import { site } from "@/content/site";

/**
 * Protect / Respond / Restore / Serve.
 *
 * A single ruled band rather than four cards: the 1px grid gaps do the dividing, so the
 * same markup reads as columns on desktop and as a ruled list on a phone.
 */
export function Pillars() {
  return (
    <section aria-label="Protect, Respond, Restore, Serve" className="relative grain bg-ink">
      <Container className="px-0 sm:px-0">
        <ul className="grid gap-px bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
          {site.pillars.map((pillar) => (
            <li key={pillar.number} className="bg-ink px-5 py-7 sm:px-7 sm:py-8">
              <p className="label text-brand-gold">{pillar.number}</p>
              <h3 className="mt-3 text-[1.65rem] leading-none font-bold uppercase tracking-[0.01em] text-white">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-snug text-white/60">{pillar.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
