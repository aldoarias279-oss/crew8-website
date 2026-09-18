import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { pages } from "@/content/pages";
import { logoAlt, site } from "@/content/site";
import { images } from "@/lib/image-manifest";

export function SiteFooter() {
  return (
    /* #0c1013 is the footer tone from the original concept: a step darker than the ink sections. */
    <footer className="bg-[#0c1013] text-white/70">
      <div aria-hidden="true" className="h-px w-full bg-[linear-gradient(90deg,var(--color-brand-red)_0_38%,var(--color-brand-gold)_38%_52%,rgba(255,255,255,0.1)_52%)]" />
      <Container>
        <div className="flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="flex items-center gap-4">
            <Image
              src={images.acfdLogo.src}
              alt={logoAlt}
              width={images.acfdLogo.width}
              height={images.acfdLogo.height}
              loading="lazy"
              sizes="64px"
              className="h-14 w-auto"
            />
            <div>
              <p className="font-display text-xl leading-none font-bold uppercase tracking-[0.14em] text-white">
                {site.name}
              </p>
              <p className="mt-1.5 text-[0.6875rem] tracking-[0.16em] text-white/55 uppercase">{site.organization}</p>
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="flex max-w-xl flex-wrap gap-x-6 gap-y-3">
              {pages.map((page) => (
                <li key={page.slug}>
                  <Link href={`/${page.slug}`} className="label text-white/65 transition-colors hover:text-brand-gold">
                    {page.label}
                  </Link>
                </li>
              ))}
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="label text-white/65 transition-colors hover:text-brand-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-7 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.organization}
          </p>
          {/* Placeholder kept visible so it cannot ship unnoticed. See src/content/site.ts. */}
          <p className="font-mono text-[0.75rem] text-brand-gold/85">{site.footer.note}</p>
        </div>
      </Container>
    </footer>
  );
}
