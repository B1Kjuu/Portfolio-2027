import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import avatar from "@/assets/avatar.png";
import { PointerArea, ScrollTools } from "@/components/site/Motion";
import SiteNav, { ContactBand, SiteFooter } from "@/components/site/SiteNav";
import { education, experience, highlights, person, skills, type Entry } from "@/lib/about";
import { editorProjects, techProjects } from "@/lib/content";
import { skillIcons } from "@/lib/skillIcons";
import "./about.css";

export const metadata: Metadata = {
  title: "About — Joebeck Andrew Gusi",
  description: "Full-stack developer and video editor based in Manila: experience, education and skills.",
};

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// Figures in a highlight (45%, 2,000+) are set in the accent colour.
const emphasise = (line: string) =>
  line.split(/(\d[\d,]*\+?%?)/).map((part, i) => (/^\d/.test(part) ? <strong key={i}>{part}</strong> : part));

// A timeline: one line down the side, a marker per entry, the current one marked "Now".
function Timeline({ items }: { items: Entry[] }) {
  return (
    <ol className="ab-timeline">
      {items.map((item) => {
        const current = item.when?.includes("present");
        return (
          <li key={item.title} data-current={current || undefined}>
            <div className="ab-entryHead">
              <h3>{item.title}</h3>
              {current && <span className="ab-now">Now</span>}
              {item.when && <span className="ab-when">{item.when}</span>}
            </div>
            {item.place && <p className="ab-place">{item.place}</p>}
            {item.points.length > 0 && (
              <ul className="ab-points">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function AboutPage() {
  const current = experience.find((item) => item.when?.includes("present"));
  const degree = education[0];
  const videoCount = editorProjects.reduce((n, folder) => n + (folder.items?.length ?? 0), 0);

  return (
    <div className="world-tech">
      <SiteNav side="tech" about />
      <ScrollTools />

      <main id="main">
        <PointerArea className="ab-hero">
          <div className="ab-portrait">
            <Image src={avatar} alt={`Portrait of ${person.name}`} className="ab-photo" sizes="260px" priority />
          </div>
          <div className="ab-heroText">
            <h1 className="ab-name">{person.name}</h1>
            <p className="ab-role">{person.role}</p>
            {person.intro.map((paragraph) => (
              <p key={paragraph} className="ab-intro">{paragraph}</p>
            ))}
            <ul className="ab-facts">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                {person.location}
              </li>
              {current && (
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="3" y="7" width="18" height="13" rx="2" />
                    <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
                  </svg>
                  {current.title}, {current.place}
                </li>
              )}
              {degree && (
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M2 9l10-5 10 5-10 5z" />
                    <path d="M6 11.5V16c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-4.5" />
                  </svg>
                  {degree.title}, {degree.place}
                </li>
              )}
            </ul>
            <div className="ab-acts">
              <Link className="ab-main" href="/contact">Get in touch <Arrow /></Link>
              <a className="ab-alt" href="/GUSI_RESUME.pdf" target="_blank" rel="noreferrer">Download the resume</a>
            </div>
          </div>
        </PointerArea>

        {/* The two halves of the work, as on the home page. */}
        <section className="ab-sides" aria-label="The work">
          <Link href="/tech" className="ab-side ab-build">
            <span className="ab-sideWord">Build<i>.</i></span>
            <span className="ab-sideLine">Web apps, mobile and embedded hardware.</span>
            <span className="ab-sideGo">{techProjects.length} projects <Arrow /></span>
          </Link>
          <Link href="/editor" className="ab-side ab-cut">
            <span className="ab-sideWord">Cut<i>.</i></span>
            <span className="ab-sideLine">Short-form, long-form and UGC edits.</span>
            <span className="ab-sideGo">{videoCount} videos <Arrow /></span>
          </Link>
        </section>

        <section className="ab-row" aria-labelledby="ab-experience">
          <h2 id="ab-experience">Experience</h2>
          <Timeline items={experience} />
        </section>

        <section className="ab-row ab-band" aria-labelledby="ab-highlights">
          <h2 id="ab-highlights">Highlights</h2>
          <ul className="ab-highlights">
            {highlights.map((line) => (
              <li key={line}>{emphasise(line)}</li>
            ))}
          </ul>
        </section>

        <section className="ab-row" aria-labelledby="ab-education">
          <h2 id="ab-education">Education</h2>
          <Timeline items={education} />
        </section>

        <section className="ab-row" aria-labelledby="ab-skills">
          <h2 id="ab-skills">Skills</h2>
          <dl className="ab-skills">
            {skills.map((group) => (
              <div key={group.label}>
                <dt>{group.label}</dt>
                <dd>
                  <ul className="ab-chips">
                    {group.items.map((item) => {
                      const entry = skillIcons[item];
                      return (
                        <li key={item}>
                          {entry && <Image src={entry.icon} alt="" width={20} height={20} data-dark={entry.dark || undefined} />}
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <ContactBand
        title="Want to work together?"
        body="Whether it is something to build or footage to cut, send me a short note about what you need."
      />
      <SiteFooter side="tech" />
    </div>
  );
}
