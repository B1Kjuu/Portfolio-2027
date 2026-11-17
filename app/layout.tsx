import type { Metadata } from "next";
import { Archivo, Fraunces, Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Wipe from "@/components/site/Wipe";
import "./globals.css";

const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"] });
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Joebeck Andrew Gusi — Developer, AI engineer, and video editor",
  description: "Portfolio of Joebeck Andrew Gusi (b1kjuu): full-stack web and AI products, mobile and hardware builds, and client video edits.",
  metadataBase: new URL("https://b1kjuu.studio"),
};

// Runs before the first paint. Everyone enters through the landing page: a first visit to any
// other address is sent to "/", where the opening curtain plays once per browser session.
const ENTRY_GATE = `(function(){try{var d=document.documentElement;if(sessionStorage.getItem("b1-entered")){d.setAttribute("data-entered","")}else if(location.pathname!=="/"){location.replace("/")}else{d.setAttribute("data-intro","")}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hanken.variable} ${archivo.variable} ${fraunces.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ENTRY_GATE }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a className="skip" href="#main">Skip to content</a>
        {children}
        <Wipe />
        <Analytics />
      </body>
    </html>
  );
}
