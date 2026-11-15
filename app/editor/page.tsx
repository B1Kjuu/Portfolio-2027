import type { Metadata } from "next";
import PhoneReel from "@/components/site/PhoneReel";
import SiteNav, { ContactBand, CrossOver, SiteFooter } from "@/components/site/SiteNav";
import { editorProjects, editorTools } from "@/lib/content";
import { label, slug } from "@/lib/slug";
import EditorIndex from "./EditorIndex";
import "./editor.css";

export const metadata: Metadata = {
  title: "Cut — Joebeck Andrew Gusi",
  description: "Short-form, long-form and UGC video edits by Joebeck Andrew Gusi.",
};

export default function EditorPage() {
  const total = editorProjects.reduce((n, folder) => n + (folder.items?.length ?? 0), 0);

  return (
    <div className="world-edit">
      <SiteNav side="edit" />

      <main>
        <section className="ep-hero">
          <div className="ep-words">
            <h1 className="ep-title">Cut<span>.</span></h1>
            <div className="ep-intro">
              <p className="ep-lede">
                <strong>Short-form, long-form and UGC edits.</strong> {total} videos, paced for retention and finished
                for clients.
              </p>
              <p className="ep-tools">{editorTools.join(", ")}</p>
              <a className="ep-jump" href={`#${slug(editorProjects[0].title)}`}>
                Watch the edits
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </a>
            </div>
          </div>
          <div className="ep-phone">
            <PhoneReel src="/reels/hero-reel.mp4" poster="/reels/hero-reel.jpg" label="Excerpt from the Fungy Mushroom Coffee edit" />
          </div>
        </section>

        <nav className="ep-cats" aria-label="Categories">
          {editorProjects.map((folder) => (
            <a key={folder.title} href={`#${slug(folder.title)}`}>
              {label(folder.title)} <span>{folder.items?.length ?? 0}</span>
            </a>
          ))}
        </nav>

        <EditorIndex folders={editorProjects} />
      </main>

      <ContactBand
        title="Have footage that needs cutting?"
        body="Send the raw files and tell me what the video has to do. You get back an edit that is ready to post."
      />
      <CrossOver to="tech" />
      <SiteFooter side="edit" />
    </div>
  );
}
