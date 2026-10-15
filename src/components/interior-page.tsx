import Image from "next/image";
import { BrandStripe } from "@/components/brand-stripe";
import { Container } from "@/components/container";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPage, pagesInHub, type InteriorPage, type PageListItem, type PagePhotoSlot } from "@/content/pages";

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

function itemText(item: PageListItem) {
  return typeof item === "string" ? item : item.text;
}

function ContentList({ items, indented }: { items: PageListItem[]; indented: boolean }) {
  return (
    <ul className={`${indented ? "mt-4" : "mt-2"} border-t border-white/12`}>
      {items.map((item) => {
        const text = itemText(item);
        const href = typeof item === "string" ? undefined : item.href;
        const kicker = href ? getPage(href.replace(/^\//, ""))?.kicker : undefined;

        if (!href) {
          return (
            <li key={text} className="border-b border-white/12 py-3.5 text-[1.0625rem] leading-snug text-white/80">
              {text}
            </li>
          );
        }

        return (
          <li key={href} className="border-b border-white/12">
            <a
              href={href}
              className="flex flex-col gap-2 py-3.5 text-[1.0625rem] leading-snug text-white/80 transition-colors hover:text-white sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <span>{text}</span>
              {kicker ? <span className="label shrink-0 text-brand-gold">{kicker}</span> : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Topics that used to fill the header, now listed on their hub page. */
function HubIndex({ page }: { page: InteriorPage }) {
  const linkedHrefs = new Set(
    (page.groups ?? []).flatMap((group) =>
      group.items.flatMap((item) => (typeof item === "string" ? [] : [item.href])),
    ),
  );
  const topics = pagesInHub(page.slug).filter((topic) => !linkedHrefs.has(`/${topic.slug}`));
  if (topics.length === 0) return null;

  const hasLead = page.paragraphs.length > 0 || (page.groups?.length ?? 0) > 0;

  return (
    <div className={hasLead ? "mt-14" : undefined}>
      <div className="flex items-center gap-3">
        <span className="label text-brand-gold">In this section</span>
        <span aria-hidden="true" className="h-px flex-1 bg-white/12" />
      </div>
      <ul className="border-t border-white/12">
        {topics.map((topic, index) => {
          const summary = topic.paragraphs[0] ?? topic.groups?.[0]?.items.map(itemText).join(" · ");

          return (
            <li key={topic.slug} className="border-b border-white/12">
              <a
                href={`/${topic.slug}`}
                className="group grid gap-3 py-6 sm:grid-cols-[3.5rem_1fr] sm:items-start sm:gap-6"
              >
                <span className="label text-brand-gold">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="font-display text-[1.65rem] leading-none font-semibold uppercase tracking-[0.02em] text-white transition-colors group-hover:text-brand-gold">
                      {topic.title}
                    </span>
                    {topic.kicker ? <span className="label shrink-0 text-white/45">{topic.kicker}</span> : null}
                  </span>
                  {summary ? (
                    <span className="mt-3 block max-w-[62ch] text-[1.0625rem] leading-relaxed text-white/70">
                      {summary}
                    </span>
                  ) : null}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Once you are inside a section, the other topics stay one click away. */
function SectionLinks({ page }: { page: InteriorPage }) {
  if (!page.hub) return null;
  const siblings = pagesInHub(page.hub);
  const hub = getPage(page.hub);
  if (!hub || siblings.length === 0) return null;

  return (
    <nav aria-label={hub.label} className="mt-8 border-t border-white/12 pt-5">
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {siblings.map((sibling) => {
          const current = sibling.slug === page.slug;
          return (
            <li key={sibling.slug}>
              {current ? (
                <span aria-current="page" className="label text-brand-gold">
                  {sibling.label}
                </span>
              ) : (
                <a href={`/${sibling.slug}`} className="label text-white/55 transition-colors hover:text-white">
                  {sibling.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
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
              {page.hub ? (
                <a href={`/${page.hub}`} className="label text-brand-gold transition-colors hover:text-white">
                  {page.eyebrow}
                </a>
              ) : (
                <span className="label text-brand-gold">{page.eyebrow}</span>
              )}
              <span aria-hidden="true" className="h-px w-8 bg-white/25" />
              <span className="label text-white/70">Crew 8</span>
            </div>
            <h1 className="mt-5 max-w-[18ch] text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.9] font-bold uppercase tracking-[-0.015em] text-white">
              {page.title}
            </h1>
            {page.kicker ? (
              <p className="mt-6 max-w-[54ch] text-[1.125rem] leading-relaxed text-white/80">{page.kicker}</p>
            ) : null}
            <SectionLinks page={page} />
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
                <div key={group.heading ?? itemText(group.items[0])} className="mt-10">
                  {group.heading ? (
                    <h2 className="font-display text-2xl font-bold uppercase tracking-[0.02em] text-white">
                      {group.heading}
                    </h2>
                  ) : null}
                  <ContentList items={group.items} indented={Boolean(group.heading)} />
                </div>
              ))}

              <HubIndex page={page} />
            </div>

            {page.photoSlots.length > 0 ? (
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
            ) : null}
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
