import Image from "next/image";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { photos, site } from "@/content/site";
import { images } from "@/lib/image-manifest";

/**
 * Two of the three capability photographs are portrait originals, so each one carries a
 * focal point that keeps its subject inside the 4:3 frame.
 */
const focus: Record<string, string> = {
  vegetationManagement: "object-center",
  stormDamagedTrees: "object-[50%_50%]",
  erosionControl: "object-[50%_40%]",
};

export function Capabilities() {
  const { capabilities } = site;

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative grain border-t border-white/10 bg-ink py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          number={capabilities.number}
          eyebrow={capabilities.eyebrow}
          heading={capabilities.heading}
          intro={capabilities.intro}
          tone="dark"
          headingId="work-heading"
        />

        {/* A plain three-up grid: the only structure is the rule under each photograph, so
            the columns read as an index rather than as three cards. */}
        <ul className="mt-12 grid gap-10 sm:gap-8 md:grid-cols-3 lg:mt-16 lg:gap-10">
          {capabilities.items.map((item) => {
            const photo = images[item.image];
            const detail = photos[item.image];

            return (
              <li key={item.index}>
                <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                  <Image
                    src={photo.src}
                    alt={detail.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 31vw, 100vw"
                    placeholder="blur"
                    blurDataURL={photo.blurDataURL}
                    className={`object-cover ${focus[item.image] ?? "object-center"}`}
                  />
                </div>

                <div className="mt-5 border-t border-white/15 pt-4">
                  <p className="label">
                    <span className="text-brand-ember">{item.index}</span>
                    <span className="text-white/35"> / </span>
                    <span className="text-white/70">{item.category}</span>
                  </p>
                  <h3 className="mt-3 text-[1.5rem] leading-[1.08] font-bold uppercase text-white">{item.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/70">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
