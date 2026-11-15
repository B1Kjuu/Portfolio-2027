"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import avatar from "@/assets/avatar.png";

// Opening curtain for the landing page: the two sides of the site, closed, with the person
// in the middle. Once fonts are ready it parts down the seam. Plays once per browser session;
// the inline script in app/layout.tsx marks <html data-entered> on later visits and CSS hides it.
export default function Intro() {
  const [phase, setPhase] = useState<"hold" | "open" | "gone">("hold");

  useEffect(() => {
    const html = document.documentElement;
    if (html.hasAttribute("data-entered")) return; // already seen this session: CSS keeps it hidden
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = performance.now();
    let first = 0;
    let second = 0;

    const reveal = () => {
      try {
        sessionStorage.setItem("b1-entered", "1");
      } catch {
        /* private mode: the intro simply plays again next time */
      }
      html.removeAttribute("data-intro"); // lets the page's own entrance run as the curtain parts
      html.setAttribute("data-entered", "");
      setPhase("open");
      second = window.setTimeout(() => setPhase("gone"), reduce ? 260 : 950);
    };
    const whenReady = () => {
      const minimum = reduce ? 300 : 1500;
      first = window.setTimeout(reveal, Math.max(0, minimum - (performance.now() - started)));
    };
    (document.fonts?.ready ?? Promise.resolve()).then(whenReady, whenReady);

    return () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className="in" data-phase={phase} aria-hidden>
      <div className="in-panel in-build"><span>Build<i>.</i></span></div>
      <div className="in-panel in-cut"><span>Cut<i>.</i></span></div>
      <div className="in-mid">
        <Image src={avatar} alt="" className="in-photo" sizes="96px" priority />
        <p className="in-name">Joebeck Andrew Gusi</p>
        <div className="in-bar"><div /></div>
      </div>
    </div>
  );
}
