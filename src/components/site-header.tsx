"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Container } from "@/components/container";
import { pages } from "@/content/pages";
import { logoAlt, site } from "@/content/site";
import { images } from "@/lib/image-manifest";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const menuId = useId();

  const isCurrent = (href: string) => !href.includes("#") && href === pathname;
  const inSection = (href: string) => {
    if (href.includes("#")) return false;
    if (pathname === href) return true;
    const slug = href.slice(1);
    return pages.some((page) => page.hub === slug && pathname === `/${page.slug}`);
  };

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const goTo = useCallback(
    (href: string) => {
      closeMobile();

      const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";

      if (hash && pathname === "/") {
        window.setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 10);
        window.history.pushState(null, "", `/#${hash}`);
        return;
      }

      router.push(href);
    },
    [closeMobile, pathname, router],
  );

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) closeMobile();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [closeMobile]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobile();
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>("a[href], button");
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href], button")?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen, closeMobile]);

  const menu =
    mobileOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            id={menuId}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[100] flex flex-col bg-ink"
          >
            <Container>
              <div className="flex items-center justify-between py-3">
                <span className="flex items-center gap-3.5 text-white">
                  <Image
                    src={images.acfdLogo.src}
                    alt=""
                    width={images.acfdLogo.width}
                    height={images.acfdLogo.height}
                    className="h-11 w-auto"
                  />
                  <span className="font-display text-[1.4rem] leading-none font-bold uppercase tracking-[0.14em]">
                    {site.name}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    closeMobile();
                    toggleRef.current?.focus();
                  }}
                  className="-mr-1 flex items-center gap-2.5 p-2 text-white"
                >
                  <span className="label">Close</span>
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 5l14 14M19 5L5 19" />
                  </svg>
                </button>
              </div>
            </Container>

            <nav aria-label="Primary" className="mt-2 flex-1 overflow-y-auto">
              <ul className="border-t border-white/10">
                {site.nav.map((item, index) => (
                  <li key={item.href} className="border-b border-white/10">
                    <Container>
                      <a
                        href={item.href}
                        aria-current={isCurrent(item.href) ? "page" : undefined}
                        onClick={(event) => {
                          event.preventDefault();
                          goTo(item.href);
                        }}
                        className="flex items-baseline gap-5 py-5 text-white"
                      >
                        <span className="label text-brand-gold">{String(index + 1).padStart(2, "0")}</span>
                        <span
                          className={`font-display text-[1.75rem] leading-none font-semibold uppercase tracking-[0.01em] ${
                            inSection(item.href) ? "text-brand-gold" : ""
                          }`}
                        >
                          {item.label}
                        </span>
                      </a>
                    </Container>
                  </li>
                ))}
              </ul>
            </nav>
          </div>,
          document.body,
        )
      : null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-ink/92 backdrop-blur-md">
      <Container>
        <div className="flex items-center justify-between gap-6 py-3">
          <Link
            href="/"
            className="group flex items-center gap-3.5 text-white"
            aria-label={`${site.name}, ${site.organization} — home`}
          >
            <Image
              src={images.acfdLogo.src}
              alt={logoAlt}
              width={images.acfdLogo.width}
              height={images.acfdLogo.height}
              priority
              className="h-11 w-auto"
            />
            <span className="leading-none">
              <span className="block font-display text-[1.4rem] font-bold uppercase tracking-[0.14em]">
                {site.name}
              </span>
              <span className="mt-1 hidden text-[0.6875rem] tracking-[0.16em] text-white/60 uppercase sm:block">
                {site.organization}
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      goTo(item.href);
                    }}
                    className={`label border-b-2 pb-1 transition-colors hover:border-brand-red hover:text-white ${
                      inSection(item.href)
                        ? "border-brand-red text-white"
                        : "border-transparent text-white/85"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            className="-mr-1 flex items-center gap-2.5 p-2 text-white lg:hidden"
          >
            <span className="label">{mobileOpen ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
              <span className="h-0.5 w-full bg-brand-red" />
              <span className="h-0.5 w-full bg-white" />
              <span className="h-0.5 w-full bg-white" />
            </span>
          </button>
        </div>
      </Container>
      {menu}
    </header>
  );
}
