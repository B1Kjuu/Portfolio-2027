import Link from "next/link";
import SiteNav from "@/components/site/SiteNav";

export default function NotFound() {
  return (
    <div className="world-tech" style={{ display: "flex", flexDirection: "column" }}>
      <SiteNav side="tech" about />
      <main id="main" style={{ flex: 1, display: "grid", alignContent: "center", gap: 20, padding: "48px var(--gutter)" }}>
        <h1 style={{ fontFamily: "var(--font-archivo), sans-serif", fontStretch: "118%", fontWeight: 820, fontSize: "clamp(44px, 8vw, 120px)", lineHeight: 0.92, letterSpacing: "-0.035em" }}>
          This page is not here.
        </h1>
        <p style={{ fontSize: 19, color: "var(--muted)", maxWidth: "48ch" }}>
          The link may be old or mistyped. The work is on the home page.
        </p>
        <Link href="/" className="cb-main" style={{ justifySelf: "start" }}>Go to the home page</Link>
      </main>
    </div>
  );
}
