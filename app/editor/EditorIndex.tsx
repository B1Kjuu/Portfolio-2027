"use client";

import { useRef, useState } from "react";
import type { EditorItem } from "@/lib/content";
import { label, slug } from "@/lib/slug";

export default function EditorIndex({ folders }: { folders: EditorItem[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [playing, setPlaying] = useState<EditorItem | null>(null);
  const [loading, setLoading] = useState(false);

  const open = (video: EditorItem) => {
    setPlaying(video);
    setLoading(true); // large source files can take a while before the first frame
    dialog.current?.showModal();
  };
  // Clearing the selection unmounts the <video>, which stops playback and the download.
  const onClose = () => setPlaying(null);

  return (
    <>
      {folders.map((folder) => (
        <section key={folder.title} id={slug(folder.title)} className="ep-section">
          <header className="ep-head">
            <h2>{label(folder.title)}</h2>
            <span>{folder.items?.length ?? 0} {folder.items?.length === 1 ? "video" : "videos"}</span>
          </header>
          <ul className="ep-list">
            {folder.items?.map((video) => (
              <li key={video.title}>
                <button type="button" className="ep-row" onClick={() => open(video)}>
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

      <dialog
        ref={dialog}
        className="ep-dialog"
        aria-labelledby="ep-playing"
        onClose={onClose}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      >
        {playing && (
          <div className="ep-player">
            <div className="ep-frame" data-loading={loading || undefined}>
              <video
                key={playing.videoUrl}
                src={playing.videoUrl}
                controls
                autoPlay
                playsInline
                preload="auto"
                onLoadedData={() => setLoading(false)}
                onError={() => setLoading(false)}
              />
              {loading && <p className="ep-loading" role="status">Loading video…</p>}
            </div>
            <div className="ep-meta">
              <div>
                <h3 id="ep-playing">{playing.title}</h3>
                <p>{playing.description}</p>
              </div>
              <button type="button" className="ep-close" onClick={() => dialog.current?.close()}>
                Close
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
