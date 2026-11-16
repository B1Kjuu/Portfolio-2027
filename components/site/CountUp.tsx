"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

const format = (n: number) => Math.round(n).toLocaleString("en-US");

// A number that counts up to its value once, the first time it is seen. The page is served
// with the final value, so nothing depends on the animation; reduced-motion visitors and
// browsers without IntersectionObserver simply keep that value.
export default function CountUp({ value, suffix = "", duration = 1100 }: { value: number; suffix?: string; duration?: number }) {
  const el = useRef<HTMLSpanElement>(null);
  const armed = useRef(false);

  // Before the first paint: start from zero, but only if the animation can actually run.
  useLayoutEffect(() => {
    const node = el.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    armed.current = true;
    node.textContent = format(0) + suffix;
  }, [suffix]);

  useEffect(() => {
    const node = el.current;
    if (!node || !armed.current) return;
    let frame = 0;
    let gate: MutationObserver | undefined;

    const run = () => {
      const started = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - t, 4); // quick at first, settling into the final figure
        node.textContent = format(value * eased) + suffix;
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    // On the landing page the opening curtain covers the numbers: wait until it has parted.
    const whenUncovered = () => {
      const html = document.documentElement;
      if (!html.hasAttribute("data-intro")) return run();
      gate = new MutationObserver(() => {
        if (!html.hasAttribute("data-intro")) {
          gate?.disconnect();
          run();
        }
      });
      gate.observe(html, { attributes: true, attributeFilter: ["data-intro"] });
    };

    const seen = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        seen.disconnect();
        whenUncovered();
      },
      { threshold: 0.6 },
    );
    seen.observe(node);

    return () => {
      seen.disconnect();
      gate?.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = format(value) + suffix; // never leave a half-counted number behind
    };
  }, [value, suffix, duration]);

  // min-width in digits keeps the text around it from shifting while the number grows
  return (
    <span ref={el} className="cu" style={{ minWidth: `${(format(value) + suffix).length}ch` }}>
      {format(value) + suffix}
    </span>
  );
}
