"use client";

import dynamic from "next/dynamic";

// three.js loads only in the browser and only after the page itself is up.
const BuildScene = dynamic(() => import("./BuildScene"), { ssr: false });

export default function BuildStage({ shot }: { shot: string }) {
  return (
    <div className="tp-stage" aria-hidden>
      <BuildScene shot={shot} />
    </div>
  );
}
