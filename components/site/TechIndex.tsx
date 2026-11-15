"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { TechProject } from "@/lib/content";
import { slug } from "@/lib/slug";

const UpRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

type Category = TechProject["category"];
const categories = ["All", "Websites", "Apps", "Hardware", "Portfolio"] as const;

// What each kind of work covers. Wording follows the resume; Hardware has no project page yet,
// so it describes the work and points at the project it shipped in.
const kinds: { category: Category; line: string }[] = [
  { category: "Websites", line: "Responsive company, organization and event sites in React and Next.js, taken from first consultation to deployment." },
  { category: "Apps", line: "Mobile and web apps, including an offline-first React Native app for hikers." },
  { category: "Hardware", line: "Embedded builds with Arduino, ESP32 and LoRa, like the long-range radio link behind HikeSafe." },
];

// The address shown in each browser frame.
const address = (link: string) => {
  try {
    const url = new URL(link);
    const host = url.hostname.replace(/^www\./, "");
    return host === "github.com" ? `${host}${url.pathname}` : host;
  } catch {
    return link;
  }
};

export default function TechIndex({ projects }: { projects: TechProject[] }) {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const list = useRef<HTMLDivElement>(null);
  const count = (item: Category) => projects.filter((project) => project.category === item).length;
  const shown = useMemo(
    () => (category === "All" ? projects : projects.filter((project) => project.category === category)),
    [category, projects],
  );

  const pick = (item: Category) => {
    setCategory(item);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      <section className="tp-kinds" aria-labelledby="tp-kinds-title">
        <h2 id="tp-kinds-title">What I build</h2>
        <ul>
          {kinds.map(({ category: kind, line }) => {
            const n = count(kind);
            return (
              <li key={kind}>
                {n > 0 ? (
                  <button type="button" onClick={() => pick(kind)}>
                    <span className="tp-kind">{kind}</span>
                    <span className="tp-kindLine">{line}</span>
                    <span className="tp-kindGo">
                      {n} {n === 1 ? "project" : "projects"} <UpRight />
                    </span>
                  </button>
                ) : (
                  <div>
                    <span className="tp-kind">{kind}</span>
                    <span className="tp-kindLine">{line}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <div ref={list} className="tp-filters" role="group" aria-label="Filter projects by category">
        {categories
          .filter((item) => item === "All" || count(item) > 0)
          .map((item) => (
            <button key={item} type="button" className={category === item ? "is-active" : undefined} aria-pressed={category === item} onClick={() => setCategory(item)}>
              {item}
              <span>{item === "All" ? projects.length : count(item)}</span>
            </button>
          ))}
      </div>

      <ul className="tp-list">
        {shown.map((project, i) => {
          const link = project.demoLink ?? project.ghLink;
          return (
            <li key={project.title} id={slug(project.title)} className="tp-row">
              <a
                className="tp-shot"
                href={link}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title}: ${project.demoLink ? "visit the site" : "view the code"}`}
              >
                <span className="tp-chrome" aria-hidden>
                  <i /><i /><i />
                  {link && <span className="tp-url">{address(link)}</span>}
                </span>
                <Image
                  src={project.image}
                  alt=""
                  sizes="(min-width: 900px) 58vw, 100vw"
                  placeholder={typeof project.image === "string" ? "empty" : "blur"}
                  priority={i === 0}
                />
              </a>
              <div className="tp-text">
                <h2>{project.title}</h2>
                <p className="tp-desc">{project.description}</p>
                <p className="tp-note">{project.note}</p>
                <div className="tp-meta">
                  {link && (
                    <a className="tp-link" href={link} target="_blank" rel="noreferrer">
                      {project.demoLink ? "Visit the site" : "View the code"}
                      <UpRight />
                    </a>
                  )}
                  <span className="tp-category">{project.category}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
