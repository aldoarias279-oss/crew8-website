import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { photos, site } from "@/content/site";
import { images } from "@/lib/image-manifest";

export function Hero() {
  const { hero } = site;
  const photo = images.crew8Group;

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate flex min-h-[92svh] items-end">
      <Image
        src={photo.src}
        alt={photos.crew8Group.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        className="-z-10 object-cover object-[50%_38%]"
      />
      {/* Two restrained washes: one from the left so type stays legible, one from the base. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,13,16,0.84)_0%,rgba(9,13,16,0.46)_46%,rgba(9,13,16,0.12)_80%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(9,13,16,0.8)_0%,rgba(9,13,16,0)_52%)]"
      />

      <Container className="pt-36 pb-16 sm:pb-20">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-1 w-11 bg-brand-ember" />
          <p className="label text-brand-gold">{hero.eyebrow}</p>
        </div>

        <h1
          id="hero-heading"
          className="mt-6 text-[clamp(4.25rem,13vw,10.5rem)] leading-[0.82] font-bold uppercase tracking-[-0.035em] text-white"
        >
          {hero.heading}
        </h1>

        <p className="mt-4 text-[clamp(0.8125rem,1.8vw,1.0625rem)] font-medium tracking-[0.2em] text-white/75 uppercase">
          {hero.organization}
        </p>

        <div className="mt-7 max-w-3xl border-t border-brand-gold/45 pt-6">
          <p className="font-display text-[clamp(1.5rem,3.6vw,2.6rem)] leading-[1.05] font-semibold uppercase tracking-[0.005em] text-white">
            {hero.kicker}
          </p>
          <p className="mt-5 max-w-[54ch] text-[1.0625rem] leading-relaxed text-white/80">{hero.body}</p>
        </div>

        <div className="mt-9 flex flex-wrap gap-3.5">
          {hero.actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={
                action.variant === "primary"
                  ? "label rounded-[3px] bg-brand-red px-6 py-4 text-white transition-colors hover:bg-brand-ember"
                  : "label rounded-[3px] border-2 border-white/75 px-6 py-[0.8125rem] text-white transition-colors hover:border-white hover:bg-white/10"
              }
            >
              {action.label}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
