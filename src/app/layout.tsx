import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { HashScroll } from "@/components/hash-scroll";
import { site } from "@/content/site";

/**
 * Barlow Condensed carries the headlines: industrial and authoritative without tipping into
 * the condensed faces that read as sports branding. IBM Plex Sans sets body copy because it
 * reads institutional rather than start-up, and Plex Mono handles section numbering and the
 * uppercase field labels.
 */
const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display-src",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans-src",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono-src",
  display: "swap",
});

// TODO: replace with the real production domain. example.com is the reserved placeholder
// domain, kept here so social metadata resolves to absolute URLs during builds.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  applicationName: `${site.name} — ${site.organization}`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${site.name} — ${site.organization}`,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#101418",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-brand-red focus:px-4 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <HashScroll />
        {children}
      </body>
    </html>
  );
}
