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

export type Pick = { title: string; poster?: string };

export default function EditorIndex({ folders, featured = [] }: { folders: EditorItem[]; featured?: Pick[] }) {
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
    () => (q ? all.filter((v) => `${v.title} ${v.description ?? ""} ${v.note ?? ""} ${v.folder}`.toLowerCase().includes(q)) : all),
    [all, q],
  );
  const groups = folders
    .map((f) => ({ title: f.title, id: slug(f.title), items: shown.filter((v) => v.folder === f.title) }))
    .filter((g) => g.items.length > 0);

  const playing = current === null ? null : all[current];
  const position = playing ? shown.findIndex((v) => v.id === playing.id) : -1;
  const playingPoster = playing ? featured.find((pick) => pick.title === playing.title)?.poster : undefined;

  const open = (video: Video) => {
    setCurrent(video.id);
    setLoading(true); // large source files can take a while before the first frame
    setFailed(false);
    leaveHover();
    if (!dialog.current?.open) dialog.current?.showModal();
  };
  const step = (dir: 1 | -1) => {
    if (!shown.length) return;
    const from = position < 0 ? 0 : position;
    open(shown[(from + dir + shown.length) % shown.length]);
  };
  // Clearing the selection unmounts the <video>, which stops playback and the download.
  const onClose = () => setCurrent(null);

  // Highlight the category you are reading in the strip.
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

  // Hover previews (mouse only): a frame plays in place, a list row shows a small floating
  // player. A short pause before loading means a passing cursor does not fetch a video.
  const [hoverPick, setHoverPick] = useState<number | null>(null);
  const [preview, setPreview] = useState<{ video: Video; top: number } | null>(null);
  const hoverTimer = useRef(0);
  const canPreview = (e: React.PointerEvent) =>
    e.pointerType === "mouse" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const enterPick = (video: Video, e: React.PointerEvent) => {
    if (!canPreview(e)) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setHoverPick(video.id), 220);
  };
  const enterRow = (video: Video, e: React.PointerEvent<HTMLElement>) => {
    if (!canPreview(e)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const top = Math.max(230, Math.min(window.innerHeight - 360, rect.top - 110));
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setPreview({ video, top }), 350);
  };
  const leaveHover = () => {
    window.clearTimeout(hoverTimer.current);
    setHoverPick(null);
    setPreview(null);
  };
  // React can drop the muted attribute, and unmuted autoplay is blocked: set it by hand.
  const playMuted = (el: HTMLVideoElement | null) => {
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  };

  // Hand-picked starting points: the videos we have a still frame for.
  const picks = featured
    .map((pick) => ({ pick, video: all.find((v) => v.title === pick.title) }))
    .filter((p): p is { pick: Pick; video: Video } => !!p.video);

  return (
    <>
      {picks.length > 0 && (
        <section className="ep-picks" aria-labelledby="ep-picks-title">
          <h2 id="ep-picks-title">Start here</h2>
          <ul>
            {picks.map(({ pick, video }) => (
              <li key={video.id}>
                <button
                  type="button"
                  className="ep-pick"
                  onClick={() => open(video)}
                  onPointerEnter={(e) => enterPick(video, e)}
                  onPointerLeave={leaveHover}
                  aria-label={`Play ${video.title}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- small local still, already sized */}
                  {pick.poster && <img src={pick.poster} alt="" loading="eager" />}
                  {!pick.poster && <span className="ep-pickFallback" aria-hidden>{video.title}</span>}
                  {hoverPick === video.id && <video ref={playMuted} src={video.videoUrl} loop playsInline preload="metadata" />}
                  <span className="ep-pickPlay" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5l13 7.5-13 7.5z" /></svg>
                  </span>
                  <span className="ep-pickName">
                    {video.title}
                    <small>{label(video.folder)}</small>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="ep-search">
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
            placeholder="Search by title, client or style"
            autoComplete="off"
            enterKeyHint="search"
          />
        </label>
        <p className="ep-found" role="status">
          {q ? `${shown.length} of ${all.length} videos` : `${all.length} videos`}
        </p>
      </div>

      <nav className="ep-cats" aria-label="Categories">
        {groups.map((g) => (
          <a key={g.id} href={`#${g.id}`} aria-current={active === g.id ? "true" : undefined}>
            {label(g.title)} <span>{g.items.length}</span>
          </a>
        ))}
      </nav>

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
          <ul className="ep-list">
            {g.items.map((video) => (
              <li key={video.id}>
                <button type="button" className="ep-row" onClick={() => open(video)} onPointerEnter={(e) => enterRow(video, e)} onPointerLeave={leaveHover}>
                  <span className="ep-play" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5l13 7.5-13 7.5z" /></svg>
                  </span>
                  <span className="ep-main">
                    <span className="ep-name">{video.title}</span>
                    <span className="ep-desc">{video.description}</span>
                  </span>
                  <span className="ep-note">{video.note}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {preview && !playing && (
        <div className="ep-preview" style={{ top: preview.top }} aria-hidden>
          <video key={preview.video.videoUrl} ref={playMuted} src={preview.video.videoUrl} loop playsInline preload="metadata" />
          <span>Preview, no sound</span>
        </div>
      )}

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
                poster={playingPoster}
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
            </div>
            <div className="ep-meta">
              <div>
                <h3 id="ep-playing">{playing.title}</h3>
                <p>{playing.description}</p>
              </div>
              <div className="ep-controls">
                <span className="ep-pos">{position + 1} of {shown.length}</span>
                <button type="button" className="ep-step" onClick={() => step(-1)} aria-label="Previous video"><Chevron dir="left" /></button>
                <button type="button" className="ep-step" onClick={() => step(1)} aria-label="Next video"><Chevron dir="right" /></button>
                <button type="button" className="ep-close" onClick={() => dialog.current?.close()}>Close</button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
