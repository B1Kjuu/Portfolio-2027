import type { Metadata } from "next";
import SiteNav, { CrossOver, SiteFooter } from "@/components/site/SiteNav";
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
          <h1 className="ep-title">Cut<span>.</span></h1>
          <div className="ep-intro">
            <p className="ep-lede">
              <strong>Short-form, long-form and UGC edits.</strong> {total} videos, paced for retention and finished for
              clients.
            </p>
            <p className="ep-tools">{editorTools.join(", ")}</p>
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

      <CrossOver to="tech" />
      <SiteFooter side="edit" />
    </div>
  );
}
