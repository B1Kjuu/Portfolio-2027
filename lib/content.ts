import type { StaticImageData } from "next/image";
import P3KCARS from "@/assets/projects/P3KCARS.png";
import PTSI from "@/assets/projects/PTSI.png";
import RESORTIFYPH from "@/assets/projects/RESORTIFYPH.png";
import IIA from "@/assets/projects/IIA.png";
import HIKESAFE from "@/assets/projects/HIKESAFE.png";
import HIKESAFEWEB from "@/assets/projects/HIKESAFEWEB.png";
import EASYJOURNAL from "@/assets/projects/EASYJOURNAL.png";
import INTERFACE2026 from "@/assets/projects/INTERFACE2026.png";
import OLDPORTFOLIO from "@/assets/projects/OLDPORTFOLIO.png";
import PORTFOLIO2026 from "@/assets/projects/PORTFOLIO2026.png";
import affinityIcon from "@/assets/techicons/Affinity.svg";
import canvaIcon from "@/assets/techicons/Canva.svg";
import davinciIcon from "@/assets/techicons/DaVinci Resolve.svg";
import firebaseIcon from "@/assets/techicons/Firebase.svg";
import nextIcon from "@/assets/techicons/Next.svg";
import nodeIcon from "@/assets/techicons/Node.svg";
import photoshopIcon from "@/assets/techicons/Photoshop.svg";
import pythonIcon from "@/assets/techicons/Python.svg";
import reactIcon from "@/assets/techicons/React.svg";
import tailwindIcon from "@/assets/techicons/Tailwind.svg";
import typescriptIcon from "@/assets/techicons/Typescript.svg";

export type TechProject = {
  title: string;
  category: "Websites" | "Apps" | "Hardware" | "Portfolio";
  description: string;
  note: string;
  image: string | StaticImageData;
  demoLink?: string;
  ghLink?: string;
};

export const techStats = [
  { value: "3+", label: "live products and portfolio builds" },
  { value: "90+", label: "Lighthouse scores targeted in production" },
  { value: "Full-stack", label: "React, Node, UI systems, and deployment" },
];

export const techProjects: TechProject[] = [
  {
    title: "P3KCARS",
    category: "Websites",
    description: "Public website with responsive UI and clean navigation.",
    note: "Frontend build with a polished user-facing experience.",
    image: P3KCARS, 
    demoLink: "https://p3kcars.com",
  },
  {
    title: "PTSI",
    category: "Websites",
    description: "Company site deployed to Firebase Hosting.",
    note: "Deployed with a lightweight, reliable web stack.",
    image: PTSI,
    demoLink: "https://ptsi-ca79a.web.app",
  },
  {
    title: "ResortifyPH",
    category: "Websites",
    description: "Resort booking platform (under development).",
    note: "Designed to feel fast on mobile and desktop.",
    image: RESORTIFYPH,
    demoLink: "https://resortifyph.me",
  },
  {
    title: "IIA",
    category: "Websites",
    description: "Organization website: content, resources, and membership info.",
    note: "Built to centralize event and org information.",
    image: IIA,
    demoLink: "https://iia-p.org",
  },
  {
    title: "HikeSafe app",
    category: "Apps",
    description: "Safety-focused hiking app; code available on GitHub.",
    note: "This App is built using React Native, used for offline communication",
    image: HIKESAFE,
    ghLink: "https://github.com/B1kjuu/hikesafenew",
  },
  {
    title: "HikeSafe website",
    category: "Websites",
    description: "Official Website of HIKESAFE. Showcasing our Thesis.",
    note: "Developed to showcase our thesis project.",
    image: HIKESAFEWEB,
    demoLink: "https://hike-safe-website-6lktg4co8-jubikks-projects.vercel.app",
  },
  {
    title: "EasyJournal",
    category: "Apps",
    description: "Simple journaling app; repository with implementation details.",
    note: "A lightweight personal writing tool.",
    image: EASYJOURNAL,
    ghLink: "https://github.com/B1kjuu/EasyJournal",
  },
  {
    title: "Interface 2026",
    category: "Websites",
    description: "A seminar website for INTERFACE 2026 with speaker profiles, roadmap, and registration details.",
    note: "Bridges the event content into a polished seminar experience.",
    image: INTERFACE2026,
    demoLink: "https://interface-2026-six.vercel.app",
  },
  {
    title: "Portfolio 2026",
    category: "Portfolio",
    description: "Last year's portfolio: a tech side and a Windows 95-style desktop for the editing work.",
    note: "Built with Next.js, React95 and Tailwind CSS.",
    image: PORTFOLIO2026,
    demoLink: "https://portfolio-202six.vercel.app",
    ghLink: "https://github.com/B1Kjuu/Portfolio-2026",
  },
  {
    title: "Portfolio 2025",
    category: "Portfolio",
    description: "Archived 2025 portfolio, forked from a template.",
    note: "Templated portfolio from one of the trending templates.",
    image: OLDPORTFOLIO,
    demoLink: "https://b1kjuu-portfolio.vercel.app",
  },
];

