import Image from "next/image";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { photos, site } from "@/content/site";
import { images } from "@/lib/image-manifest";

export function Mission() {
  const { mission } = site;
  const photo = images.communityProject;

  return (
    <section id="mission" aria-labelledby="mission-heading" className="relative grain bg-ink py-20 sm:py-28">
      <Container>
        <SectionHeading
          number={mission.number}
          eyebrow={mission.eyebrow}
          headingId="mission-heading"
          heading={mission.headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          intro={mission.intro}
          tone="dark"
        />

        {/* Photograph and copy overlap by one column on wide screens so the pairing reads
            as a spread rather than two boxes side by side. */}
        <div className="mt-14 grid gap-0 lg:mt-16 lg:grid-cols-12">
          <div className="relative aspect-[4/3] lg:col-span-8 lg:col-start-1 lg:row-start-1 lg:aspect-auto lg:h-[560px]">
            <Image
              src={photo.src}
              alt={photos.communityProject.alt}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              placeholder="blur"
              blurDataURL={photo.blurDataURL}
              className="object-cover object-[50%_45%]"
            />
          </div>

          <div className="relative z-10 flex flex-col justify-center bg-charcoal px-7 py-10 sm:px-10 sm:py-12 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:my-12 lg:px-11">
            <h3 className="text-[clamp(1.85rem,2.6vw,2.35rem)] leading-[1.02] font-bold uppercase text-white">
              {mission.storyHeading}
            </h3>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-white/75">{mission.storyBody}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
