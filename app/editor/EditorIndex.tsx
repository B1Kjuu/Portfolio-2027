"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { EditorItem } from "@/lib/content";
import { label, slug } from "@/lib/slug";

type Video = EditorItem & { id: number; folder: string };

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M7 4.5l13 7.5-13 7.5z" />
  </svg>
);

// The Cut page is a wall of videos. Each tile is a still frame that plays on hover and
// opens the player on click; the words (description, format) live in the player.
export default function EditorIndex({ folders, featured = [] }: { folders: EditorItem[]; featured?: string[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(slug(folders[0]?.title ?? ""));

  // One flat, numbered list so the player can step through videos across categories.
  const all = useMemo<Video[]>(() => {
    let id = 0;
    return folders.flatMap((f) => (f.items ?? []).map((v) => ({ ...v, id: id++, folder: f.title })));
  }, [folders]);

  const q = query.trim().toLowerCase();
  const shown = useMemo(
    () =>
      q
        ? all.filter((v) => `${v.title} ${v.description ?? ""} ${v.note ?? ""} ${v.client ?? ""} ${v.folder}`.toLowerCase().includes(q))
        : all,
    [all, q],
  );
  const groups = folders
    .map((f) => ({ title: f.title, id: slug(f.title), items: shown.filter((v) => v.folder === f.title) }))
    .filter((g) => g.items.length > 0);
  const picks = q ? [] : featured.map((title) => all.find((v) => v.title === title)).filter((v): v is Video => !!v);

  const playing = current === null ? null : all[current];
  const position = playing ? shown.findIndex((v) => v.id === playing.id) : -1;

  // Hover preview (mouse only): the tile's own video plays, muted. A short pause before
  // loading means a passing cursor does not fetch a video.
  const [hoverId, setHoverId] = useState<string | null>(null);
  const hoverTimer = useRef(0);
  const enterTile = (key: string, e: React.PointerEvent) => {
    if (
      e.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setHoverId(key), 260);
  };
  const leaveTile = () => {
    window.clearTimeout(hoverTimer.current);
    setHoverId(null);
  };
  // React can drop the muted attribute, and unmuted autoplay is blocked: set it by hand.
  const playMuted = (el: HTMLVideoElement | null) => {
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  };

  const open = (video: Video) => {
    setCurrent(video.id);
    setLoading(true); // large source files can take a while before the first frame
    setFailed(false);
    leaveTile();
    if (!dialog.current?.open) dialog.current?.showModal();
  };
  const step = (dir: 1 | -1) => {
    if (!shown.length) return;
    const from = position < 0 ? 0 : position;
    open(shown[(from + dir + shown.length) % shown.length]);
  };
  // Clearing the selection unmounts the <video>, which stops playback and the download.
  const onClose = () => setCurrent(null);

  // Highlight the category you are looking at in the strip.
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>(".ep-section")];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [q, folders]);

  // One tile. `scope` keeps hover state separate when a video appears in "Start here" too.
  const tile = (video: Video, scope: string, showFolder = false) => {
    const key = `${scope}-${video.id}`;
    const poster = video.poster;
    const ratio = poster ? poster.width / poster.height : 9 / 16;
    return (
      <li key={key}>
        <button
          type="button"
          className="ep-tile"
          style={{ "--ar": String(ratio) } as React.CSSProperties}
          data-wide={ratio > 1 || undefined}
          onClick={() => open(video)}
          onPointerEnter={(e) => enterTile(key, e)}
          onPointerLeave={leaveTile}
          aria-label={`Play ${video.title}${video.length ? `, ${video.length}` : ""}`}
        >
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element -- small local still, already sized
            <img src={poster.src} width={poster.width} height={poster.height} alt="" loading="lazy" decoding="async" />
          ) : (
            <span className="ep-tileFallback" aria-hidden>{video.title}</span>
          )}
          {hoverId === key && <video ref={playMuted} src={video.videoUrl} loop playsInline preload="metadata" />}
          <span className="ep-tilePlay" aria-hidden><PlayIcon /></span>
          {video.length && <span className="ep-tileTime" aria-hidden>{video.length}</span>}
          <span className="ep-tileName" aria-hidden>
            {video.title}
            {(showFolder || video.client) && <small>{showFolder ? label(video.folder) : video.client}</small>}
          </span>
        </button>
      </li>
    );
  };

  return (
    <>
      {picks.length > 0 && (
        <section className="ep-section ep-featured" aria-labelledby="ep-picks-title">
          <header className="ep-head">
            <h2 id="ep-picks-title">Start here</h2>
            <span>{picks.length} picks</span>
          </header>
          <ul className="ep-wall">{picks.map((video) => tile(video, "pick", true))}</ul>
        </section>
      )}

      <div className="ep-bar">
        <nav className="ep-cats" aria-label="Categories">
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`} aria-current={active === g.id ? "true" : undefined}>
              {label(g.title)} <span>{g.items.length}</span>
            </a>
          ))}
        </nav>
        <label className="ep-field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <span className="ep-srOnly">Search the videos</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            autoComplete="off"
            enterKeyHint="search"
          />
        </label>
        <p className="ep-srOnly" role="status">
          {q ? `${shown.length} of ${all.length} videos` : ""}
        </p>
      </div>

      {groups.length === 0 && (
        <div className="ep-empty">
          <p>No videos match “{query.trim()}”.</p>
          <button type="button" className="ep-clear" onClick={() => setQuery("")}>Show all videos</button>
        </div>
      )}

      {groups.map((g) => (
        <section key={g.id} id={g.id} className="ep-section">
          <header className="ep-head">
            <h2>{label(g.title)}</h2>
            <span>{g.items.length} {g.items.length === 1 ? "video" : "videos"}</span>
          </header>
          <ul className="ep-wall">{g.items.map((video) => tile(video, g.id))}</ul>
        </section>
      ))}

      <dialog
        ref={dialog}
        className="ep-dialog"
        aria-labelledby="ep-playing"
        onClose={onClose}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        onKeyDown={(e) => {
          // Left and right step through the list, unless the video itself has focus (it uses them to seek).
          if ((e.target as HTMLElement).tagName === "VIDEO") return;
          if (e.key === "ArrowRight") step(1);
          else if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {playing && (
          <div className="ep-player">
            <div className="ep-frame" data-loading={loading || undefined} aria-busy={loading}>
              <video
                key={playing.videoUrl}
                src={playing.videoUrl}
                poster={playing.poster?.src}
                controls
                autoPlay
                playsInline
                preload="auto"
                onLoadedData={() => setLoading(false)}
                onError={() => {
                  setLoading(false);
                  setFailed(true);
                }}
              />
              {loading && (
                <p className="ep-loading" role="status">
                  <span className="ep-loadingMark" aria-hidden />
                  Loading video…
                </p>
              )}
              {failed && (
                <div className="ep-error" role="alert">
                  <p>This video could not be loaded here.</p>
                  <a href={playing.videoUrl} target="_blank" rel="noreferrer">Open the video file directly</a>
                </div>
              )}
              <div className="ep-controls" aria-label="Video navigation">
                <span className="ep-pos">{position + 1} of {shown.length}</span>
                <button type="button" className="ep-step" onClick={() => step(-1)} aria-label="Previous video"><Chevron dir="left" /></button>
                <button type="button" className="ep-step" onClick={() => step(1)} aria-label="Next video"><Chevron dir="right" /></button>
                <button type="button" className="ep-close" onClick={() => dialog.current?.close()}>Close</button>
              </div>
            </div>
            <div className="ep-meta">
              <div>
                <h3 id="ep-playing">{playing.title}</h3>
                <p className="ep-metaLine">
                  {[label(playing.folder), playing.client, playing.length].filter(Boolean).join(" / ")}
                </p>
                {playing.description && <p>{playing.description}</p>}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
