import type { Metadata } from "next";
import { Marquee, ScrollTools } from "@/components/site/Motion";
import PhoneReel from "@/components/site/PhoneReel";
import SiteNav, { ContactBand, CrossOver, SiteFooter } from "@/components/site/SiteNav";
import { editorProjects, editorTools } from "@/lib/content";
import { slug } from "@/lib/slug";
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
      <ScrollTools />

      <main id="main">
        <section className="ep-hero">
          <div className="ep-words">
            <h1 className="ep-title">Cut<span>.</span></h1>
            <div className="ep-intro">
              <p className="ep-lede">
                <strong>Short-form, long-form and UGC edits.</strong> {total} videos, paced for retention and finished
                for clients.
              </p>
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

        <Marquee items={editorTools} label="Editing tools" tone="edit" />

        <section className="ep-pricing" aria-labelledby="ep-pricing-title">
          <div className="ep-pricingHead">
            <h2 id="ep-pricing-title">Starting prices</h2>
            <p className="ep-proof">Worked with <strong>@hubertceo</strong>, <strong>@RoystonGKingSuccess</strong> and <strong>@im_siowei</strong>.</p>
            <a className="ep-book" href="https://calendly.com/joebeckgusi/30min" target="_blank" rel="noreferrer">
              Book a call
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </div>
          <div className="ep-packages">
            <article>
              <p>Short-form</p>
              <strong>₱2,500</strong>
              <span>starting at</span>
              <small>Reels, shorts and punchy UGC edits.</small>
            </article>
            <article>
              <p>Long-form</p>
              <strong>₱8,500</strong>
              <span>starting at</span>
              <small>YouTube, documentary and brand stories.</small>
            </article>
            <article>
              <p>Monthly retainer</p>
              <strong>₱25,000</strong>
              <span>starting at / month</span>
              <small>For a consistent edit schedule and faster turnaround.</small>
            </article>
          </div>
        </section>

        <EditorIndex
          folders={editorProjects}
          featured={["Iman", "Real Estate Reel", "KneeMax"]}
        />
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
