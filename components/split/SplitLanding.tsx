"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import avatar from "@/assets/avatar.png";
import { clampSeam, seam, SEAM_MAX, SEAM_MIN } from "./seam";
import type { StageCard } from "./Stage";
import "./split.css";

// WebGL only exists in the browser; the text renders on the server without it.
const Stage = dynamic(() => import("./Stage"), { ssr: false });

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
  const root = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  // Only for the slider's aria value; layout and 3D read the live value directly.
  const [value, setValue] = useState(50);

  const setSeam = (p: number, commit = false) => {
    seam.p = clampSeam(p);
    root.current?.style.setProperty("--p", String(seam.p));
    if (commit) setValue(Math.round(seam.p * 100));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    root.current?.setAttribute("data-dragging", "");
  };
  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging.current || !root.current) return;
    const rect = root.current.getBoundingClientRect();
    setSeam((e.clientX - rect.left) / rect.width);
  };
  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    root.current?.removeAttribute("data-dragging");
    setValue(Math.round(seam.p * 100));
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = { ArrowLeft: -0.04, ArrowRight: 0.04 }[e.key];
    if (step) setSeam(seam.p + step, true);
    else if (e.key === "Home") setSeam(SEAM_MIN, true);
    else if (e.key === "End") setSeam(SEAM_MAX, true);
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

      <main className="sp-halves">
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

      <button
        type="button"
        className="sp-handle"
        role="slider"
        aria-label="Resize the two sides"
        aria-orientation="horizontal"
        aria-valuemin={SEAM_MIN * 100}
        aria-valuemax={SEAM_MAX * 100}
        aria-valuenow={value}
        aria-valuetext={`Build ${value}%, Cut ${100 - value}%`}
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
          <Image src={avatar} alt="" className="sp-avatar" sizes="96px" priority draggable={false} />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 6l6 6-6 6" />
          </svg>
        </span>
      </button>

      {/* The person sits on the seam: one name, two sides. */}
      <div className="sp-plate">
        <Image src={avatar} alt="" className="sp-plateAvatar" sizes="72px" />
        <h1 className="sp-name">Joebeck Andrew Gusi</h1>
        <p className="sp-role">Developer and video editor</p>
      </div>
    </div>
  );
}
