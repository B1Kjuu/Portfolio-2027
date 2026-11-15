"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Tool } from "@/lib/content";

// A looping strip of words. The list is rendered twice so the loop has no seam; the copy is
// hidden from assistive tech.
export function Marquee({ items, label, tone }: { items: Tool[]; label: string; tone: "tech" | "edit" }) {
  // One copy must be wider than the screen or the loop shows a gap, so short lists are repeated.
  const repeats = Math.max(1, Math.ceil(12 / items.length));
  const strip = Array.from({ length: repeats }, () => items).flat();
  return (
    <div className={`mq mq-${tone}`} role="group" aria-label={label}>
      <div className="mq-track">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined}>
            {strip.map((item, i) => (
              <li key={`${item.name}-${i}`} aria-hidden={i >= items.length || undefined}>
                <Image src={item.icon} alt="" width={26} height={26} data-dark={item.dark || undefined} />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

// Tracks the pointer inside a section and exposes it as --mx / --my on that element only,
// so a background can follow the cursor without restyling the whole page.
export function PointerArea({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };
  return (
    <section ref={ref} className={className} onPointerMove={onMove}>
      {children}
    </section>
  );
}

// Reading progress along the top, and a back-to-top button once you are well into the page.
export function ScrollTools() {
  const bar = useRef<HTMLDivElement>(null);
  const [deep, setDeep] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${ratio})`;
      setDeep(window.scrollY > 700);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Scroll to the top as a visible, eased movement (not a jump). Any wheel, touch or key
  // input hands control straight back to the reader.
  const toTop = () => {
    const from = window.scrollY;
    if (from <= 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto"; // CSS smooth scrolling would fight a frame-by-frame scroll
    const duration = reduce ? 220 : Math.min(1200, 520 + from * 0.14);
    const started = performance.now();
    let frame = 0;
    const stop = () => {
      cancelAnimationFrame(frame);
      html.style.scrollBehavior = previous;
      ["wheel", "touchstart", "keydown"].forEach((type) => window.removeEventListener(type, stop));
    };
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - t, 4); // fast start, long soft landing
      window.scrollTo(0, Math.round(from * (1 - eased)));
      if (t < 1) frame = requestAnimationFrame(tick);
      else stop();
    };
    ["wheel", "touchstart", "keydown"].forEach((type) => window.addEventListener(type, stop, { passive: true }));
    frame = requestAnimationFrame(tick);
  };

  return (
    <>
      <div className="st-bar" aria-hidden><div ref={bar} /></div>
      <button type="button" className="st-top" data-show={deep || undefined} tabIndex={deep ? 0 : -1} onClick={toTop} aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </button>
    </>
  );
}

// Sticky list of sections that marks the one on screen. `ids` are element ids on the page.
export function SectionIndex({ items, label }: { items: { id: string; title: string }[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="si" aria-label={label}>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined}>{item.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
