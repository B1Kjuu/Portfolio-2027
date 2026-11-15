import type { Metadata } from "next";
import { Archivo, Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"] });
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Joebeck Andrew Gusi — Developer and video editor",
  description: "Portfolio of Joebeck Andrew Gusi (b1kjuu): web, mobile and hardware builds, and client video edits.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hanken.variable} ${archivo.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
