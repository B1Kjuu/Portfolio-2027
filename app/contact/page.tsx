import type { Metadata } from "next";
import SiteNav, { SiteFooter } from "@/components/site/SiteNav";
import { person } from "@/lib/about";
import CopyEmail from "./CopyEmail";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact — Joebeck Andrew Gusi",
  description: "How to reach Joebeck Andrew Gusi about a website, an app or a video edit.",
};

const briefs = [
  {
    title: "For something to build",
    points: ["What it should do, in a few sentences", "Who will use it", "Any deadline or launch date", "Links to sites or apps you like"],
  },
  {
    title: "For footage to cut",
    points: ["A link to the raw files", "Where it will be posted, and how long it should run", "Edits or channels whose style you like", "When you need it back"],
  },
];

const elsewhere = [
  { label: "GitHub", href: "https://github.com/B1Kjuu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/gusi-joebeck-andrew" },
  { label: "Facebook", href: "https://www.facebook.com/b1kjuu" },
];

export default function ContactPage() {
  return (
    <div className="world-edit">
      <SiteNav side="edit" contact />

      <main id="main">
        <section className="ct-hero">
          <h1 className="ct-title">Get in touch<span>.</span></h1>
          <p className="ct-lede">
            For a website, an app or a video edit, email is the fastest way to reach me. I am based in {person.location}.
          </p>
          <CopyEmail email={person.email} />
        </section>

        <section className="ct-row" aria-labelledby="ct-brief">
          <h2 id="ct-brief">What helps me reply well</h2>
          <div className="ct-briefs">
            {briefs.map((brief) => (
              <div key={brief.title}>
                <h3>{brief.title}</h3>
                <ul>
                  {brief.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="ct-row" aria-labelledby="ct-else">
          <h2 id="ct-else">Elsewhere</h2>
          <ul className="ct-links">
            {elsewhere.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>
              </li>
            ))}
            <li>
              <a href="/GUSI_RESUME.pdf" target="_blank" rel="noreferrer">
                Resume (PDF)
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            </li>
          </ul>
        </section>
      </main>

      <SiteFooter side="edit" />
    </div>
  );
}
