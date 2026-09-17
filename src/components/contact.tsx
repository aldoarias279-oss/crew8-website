import Image from "next/image";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { logoAlt, site } from "@/content/site";
import { images } from "@/lib/image-manifest";

/*
 * The source concept linked to #contact but was truncated before any contact section was
 * written, so there is no real email, phone number, or address to preserve. Every value
 * rendered here comes from site.ts and is deliberately styled as an unmistakable
 * placeholder. Replace them in src/content/site.ts, and delete any line that should not
 * be published rather than leaving a placeholder behind.
 */
function Placeholder({ children }: { children: string }) {
  return (
    <span className="mt-1.5 inline-block border border-dashed border-brand-gold/50 px-2.5 py-1 font-mono text-[0.8125rem] text-brand-gold">
      {children}
    </span>
  );
}

export function Contact() {
  const { contact } = site;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative grain bg-charcoal py-20 sm:py-28">
      <Container>
        <SectionHeading
          number={contact.number}
          eyebrow={contact.eyebrow}
          heading={contact.heading}
          tone="dark"
          headingId="contact-heading"
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Placeholder>{contact.intro}</Placeholder>

            <dl className="mt-10 border-t border-white/12">
              {contact.details.map((detail) => (
                <div key={detail.label} className="border-b border-white/12 py-5">
                  <dt className="label text-white/55">{detail.label}</dt>
                  <dd>
                    <Placeholder>{detail.value}</Placeholder>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <p className="label text-white/55">Emergencies</p>
              <Placeholder>{contact.emergencyNote}</Placeholder>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Image
              src={images.acfdLogo.src}
              alt={logoAlt}
              width={images.acfdLogo.width}
              height={images.acfdLogo.height}
              loading="lazy"
              sizes="184px"
              className="h-auto w-40 sm:w-48"
            />
            <p className="mt-7 font-display text-2xl leading-tight font-bold uppercase tracking-[0.06em] text-white">
              {site.organization}
            </p>
            <p className="mt-4 max-w-[34ch] text-[1.0625rem] leading-relaxed text-white/70">{site.hero.kicker}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
