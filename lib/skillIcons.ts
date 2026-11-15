import type { StaticImageData } from "next/image";
import affinity from "@/assets/techicons/Affinity.svg";
import arduino from "@/assets/techicons/arduino.svg";
import azure from "@/assets/techicons/Microsoft Azure.svg";
import canva from "@/assets/techicons/Canva.svg";
import csharp from "@/assets/techicons/Csharp.svg";
import davinci from "@/assets/techicons/DaVinci Resolve.svg";
import firebase from "@/assets/techicons/Firebase.svg";
import git from "@/assets/techicons/Git.svg";
import java from "@/assets/techicons/Java.svg";
import javascript from "@/assets/techicons/Javascript.svg";
import mui from "@/assets/techicons/MUI.svg";
import next from "@/assets/techicons/Next.svg";
import node from "@/assets/techicons/Node.svg";
import photoshop from "@/assets/techicons/Photoshop.svg";
import postman from "@/assets/techicons/Postman.svg";
import python from "@/assets/techicons/Python.svg";
import react from "@/assets/techicons/React.svg";
import redis from "@/assets/techicons/Redis.svg";
import redux from "@/assets/techicons/Redux.svg";
import sql from "@/assets/techicons/SQL.svg";
import tailwind from "@/assets/techicons/Tailwind.svg";
import typescript from "@/assets/techicons/Typescript.svg";
import vscode from "@/assets/techicons/vscode.svg";

// Icon for a skill name used in lib/about.ts. Skills without an entry show as text only.
// `dark` marks a black icon that must be inverted on the dark About page.
export const skillIcons: Record<string, { icon: StaticImageData; dark?: boolean }> = {
  JavaScript: { icon: javascript },
  TypeScript: { icon: typescript },
  Python: { icon: python },
  "C#": { icon: csharp },
  Java: { icon: java },
  SQL: { icon: sql },
  React: { icon: react },
  "Next.js": { icon: next, dark: true },
  "Node.js": { icon: node },
  "Tailwind CSS": { icon: tailwind },
  "Material UI": { icon: mui },
  Redux: { icon: redux },
  Firebase: { icon: firebase },
  Redis: { icon: redis },
  "Microsoft Azure": { icon: azure },
  "Git and GitHub": { icon: git },
  "VS Code": { icon: vscode },
  Postman: { icon: postman },
  "DaVinci Resolve": { icon: davinci },
  "Adobe Photoshop": { icon: photoshop },
  Canva: { icon: canva },
  Affinity: { icon: affinity },
  Arduino: { icon: arduino },
};
