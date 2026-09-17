import type { ReactNode } from "react";

/**
 * Section masthead: numbered mono eyebrow on a rule, oversized condensed heading, and an
 * optional standfirst set to one side. Deliberately typographic — no panels or icons.
 */
export function SectionHeading({
  number,
  eyebrow,
  heading,
  intro,
  tone = "light",
  headingId,
}: {
  number: string;
  eyebrow: string;
  heading: ReactNode;
  intro?: string;
  tone?: "light" | "dark";
  headingId?: string;
}) {
  const dark = tone === "dark";

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
      <div className="lg:col-span-7">
        <div className="flex items-center gap-3">
          <span className={`label ${dark ? "text-brand-gold" : "text-brand-red"}`}>{number}</span>
          <span className={`h-px w-8 ${dark ? "bg-white/25" : "bg-ink/20"}`} aria-hidden="true" />
          <span className={`label ${dark ? "text-white/70" : "text-ink/60"}`}>{eyebrow}</span>
        </div>
        <h2
          id={headingId}
          className={`mt-5 text-[clamp(2.5rem,5.4vw,4.25rem)] leading-[0.92] font-bold uppercase tracking-[-0.01em] ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {heading}
        </h2>
      </div>
      {intro ? (
        <p
          className={`max-w-[46ch] text-[1.0625rem] leading-relaxed lg:col-span-5 ${
            dark ? "text-white/70" : "text-ink/70"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
