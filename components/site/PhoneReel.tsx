"use client";

import { useEffect, useRef, useState } from "react";

// A phone frame playing a short, silent loop of a real edit. Starts paused for
// reduced-motion users, and anyone can pause it.
export default function PhoneReel({ src, poster, label }: { src: string; poster: string; label: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = video.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.muted = true; // React can drop the muted attribute, and unmuted autoplay is blocked
    el.play().catch(() => {}); // autoplay can be refused; the poster stays and the button still works
  }, []);

  const toggle = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <div className="phone">
      <video
        ref={video}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button type="button" className="phone-toggle" onClick={toggle} aria-label={playing ? "Pause the reel" : "Play the reel"}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          {playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5l11 7-11 7z" />}
        </svg>
      </button>
    </div>
  );
}
