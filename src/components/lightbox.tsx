"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ImageAsset } from "@/lib/image-manifest";

export type LightboxItem = ImageAsset & { alt: string; caption: string };

/**
 * Built on the native <dialog> element, so focus trapping, background inertness and
 * Escape-to-close come from the platform instead of being re-implemented. Left and right
 * arrows step through the set.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onChange: (next: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (items.length === 0) return null;

  const active = index === null ? null : items[index];
  const step = (delta: number) => {
    if (index === null) return;
    onChange((index + delta + items.length) % items.length);
  };

  // The dialog is sized and coloured explicitly rather than inheriting the UA box model,
  // and its own surface is opaque so the overlay never depends on ::backdrop support.
  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          step(1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          step(-1);
        }
      }}
      aria-label="Photograph viewer"
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-ink/97 p-0 text-white backdrop:bg-ink/90"
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex flex-none items-center justify-between px-4 py-4 sm:px-7">
          <p className="label text-white/60" aria-live="polite">
            {index === null ? "" : `${String(index + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2.5 p-2 text-white transition-colors hover:text-brand-gold"
          >
            <span className="label">Close</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <div
          className="flex min-h-0 flex-1 items-center justify-center px-4 sm:px-7"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          {active ? (
            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={active.blurDataURL}
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          ) : null}
        </div>

        <div className="flex flex-none items-center justify-between gap-4 px-4 py-5 sm:px-7">
          <p className="flex min-w-0 items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 flex-none bg-brand-gold" />
            <span className="font-display truncate text-base uppercase tracking-[0.12em] text-white">
              {active?.caption}
            </span>
          </p>

          <div className="flex flex-none items-center gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photograph"
              className="border border-white/25 p-3 transition-colors hover:border-white hover:bg-white/10"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photograph"
              className="border border-white/25 p-3 transition-colors hover:border-white hover:bg-white/10"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
