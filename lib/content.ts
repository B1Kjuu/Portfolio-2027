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
    title: "Talking Heads",
    items: [
      {
        type: "video",
        title: "Why Micromanaging Means Trust Issues",
        description: "Talking-head reel on micromanaging, set in a branded frame with numbered note cards and a full-screen stat graphic.",
        note: "Influence with Hubert. Vertical, 2:02",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/influence-with-hubert/why-micromanaging-means-trust-issues.mp4"
      },
      {
        type: "video",
        title: "I Invest in You",
        description: "Founder-to-camera reel on why investors back people, cut with tag labels and full-screen kinetic type.",
        note: "Influence with Hubert. Vertical, 2:09",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/influence-with-hubert/i-invest-in-you.mp4"
      },
      {
        type: "video",
        title: "Cafes and Ideas",
        description: "Talking-head reel shot in a cafe, with bold two-tone captions and comic-style speech bubbles.",
        note: "Influence with Hubert. Vertical, 1:37",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/influence-with-hubert/cafes-and-ideas.mp4"
      },
      {
        type: "video",
        title: "Fancy Office",
        description: "Talking-head story with on-screen figures, quote cards and an animated meter.",
        note: "Influence with Hubert. Vertical, 3:15",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/influence-with-hubert/fancy-office.mp4"
      },
      {
        type: "video",
        title: "Persona",
        description: "Explainer reel styled as a notebook: handwritten titles, paper note cards and lowercase captions.",
        note: "Influence with Hubert. Vertical, 1:48",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/influence-with-hubert/persona.mp4"
      },
      {
        type: "video",
        title: "Trident Digital",
        description: "Studio talking head on recruiting, set with serif word-by-word captions.",
        note: "Vertical, 0:57",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/client-work/trident-digital.mp4"
      },
      {
        type: "video",
        title: "Lisa",
        description: "Real estate agent to camera, with caption highlights, property cutaways and black-and-white inserts.",
        note: "Vertical, 1:22",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/client-work/lisa-talking-head.mp4"
      },
      {
        type: "video",
        title: "Iman",
        description: "Direct-to-camera offer video with neon figures and full-screen text beats.",
        note: "Horizontal, 0:33",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/client-work/iman-talking-head.mp4"
      },
    ]
  },
  {
    type: "folder",
    title: "Ads",
    items: [
      {
        type: "video",
        title: "Semo Ad",
        description: "Cinematic food commercial: a family kitchen scene cut for warmth, carried by picture alone.",
        note: "Horizontal, 1:22",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/client-work/semo-ad.mp4"
      },
      {
        type: "video",
        title: "Pool Builders",
        description: "Trade-show promo mixing an on-site interview with cinematic cutaways, large type and a 3D globe graphic.",
        note: "Vertical, 0:21",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/client-work/pool-builders.mp4"
      },
      {
        type: "video",
        title: "Brenda Yip Ad",
        description: "Property advice ad shot in a show flat, with accent-colour captions and on-screen keywords.",
        note: "Vertical, 1:03",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/client-work/brenda-yip-ad.mp4"
      },
      {
        type: "video",
        title: "IBRA Ad",
        description: "Desk-and-microphone ad with highlighted captions, colour flashes and a subscribe prompt.",
        note: "Horizontal, 0:26",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/client-work/ibra-ad.mp4"
      },
    ]
  },
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
        title: "Kelowna Finance",
        description: "Professional yet accessible financial content. Incorporates clean data visualizations, smooth pacing, and authoritative branding.",
        note: "B2C trust-building.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/UGC/kelowna_finance.mp4"
      },
    ]
  },
  {
    type: "folder",
    title: "Events",
    items: [
      {
        type: "video",
        title: "Pawparazzi",
        description: "Event reel from a pet expo: quick interviews, crowd moments and bright captions.",
        note: "Vertical, 0:37",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/client-work/pawparazzi.mp4"
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
        title: "Motovlog",
        description: "High-octane action sequence. Relies heavily on speed-ramping, kinetic typography, and immersive spatial sound design.",
        note: "Action / Lifestyle edit.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/TRAVEL/MOTOVLOG%20trial.mp4"
      }
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
      {
        type: "video",
        title: "Real Estate Reel",
        description: "Walk-and-talk to camera with bold kinetic captions and a phone mock-up of a local Instagram ad.",
        note: "Vertical, 0:44",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/client-work/real-estate-reel.mp4"
      },
    ]
  },
  {
    type: "folder",
    title: "Long Form",
    items: [
      {
        type: "video",
        title: "East Coast Living Through the Seasons",
        description: "A long-form documentary-style video capturing the essence of East Coast life across all four seasons.",
        note: "Lifestyle and travel feature along the East Coast.",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/LONG%20FORM%20/Copy%20of%20East%20Coast%20living%20throughout%20the%20seasons.mp4"
      },
      {
        type: "video",
        title: "3 Forgotten Tricks from the 1950s",
        description: "Test Vintage-style Edit for a client.",
        note: "vintage-style edit about 1950s",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/LONG%20FORM%20/3%20forgotten%20tricks%20from%20the%201950s%20on%20how%20to%20be%20a%20beautiful%20woman.mp4"
      },
      {
        type: "video",
        title: "To Be a Millionaire",
        description: "Long-form finance video with animated 3D icons and illustrated cutaways.",
        note: "Horizontal, 4:56",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/client-work/to-be-a-millionaire.mp4"
      },
      {
        type: "video",
        title: "Educational Demo",
        description: "Long-form educational video to camera, with archival-style cutaways and on-screen effects.",
        note: "Horizontal, 3:23",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/client-work/educational-demo.mp4"
      },
      {
        type: "video",
        title: "Royston G King",
        description: "YouTube-style education video with numbered caption lists and animated interface cards.",
        note: "Horizontal, 1:04",
        videoUrl: "https://b1kjuumedia2026.blob.core.windows.net/videos/client-work/royston-g-king.mp4"
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
