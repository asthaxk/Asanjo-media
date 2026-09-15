import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Asanjo Media — Independent Creative Studio",
  description:
    "Asanjo Media. An award-winning creative agency where beauty meets meaning. Brands and digital experiences built through strategy, storytelling, design and technology.",
};

export const viewport: Viewport = {
  themeColor: "#fbfbf9",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="js">
      <head>
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        {/* Switzer — closest free equivalent to Neue Montreal (same neo-grotesque
            proportions and near-identical letterforms). Swap this for the
            licensed PPNeueMontreal-Regular.woff2 via next/font/local when the
            license is in hand. */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500&display=swap"
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