// `dark` marks a black icon that needs inverting on the dark Build strip.
export type Tool = { name: string; icon: StaticImageData; dark?: boolean };

export const techSkills: Tool[] = [
  { name: "TypeScript", icon: typescriptIcon },
  { name: "React", icon: reactIcon },
  { name: "Next.js", icon: nextIcon, dark: true },
  { name: "Node.js", icon: nodeIcon },
  { name: "Tailwind CSS", icon: tailwindIcon },
  { name: "Python", icon: pythonIcon },
  { name: "Firebase", icon: firebaseIcon },
];

export const editorStats = [
  { value: "Story-first", label: "visual edits with pacing and mood" },
  { value: "Photo + video", label: "color, framing, retouching, and motion" },
  { value: "Social-ready", label: "formatting for reels, shorts, and campaigns" },
];

export type EditorItem = {
  type: "folder" | "video";
  title: string;
  description?: string;
  note?: string;
  videoUrl?: string;
  items?: EditorItem[];
};

export const editorProjects : EditorItem[] = [
{
    type: "folder",
    title: "UGC",
    items: [
      {
type: "video",
        title: "Cody Chaffee",
        description: "Dynamic personal branding cut focusing on speaker authority. Features clean typography and seamless jump cuts to maintain viewer engagement.",
        note: "Optimized for TikTok/Reels.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/UGC/Cody%20Chaffee.mov"
      },
      {
        type: "video",
        title: "Fungy Mushroom Coffee",
        description: "High-energy product showcase. Utilizes rhythm-driven transitions, engaging sound design, and quick text callouts to highlight benefits.",
        note: "E-commerce direct response.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/UGC/Fungy%20Mushroom%20Coffee.mp4"
      },
      {
        type: "video",
        title: "King's Media",
        description: "Documentary-style assessment edit. Emphasizes retention-based pacing, visual hooks, and strategic B-roll placement.",
        note: "High-retention agency test.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/UGC/King_s%20Media.mp4"
      },
      {
        type: "video",
        title: "KneeMax",
        description: "Problem-solution ad structure. Combines clean motion graphics and fast-paced editing designed to drive immediate viewer action.",
        note: "Performance marketing.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/UGC/KneeMax_.mp4"
      },
      {
        type: "video",
        title: "Final Clip 1",
        description: "A/B test variation focusing on a strong visual hook. Built to stop the scroll within the critical first 3 seconds.",
        note: "First-3-seconds hook focus.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/UGC/RAW%20Clip%201_FInal.mp4"
      },
      {
        type: "video",
        title: "Final Clip 2",
        description: "Narrative-driven UGC edit. Focuses on authentic storytelling and user experience to build product trust.",
        note: "Story-driven ad.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/UGC/RAW%20Clip%20Snd_Final.mp4"
      },
      {
        type: "video",
        title: "Final Clip 3",
        description: "Fast-paced compilation featuring energetic cuts, dynamic zooms, and trend-conscious audio syncing.",
        note: "Social media deliverable.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/UGC/RAW%20Clip%20Trd_Final.mp4"
      },
      {
        type: "video",
        title: "Kelowna Finance",
        description: "Professional yet accessible financial content. Incorporates clean data visualizations, smooth pacing, and authoritative branding.",
        note: "B2C trust-building.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/UGC/kelowna_finance.mp4"
      },
    ]
  },
  {
    type: "folder",
    title: "Travel",
    items: [
      {
        type: "video",
        title: "Death Valley",
        description: "Cinematic landscape edit. Features advanced color grading, sky replacements, and subtle Fusion compositing for a premium feel.",
        note: "Highlighting the Travel on Death Valley.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/TRAVEL/Death%20Valley.mp4"
      },
      {
        type: "video",
        title: "MOTOVLOG",
        description: "High-octane action sequence. Relies heavily on speed-ramping, kinetic typography, and immersive spatial sound design.",
        note: "Action / Lifestyle edit.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/TRAVEL/MOTOVLOG%20trial.mp4"
      }
    ]
  },
  {
    type: "folder",
    title: "Short Fact Reels",
    items: [
      {
        type: "video",
        title: "Amsterdam Clock",
        description: "A short fact reel about the iconic Amsterdam clock and its history.",
        note: "Fun fact about Dutch timekeeping and culture.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/SHORT%20FACTS%20REELS/AMSTERDAM%20CLOCK.mp4"
      },
      {
        type: "video",
        title: "Clean Windows = Better Visibility",
        description: "A quick tip reel on why keeping your windows clean improves visibility and safety.",
        note: "Practical life hack for drivers and homeowners.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/SHORT%20FACTS%20REELS/Clean%20windows%20=%20better%20visibility.mp4"
      },
      {
        type: "video",
        title: "Dental Formula - Water Additive",
        description: "A short reel highlighting a dental water additive formula for better oral hygiene.",
        note: "Pet or human dental health product feature.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/SHORT%20FACTS%20REELS/DENTAL%20FORMULA%20-%20WATER%20ADDITIVE.mp4"
      },
      {
        type: "video",
        title: "F1 Car",
        description: "A fast-paced fact reel breaking down insane engineering stats of a Formula 1 car.",
        note: "Great for motorsport and engineering enthusiasts.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/SHORT%20FACTS%20REELS/F1%20CAR.mp4"
      },
      {
        type: "video",
        title: "Firefighter Wiggle",
        description: "A reel explaining the signature wiggle technique firefighters use when navigating through smoke.",
        note: "Safety and rescue technique breakdown.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/SHORT%20FACTS%20REELS/FIREFIGHTER%20WIGGLE.mp4"
      },
      {
        type: "video",
        title: "Happy Saffron",
        description: "A short fact reel on saffron's mood-boosting properties and its use as a natural antidepressant.",
        note: "Covers the science behind saffron and mental wellness.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/SHORT%20FACTS%20REELS/HAPPY%20SAFFRON.mp4"
      },
      {
        type: "video",
        title: "Have You Lost a Hat Too? #Melbourne",
        description: "A fun reel about Melbourne's notoriously windy streets and the hats they claim.",
        note: "Relatable moment for Melbourne locals and visitors.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/SHORT%20FACTS%20REELS/Have%20you%20lost%20a%20hat%20too%23melbour.mp4"
      },
      {
        type: "video",
        title: "How Do Astronauts POOP in Space!",
        description: "A hilarious yet informative reel on the engineering challenge of using the bathroom in zero gravity.",
        note: "One of the most asked questions about space life — answered.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/SHORT%20FACTS%20REELS/How%20Do%20Astronauts%20POOP%20in%20Space!.mp4"
      },
      {
        type: "video",
        title: "Mud Water",
        description: "A short reel about MudWtr, the coffee alternative made from mushrooms and adaptogens.",
        note: "Health and wellness product spotlight.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/SHORT%20FACTS%20REELS/MUD%20WATER.mp4"
      },
      {
        type: "video",
        title: "Meet Brick",
        description: "The ultimate solution to reclaim your focus — a physical device that blocks distracting apps.",
        note: "Productivity and digital wellness product feature.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/SHORT%20FACTS%20REELS/Meet%20Brick,%20the%20ultimate%20solution%20to%20reclaim%20your%20focus.mp4"
      },
      {
        type: "video",
        title: "On Sale - $500 Off! Saunas",
        description: "A promotional reel for high-quality, non-toxic saunas now on sale with $500 off.",
        note: "Limited-time offer on ready-to-use home saunas.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/SHORT%20FACTS%20REELS/On%20sale%20-%20$500%20off!All%20our%20saunas%20are--%20Made%20of%20high%20quality,%20non-toxic%20materials-%20Delivered%20rea.mp4"
      },
      {
        type: "video",
        title: "Shrimp Salad",
        description: "A quick and satisfying shrimp salad recipe or food fact reel packed with flavor tips.",
        note: "Great for food lovers and quick meal inspiration.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/SHORT%20FACTS%20REELS/SHRIMP%20SALAD.mp4"
      },
      {
        type: "video",
        title: "Why Are People Still Eating GOLD! 💀💸",
        description: "A shocking fact reel on the bizarre trend of consuming edible gold and whether it's worth it.",
        note: "Covers the health, history, and cost of eating gold.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/SHORT%20FACTS%20REELS/Why%20Are%20People%20Still%20Eating%20GOLD!%20%F0%9F%92%80%F0%9F%92%B8.mp4"
      },
      {
        type: "video",
        title: "Why Is the Stadium SHAKING!",
        description: "A fascinating reel explaining the science behind stadium vibrations during massive crowd events.",
        note: "Structural engineering meets crowd psychology.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/SHORT%20FACTS%20REELS/Why%20Is%20the%20Stadium%20SHAKING!.mp4"
      },
    ]
  },
  {
    type: "folder",
    title: "Real Estate",
    items: [
      {
        type: "video",
        title: "Corona del Mar",
        description: "A real estate showcase video highlighting the beauty and luxury of Corona del Mar properties.",
        note: "Coastal luxury real estate feature in Corona del Mar, CA.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/REAL%20ESTATE/Corona%20del%20Mar.mp4"
      },
    ]
  },
  {
    type: "folder",
    title: "Long Form",
    items: [
      {
        type: "video",
        title: "East Coast Living Throughout the Seasons",
        description: "A long-form documentary-style video capturing the essence of East Coast life across all four seasons.",
        note: "Lifestyle and travel feature along the East Coast.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/LONG%20FORM%20/Copy%20of%20East%20Coast%20living%20throughout%20the%20seasons.mp4"
      },
      {
        type: "video",
        title: "Hack-A-Shaq",
        description: "A long-form sports video diving into the infamous Hack-a-Shaq strategy in NBA history.",
        note: "In-depth basketball tactics and history breakdown.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/LONG%20FORM%20/Hack-A-Shaq.mp4"
      },
      {
        type: "video",
        title: "LeBron vs Kobe - Every Time They Faced Off",
        description: "A comprehensive long-form breakdown of every head-to-head matchup between LeBron James and Kobe Bryant.",
        note: "Epic NBA rivalry deep dive covering all their meetings.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/LONG%20FORM%20/LeBron%20vs%20Kobe%20-%20Every%20Time%20They%20Faced%20Off.mp4"
      },
      {
        type: "video",
        title: "VSL Final",
        description: "The final cut of a Video Sales Letter (VSL) designed to convert viewers into customers.",
        note: "Polished VSL ready for campaign deployment.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/LONG%20FORM%20/VSL%20FINAL.mp4"
      },
      {
        type: "video",
        title: "3 forgotten tricks from the 1950s on how to be a beautiful woman",
        description: "Test Vintage-style Edit for a client.",
        note: "vintage-style edit about 1950s",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/LONG%20FORM%20/3%20forgotten%20tricks%20from%20the%201950s%20on%20how%20to%20be%20a%20beautiful%20woman.mp4"
      },
    ]
  },
];

export const editorTools: Tool[] = [
  { name: "DaVinci Resolve", icon: davinciIcon },
  { name: "Adobe Photoshop", icon: photoshopIcon },
  { name: "Affinity", icon: affinityIcon },
  { name: "Canva", icon: canvaIcon },
];
