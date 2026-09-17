"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox, type LightboxItem } from "@/components/lightbox";
import { photos } from "@/content/site";
import { images } from "@/lib/image-manifest";

type PhotoId = keyof typeof photos;

/**
 * Every thumbnail is the same modest 4:3 frame so the grid reads as an archive rather than
 * a feature layout — the full, uncropped photograph is one click away in the lightbox.
 * Two of the originals are portrait, so those carry a focal point that keeps the subject
 * inside the crop.
 */
const order: { id: PhotoId; focus: string }[] = [
  { id: "crew8Group", focus: "object-center" },
  { id: "handCrewShield", focus: "object-center" },
  { id: "sandbagOperations", focus: "object-[45%_50%]" },
  { id: "communityProject", focus: "object-[50%_45%]" },
  { id: "vegetationManagement", focus: "object-center" },
  { id: "stormDamagedTrees", focus: "object-[50%_50%]" },
  { id: "erosionControl", focus: "object-[50%_40%]" },
];

const lightboxItems: LightboxItem[] = order.map(({ id }) => ({
  ...images[id],
  alt: photos[id].alt,
  caption: photos[id].caption,
}));

export function PhotoGrid() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <p className="label text-ink/45">{`${String(order.length).padStart(2, "0")} photographs`}</p>

      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4">
        {order.map(({ id, focus }, index) => {
          const photo = images[id];
          const detail = photos[id];

          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`View photograph: ${detail.caption}`}
                className="group block w-full text-left"
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-ink">
                  <Image
                    src={photo.src}
                    alt={detail.alt}
                    fill
                    loading={index < 4 ? "eager" : "lazy"}
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 31vw, 47vw"
                    placeholder="blur"
                    blurDataURL={photo.blurDataURL}
                    className={`object-cover ${focus} transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/15"
                  />
                </span>

                <span aria-hidden="true" className="mt-3 flex items-center gap-2.5">
                  <span className="h-px w-3 flex-none bg-brand-red transition-all duration-300 group-hover:w-6" />
                  <span className="font-display text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-ink/75 transition-colors group-hover:text-ink">
                    {detail.caption}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <Lightbox items={lightboxItems} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </>
  );
}
