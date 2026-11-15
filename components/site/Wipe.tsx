"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

// Page-change animation: a panel in the destination's colour sweeps over the screen, the
// route changes underneath, and the panel carries on out the other side.
// Build and About are dark, Cut and Contact are paper, and Home closes as the two halves.
const TONES: Record<string, string> = {
  "/": "home",
  "/tech": "tech",
  "/editor": "edit",
  "/about": "about",
  "/contact": "contact",
};
const COVER_MS = 420;

// For code that navigates without a link (the portrait on the landing page).
export const go = (path: string) => window.dispatchEvent(new CustomEvent("b1:go", { detail: path }));

export default function Wipe() {
  const router = useRouter();
  const pathname = usePathname();
  const panel = useRef<HTMLDivElement>(null);
  const pending = useRef<string | null>(null);
  const timers = useRef<number[]>([]);
  const here = useRef(pathname);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const clear = () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
    const finish = () => {
      clear();
      pending.current = null;
      el.removeAttribute("data-phase");
      el.removeAttribute("data-tone");
    };

    const start = (path: string) => {
      const tone = TONES[path];
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!tone || reduce || path === here.current) {
        if (path !== here.current) router.push(path);
        return;
      }
      if (pending.current) return; // one at a time
      clear();
      pending.current = path;
      el.setAttribute("data-tone", tone);
      el.setAttribute("data-phase", "ready"); // parked off screen
      void el.offsetWidth; // commit the starting position before animating
      el.setAttribute("data-phase", "cover");
      timers.current.push(window.setTimeout(() => router.push(path), COVER_MS));
      timers.current.push(window.setTimeout(finish, 5000)); // never leave the screen covered
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.origin !== window.location.origin) return;
      if (a.pathname === here.current || !(a.pathname in TONES)) return; // hash links, files, same page
      e.preventDefault();
      start(a.pathname);
    };
    const onGo = (e: Event) => start((e as CustomEvent<string>).detail);

    document.addEventListener("click", onClick, true);
    window.addEventListener("b1:go", onGo);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("b1:go", onGo);
      clear();
    };
  }, [router]);

  // The new page is in: let the panel leave.
  useEffect(() => {
    here.current = pathname;
    const el = panel.current;
    if (!el || pending.current !== pathname) return;
    pending.current = null;
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    el.setAttribute("data-phase", "leave");
    timers.current.push(
      window.setTimeout(() => {
        el.removeAttribute("data-phase");
        el.removeAttribute("data-tone");
      }, 520),
    );
  }, [pathname]);

  return <div ref={panel} className="wp" aria-hidden />;
}
