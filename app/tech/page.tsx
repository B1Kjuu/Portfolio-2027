import type { Metadata } from "next";
import { Marquee, PointerArea, ScrollTools } from "@/components/site/Motion";
import SiteNav, { ContactBand, CrossOver, SiteFooter } from "@/components/site/SiteNav";
import { techProjects, techSkills } from "@/lib/content";
import TechIndex from "@/components/site/TechIndex";
import "./tech.css";

export const metadata: Metadata = {
  title: "Build — Joebeck Andrew Gusi",
  description: "Web, mobile and embedded hardware projects by Joebeck Andrew Gusi.",
};

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
              <strong>Web apps, mobile and embedded hardware.</strong> Client websites, practical apps and portfolio
              experiments built from idea to deployment.
            </p>
          </div>
        </PointerArea>

        <Marquee items={techSkills} label="Languages and frameworks" tone="tech" />

        <div className="tp-body">
          <TechIndex projects={techProjects} />
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
