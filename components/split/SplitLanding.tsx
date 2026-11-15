"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import avatar from "@/assets/avatar.png";
import { seam } from "./seam";
import type { StageCard } from "./Stage";
import "./split.css";

// WebGL only exists in the browser; the text renders on the server without it.
const Stage = dynamic(() => import("./Stage"), { ssr: false });

type Side = "tech" | "edit";
const ROUTE: Record<Side, string> = { tech: "/tech", edit: "/editor" };

// How far the portrait can travel, and how far it must go before a side opens.
const EDGE = 0.1;
const COMMIT = 0.15;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function SplitLanding({
  techCards,
  editCards,
  techCount,
  liveCount,
  videoCount,
  categoryCount,
}: {
  techCards: StageCard[];
  editCards: StageCard[];
  techCount: number;
  liveCount: number;
  videoCount: number;
  categoryCount: number;
}) {
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const opening = useRef(false);

  // h = where the portrait is (0..1 across the page); p = the share of the page Build takes.
  // Pulling the portrait toward a side gives that side the room, so they move in opposite directions.
  const place = (h: number) => {
    seam.p = 1 - h;
    root.current?.style.setProperty("--h", String(h));
    root.current?.style.setProperty("--p", String(seam.p));
  };

  useEffect(() => {
    place(0.5); // also resets the shared value when coming back to this page
    // Warm both routes so opening a side feels immediate.
    router.prefetch(ROUTE.tech);
    router.prefetch(ROUTE.edit);
  }, [router]);

  const settle = (on: boolean) => {
    if (on) root.current?.setAttribute("data-settling", "");
    else root.current?.removeAttribute("data-settling");
  };

  const open = (side: Side) => {
    if (opening.current) return;
    opening.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return router.push(ROUTE[side]);
    settle(true);
    root.current?.setAttribute("data-opening", side);
    place(side === "tech" ? 0 : 1); // that side takes the whole page
    window.setTimeout(() => router.push(ROUTE[side]), 420);
  };

  const recentre = () => {
    settle(true);
    place(0.5);
    window.setTimeout(() => settle(false), 450);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (opening.current || !e.isPrimary) return;
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    settle(false);
    root.current?.setAttribute("data-dragging", "");
  };
  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging.current || !root.current) return;
    const rect = root.current.getBoundingClientRect();
    const raw = (e.clientX - rect.left) / rect.width;
    place(Math.min(1 - EDGE, Math.max(EDGE, raw)));
  };
  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    root.current?.removeAttribute("data-dragging");
    const h = 1 - seam.p;
    if (h <= 0.5 - COMMIT) open("tech");
    else if (h >= 0.5 + COMMIT) open("edit");
    else recentre();
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowLeft") open("tech");
    else if (e.key === "ArrowRight") open("edit");
    else return;
    e.preventDefault();
  };

  return (
    <div ref={root} className="sp-root">
      <header className="sp-nav">
        <Link href="/" className="sp-mark">b1kjuu</Link>
        <nav className="sp-links" aria-label="Main">
          <a href="/CV_GUSI.pdf" target="_blank" rel="noreferrer">CV</a>
          <a href="https://github.com/B1Kjuu" target="_blank" rel="noreferrer">GitHub</a>
          <a className="sp-contact" href="mailto:joebeckgusi25@gmail.com">Contact</a>
        </nav>
      </header>

      <main id="main" className="sp-halves">
        {/* The page's one heading: the person, set across both sides. */}
        <div className="sp-id">
          <Image src={avatar} alt="" className="sp-idPhoto" sizes="56px" />
          <h1 className="sp-name">Joebeck Andrew Gusi</h1>
          <p className="sp-role">Developer and video editor</p>
        </div>

        <section className="sp-half sp-tech" aria-labelledby="build-title">
          <div className="sp-stage"><Stage side="tech" cards={techCards} /></div>
          <div className="sp-copy">
            <h2 id="build-title" className="sp-title">Build<span className="sp-dot">.</span></h2>
            <p className="sp-lede">
              <strong>Web apps, mobile and embedded hardware.</strong> React, Next.js, React Native, ESP32 and LoRa.
            </p>
          </div>
          <div className="sp-foot">
            <span className="sp-count">{techCount} projects, {liveCount} live</span>
            <Link href="/tech" className="sp-enter">See the builds <Arrow /></Link>
          </div>
        </section>

        <section className="sp-half sp-edit" aria-labelledby="cut-title">
          <div className="sp-stage"><Stage side="edit" cards={editCards} /></div>
          <div className="sp-copy">
            <h2 id="cut-title" className="sp-title">Cut<span className="sp-dot">.</span></h2>
            <p className="sp-lede">
              <strong>Short-form, long-form and UGC edits.</strong> Paced for retention, finished for clients.
            </p>
          </div>
          <div className="sp-foot">
            <span className="sp-count">{videoCount} videos in {categoryCount} categories</span>
            <Link href="/editor" className="sp-enter">Watch the edits <Arrow /></Link>
          </div>
        </section>
      </main>

      <span className="sp-seam" aria-hidden />

      {/* Pull the portrait toward a side to open it. The two buttons above do the same without dragging. */}
      <button
        type="button"
        className="sp-handle"
        aria-label="Portrait of Joebeck Andrew Gusi. Drag it toward Build or Cut to open that side, or press the left or right arrow key."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <span className="sp-grip">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 6l-6 6 6 6" />
          </svg>
          <Image src={avatar} alt="" className="sp-avatar" sizes="112px" priority draggable={false} />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 6l6 6-6 6" />
          </svg>
        </span>
      </button>
    </div>
  );
}
