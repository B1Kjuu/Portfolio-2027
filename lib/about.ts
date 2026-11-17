// Personal info for the About page. Source: GUSI_RESUME.pdf (public/). Edit here, not in the page.

export const person = {
  name: "Joebeck Andrew Gusi",
  role: "Full-stack developer, AI engineer, and video editor",
  location: "Manila, Philippines",
  email: "joebeckgusi@gmail.com",
  intro: [
    "I am a full-stack developer, AI engineer, and video editor based in Manila. I build responsive web apps and grounded AI products with React, Next.js, TypeScript, Supabase, and Gemini, while editing high-retention video for brands.",
    "I like working where product systems meet visual storytelling: the same person who designs the support workflow can also cut the launch video.",
  ],
};

export type Entry = { title: string; place?: string; when?: string; points: string[] };

export const experience: Entry[] = [
  {
    title: "Freelance Full-stack Developer and Video Editor",
    place: "Self-employed",
    when: "September 2026 to present",
    points: [
      "Build full-stack web applications and AI-powered products with modern TypeScript tooling, Supabase, and Gemini.",
      "Edit high-retention video and create visual assets for brands, creators, and product teams.",
    ],
  },
  {
    title: "Multimedia Specialist",
    place: "YAEY Production",
    when: "June 2026 to September 2026",
    points: [
      "Produce and edit video assets for brand marketing campaigns.",
      "Deliver high-retention test edits and tighten the visual storytelling workflow.",
    ],
  },
  {
    title: "Video Editor and Graphic Designer",
    place: "Trident Digital",
    when: "April 2026 to June 2026",
    points: [
      "Project-based graphic design and high-retention video editing in DaVinci Resolve and Fusion, including visual effects and documentary-style narratives.",
      "Used 3D camera tracking and node-based compositing in finished pieces.",
    ],
  },
  {
    title: "Front-End Developer",
    place: "8box Solutions Inc.",
    when: "July 2025 to June 2026",
    points: ["Built and maintained responsive web applications with React and modern JavaScript frameworks, across browsers and with performance in mind."],
  },
  {
    title: "Freelance Web Developer",
    place: "Self-employed",
    when: "2021 to 2023",
    points: ["Designed and built custom responsive websites for 10+ clients across different industries, from first consultation to deployment."],
  },
];

// Both from the 8box Solutions role; kept here so each fact appears once.
export const highlights: string[] = [
  "Rebuilt a company website's front end, cutting page load time by 45% and raising conversion by 28%.",
  "Helped build the system and website for The Institute of Internal Auditors Philippines, giving 2,000+ professionals easier access to resources.",
];

export const education: Entry[] = [
  {
    title: "BS Computer Engineering",
    place: "Polytechnic University of the Philippines",
    when: "October 2022 to present",
    points: [
      "Major in System Development.",
      "Thesis: Long Range for Robust Emergency Communication with Mobile App Integration for Beginner Hikers (HikeSafe).",
    ],
  },
];

export const skills: { label: string; items: string[] }[] = [
  {
    label: "Core",
    items: ["Responsive web design", "UI/UX implementation", "Full-stack development", "AI product development", "Video editing", "Graphic design", "Retention-based storytelling", "Visual effects", "3D camera tracking"],
  },
  { label: "Languages", items: ["JavaScript", "TypeScript", "HTML5", "CSS3", "Python", "C", "C++", "C#", "PHP", "Java", "SQL", "Assembly"] },
  {
    label: "Frameworks",
    items: ["React", "Next.js", "React Native", "Node.js", "Tailwind CSS", "Material UI", "Redux", "Vue.js", "Express.js", "Bootstrap", "jQuery", "Shopify Liquid"],
  },
  { label: "AI and platform", items: ["Gemini", "Supabase", "PostgreSQL", "pgvector", "n8n", "Sentry", "Vercel", "GSAP"] },
  { label: "Databases and cloud", items: ["Firebase", "Redis", "MySQL", "Microsoft Azure"] },
  {
    label: "Tools",
    items: ["Git and GitHub", "VS Code", "Postman", "Figma", "Vite", "DaVinci Resolve", "Adobe Premiere Pro", "Adobe Photoshop", "Adobe Illustrator", "Canva", "Affinity"],
  },
  { label: "Hardware", items: ["Arduino", "ESP32 and ESP8266", "LoRa"] },
  { label: "Certificates", items: ["Understanding Data Engineering", "Introduction to Git", "Cisco CCNA: Introduction to Networks"] },
];
