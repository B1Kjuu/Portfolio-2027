import type { Metadata } from "next";
import Image from "next/image";
import { Marquee, PointerArea, ScrollTools, SectionIndex } from "@/components/site/Motion";
import SiteNav, { ContactBand, CrossOver, SiteFooter } from "@/components/site/SiteNav";
import { techProjects, techSkills } from "@/lib/content";
import { slug } from "@/lib/slug";
import "./tech.css";

export const metadata: Metadata = {
  title: "Build — Joebeck Andrew Gusi",
  description: "Web, mobile and embedded hardware projects by Joebeck Andrew Gusi.",
};

const UpRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export default function TechPage() {
  return (
    <div className="world-tech">
      <SiteNav side="tech" />
      <ScrollTools />

      <main id="main">
        <PointerArea className="tp-hero">
          <h1 className="tp-title">Build<span>.</span></h1>
          <div className="tp-intro">
            <p className="tp-lede">
              <strong>Web apps, mobile and embedded hardware.</strong> {techProjects.length} projects, from client
              websites to an offline LoRa safety system for hikers.
            </p>
          </div>
        </PointerArea>

        <Marquee items={techSkills} label="Languages and frameworks" />

        <div className="tp-body">
          <aside className="tp-side">
            <SectionIndex label="Projects" items={techProjects.map((p) => ({ id: slug(p.title), title: p.title }))} />
          </aside>
          <ul className="tp-list">
          {techProjects.map((project, i) => {
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
                  {link && (
                    <a className="tp-link" href={link} target="_blank" rel="noreferrer">
                      {project.demoLink ? "Visit the site" : "View the code"}
                      <UpRight />
                    </a>
                  )}
                </div>
              </li>
            );
          })}
          </ul>
        </div>
      </main>

      <ContactBand
        title="Have something that needs building?"
        body="Tell me what it should do and who it is for. I can take it from a rough idea to a deployed site or app."
      />
      <CrossOver to="edit" />
      <SiteFooter side="tech" />
    </div>
  );
}
