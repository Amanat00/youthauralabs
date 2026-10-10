import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://youthauralabs.com"),
  title: {
    default: "YouthAura Labs — Turn Potential Into Proof",
    template: "%s | YouthAura Labs",
  },
  description:
    "A career-readiness academy helping students and early-career talent build practical skills, proof of work and career confidence.",
  keywords: [
    "YouthAura Labs",
    "career readiness",
    "career accelerator",
    "Pakistan",
    "AI automation",
    "freelancing",
    "digital skills",
    "students",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    title: "YouthAura Labs — Turn Potential Into Proof",
    description:
      "Career readiness, practical skills and proof you can take into the market.",
    url: "https://youthauralabs.com",
    siteName: "YouthAura Labs",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "YouthAura Labs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-background font-sans antialiased"
        suppressHydrationWarning
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}