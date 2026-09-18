import Image from "next/image";
import { BrandStripe } from "@/components/brand-stripe";
import { Container } from "@/components/container";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { InteriorPage, PagePhotoSlot } from "@/content/pages";

function PhotoSlot({ slot, index }: { slot: PagePhotoSlot; index: number }) {
  const number = String(index + 1).padStart(2, "0");

  if (slot.src) {
    return (
      <figure>
        <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
          <Image
            src={slot.src}
            alt={slot.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        {slot.caption ? (
          <figcaption className="mt-3 flex items-center gap-2.5">
            <span aria-hidden="true" className="h-px w-5 bg-brand-gold" />
            <span className="font-display text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white/55">
              {slot.caption}
            </span>
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <div className="flex aspect-[4/3] flex-col items-start justify-end border border-dashed border-white/20 bg-charcoal/60 p-4">
      <p className="label text-brand-gold">{number}</p>
      <p className="mt-2 font-mono text-[0.75rem] leading-snug text-white/45">TODO — add photograph</p>
    </div>
  );
}

export function InteriorPageLayout({ page }: { page: InteriorPage }) {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="relative grain bg-ink pt-32 pb-14 sm:pt-36 sm:pb-16">
          <Container>
            <div className="flex items-center gap-3">
              <span className="label text-brand-gold">{page.eyebrow}</span>
              <span aria-hidden="true" className="h-px w-8 bg-white/25" />
              <span className="label text-white/70">Crew 8</span>
            </div>
            <h1 className="mt-5 max-w-[18ch] text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.9] font-bold uppercase tracking-[-0.015em] text-white">
              {page.title}
            </h1>
            {page.kicker ? (
              <p className="mt-6 max-w-[54ch] text-[1.125rem] leading-relaxed text-white/80">{page.kicker}</p>
            ) : null}
          </Container>
        </section>

        <BrandStripe />

        <section className="relative grain bg-ink py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl">
              {page.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="mt-5 text-[1.0625rem] leading-relaxed text-white/75 first:mt-0">
                  {paragraph}
                </p>
              ))}

              {page.groups?.map((group) => (
                <div key={group.heading ?? group.items[0]} className="mt-10">
                  {group.heading ? (
                    <h2 className="font-display text-2xl font-bold uppercase tracking-[0.02em] text-white">
                      {group.heading}
                    </h2>
                  ) : null}
                  <ul className={`${group.heading ? "mt-4" : "mt-2"} border-t border-white/12`}>
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="border-b border-white/12 py-3.5 text-[1.0625rem] leading-snug text-white/80"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <div className="flex items-center gap-3">
                <span className="label text-brand-gold">Photographs</span>
                <span aria-hidden="true" className="h-px flex-1 bg-white/12" />
              </div>
              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {page.photoSlots.map((slot, index) => (
                  <li key={slot.src ?? `slot-${index}`}>
                    <PhotoSlot slot={slot} index={index} />
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
