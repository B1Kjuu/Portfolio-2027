import Link from "next/link";
import "./site.css";

// Shared top bar for the two inner worlds. `side` picks the palette and which
// world the switch link crosses over to.
export default function SiteNav({ side }: { side: "tech" | "edit" }) {
  const other = side === "tech" ? { href: "/editor", label: "Cut" } : { href: "/tech", label: "Build" };
  return (
    <header className={`sn sn-${side}`}>
      <Link href="/" className="sn-mark">b1kjuu</Link>
      <nav className="sn-links" aria-label="Main">
        <Link href={other.href}>{other.label}</Link>
        <a href="/CV_GUSI.pdf" target="_blank" rel="noreferrer">CV</a>
        <a className="sn-contact" href="mailto:joebeckgusi25@gmail.com">Contact</a>
      </nav>
    </header>
  );
}

// The band at the foot of each world that crosses over to the other one.
export function CrossOver({ to }: { to: "tech" | "edit" }) {
  const tech = to === "tech";
  return (
    <Link href={tech ? "/tech" : "/editor"} className={`xo xo-${to}`}>
      <span className="xo-word">
        {tech ? "Build" : "Cut"}
        <span className="xo-dot">.</span>
      </span>
      <span className="xo-go">
        {tech ? "See the builds" : "Watch the edits"}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

// Closing call to action; the copy differs per world, the action is the same.
export function ContactBand({ title, body }: { title: string; body: string }) {
  return (
    <section className="cb" aria-labelledby="cb-title">
      <h2 id="cb-title">{title}</h2>
      <div className="cb-side">
        <p>{body}</p>
        <div className="cb-acts">
          <a className="cb-main" href="mailto:joebeckgusi25@gmail.com">
            Get in touch
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a className="cb-alt" href="/CV_GUSI.pdf" target="_blank" rel="noreferrer">Read the CV</a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ side }: { side: "tech" | "edit" }) {
  return (
    <footer className={`sf sf-${side}`}>
      <span>Joebeck Andrew Gusi</span>
      <span className="sf-links">
        <a href="https://github.com/B1Kjuu" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/gusi-joebeck-andrew" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://www.facebook.com/b1kjuu" target="_blank" rel="noreferrer">Facebook</a>
        <a href="mailto:joebeckgusi25@gmail.com">Email</a>
      </span>
    </footer>
  );
}
