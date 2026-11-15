import type { Metadata } from "next";
import Image from "next/image";
import avatar from "@/assets/avatar.png";
import { ScrollTools } from "@/components/site/Motion";
import SiteNav, { ContactBand, SiteFooter } from "@/components/site/SiteNav";
import { education, experience, highlights, person, skills, type Entry } from "@/lib/about";
import "./about.css";

export const metadata: Metadata = {
  title: "About — Joebeck Andrew Gusi",
  description: "Full-stack developer and video editor based in Manila: experience, education and skills.",
};

function Entries({ items }: { items: Entry[] }) {
  return (
    <ul className="ab-entries">
      {items.map((item) => (
        <li key={item.title}>
          <div className="ab-entryHead">
            <h3>{item.title}</h3>
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
      ))}
    </ul>
  );
}

export default function AboutPage() {
  return (
    <div className="world-tech">
      <SiteNav side="tech" about />
      <ScrollTools />

      <main id="main">
        <section className="ab-hero">
          <Image src={avatar} alt={`Portrait of ${person.name}`} className="ab-photo" sizes="220px" priority />
          <div>
            <h1 className="ab-name">{person.name}</h1>
            <p className="ab-role">
              {person.role}. {person.location}.
            </p>
            {person.intro.map((paragraph) => (
              <p key={paragraph} className="ab-intro">{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="ab-row" aria-labelledby="ab-experience">
          <h2 id="ab-experience">Experience</h2>
          <Entries items={experience} />
        </section>

        <section className="ab-row" aria-labelledby="ab-highlights">
          <h2 id="ab-highlights">Highlights</h2>
          <ul className="ab-highlights">
            {highlights.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="ab-row" aria-labelledby="ab-education">
          <h2 id="ab-education">Education</h2>
          <Entries items={education} />
        </section>

        <section className="ab-row" aria-labelledby="ab-skills">
          <h2 id="ab-skills">Skills</h2>
          <dl className="ab-skills">
            {skills.map((group) => (
              <div key={group.label}>
                <dt>{group.label}</dt>
                <dd>{group.items.join(", ")}</dd>
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
