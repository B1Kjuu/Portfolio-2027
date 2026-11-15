import SplitLanding from "@/components/split/SplitLanding";
import { editorProjects, techProjects } from "@/lib/content";
import resortify from "@/assets/textures/resortifyph.jpg";
import hikesafe from "@/assets/textures/hikesafeweb.jpg";
import p3kcars from "@/assets/textures/p3kcars.jpg";
import reelEstate from "@/assets/reels/real-estate.jpg";
import reelCoffee from "@/assets/reels/ugc-coffee.jpg";
import reelCorona from "@/assets/reels/corona-del-mar.jpg";

// Back-to-front order; the cards further back are dimmed so the front one leads.
const techCards = [
  { src: p3kcars.src, tint: "#8a8f96" },
  { src: hikesafe.src, tint: "#c4c8cc" },
  { src: resortify.src },
];
const editCards = [
  { src: reelCorona.src, tint: "#d9d2c6" },
  { src: reelCoffee.src },
  { src: reelEstate.src },
];

export default function Home() {
  const videoCount = editorProjects.reduce((n, folder) => n + (folder.items?.length ?? 0), 0);

  return (
    <SplitLanding
      techCards={techCards}
      editCards={editCards}
      techCount={techProjects.length}
      liveCount={techProjects.filter((p) => p.demoLink).length}
      videoCount={videoCount}
      categoryCount={editorProjects.length}
    />
  );
}
