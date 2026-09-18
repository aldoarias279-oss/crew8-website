import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InteriorPageLayout } from "@/components/interior-page";
import { getPage, pages } from "@/content/pages";
import { site } from "@/content/site";

export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};

  const description = page.paragraphs[0] ?? page.kicker ?? site.description;

  return {
    title: `${page.title} | Crew 8 — Alameda County Fire Department`,
    description,
    alternates: { canonical: `/${page.slug}` },
  };
}

export default async function SlidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  return <InteriorPageLayout page={page} />;
}
