"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Scrolls to #mission / #work / #contact after a menu click or a visit from another page. */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;

    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
