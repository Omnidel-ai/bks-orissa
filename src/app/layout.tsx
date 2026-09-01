import type { Metadata, Viewport } from "next";
import { Baloo_Da_2, Baloo_2, Hind_Siliguri, Hind, Noto_Sans_Oriya } from "next/font/google";
import "./globals.css";

/**
 * Sister-chapter fonts: same Baloo/Hind stack as West Bengal,
 * plus Noto Sans Oriya for Odia script.
 */
const balooDa = Baloo_Da_2({
  subsets: ["bengali", "latin"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo-da",
  display: "swap",
});

const baloo = Baloo_2({
  subsets: ["devanagari", "latin"],
  weight: ["600", "700"],
  variable: "--font-baloo",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const hind = Hind({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hind",
  display: "swap",
});

const notoOriya = Noto_Sans_Oriya({
  subsets: ["oriya", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-oriya",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bharatiya Krishak Samaj — Odisha",
  description:
    "Official chapter platform for Bharatiya Krishak Samaj, Odisha — sister site of BKS West Bengal.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#163a26",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = `${balooDa.variable} ${baloo.variable} ${hindSiliguri.variable} ${hind.variable} ${notoOriya.variable}`;
  return (
    <html lang="en" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
