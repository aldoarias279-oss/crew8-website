import type { Metadata } from "next";
import { BrandStripe } from "@/components/brand-stripe";
import { Container } from "@/components/container";
import { PhotoGrid } from "@/components/photo-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.gallery.metaTitle,
  description: site.gallery.metaDescription,
  alternates: { canonical: "/gallery" },
  openGraph: {
    url: "/gallery",
    title: site.gallery.metaTitle,
    description: site.gallery.metaDescription,
  },
};

export default function GalleryPage() {
  const { gallery } = site;

  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* Dark masthead so the page opens against the fixed header rather than a pale gap. */}
        <section className="relative grain bg-ink pt-32 pb-14 sm:pt-36 sm:pb-16">
          <Container>
            <div className="flex items-center gap-3">
              <span className="label text-brand-gold">Gallery</span>
              <span aria-hidden="true" className="h-px w-8 bg-white/25" />
              <span className="label text-white/70">{gallery.eyebrow}</span>
            </div>
            <h1 className="mt-5 text-[clamp(2.75rem,6.5vw,5rem)] leading-[0.9] font-bold uppercase tracking-[-0.015em] text-white">
              {gallery.heading}
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/70">{gallery.intro}</p>
          </Container>
        </section>

        <BrandStripe />

        <section aria-label="Photographs" className="bg-smoke py-14 sm:py-18">
          <Container>
            <PhotoGrid />
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
