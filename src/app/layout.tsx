import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  IBM_Plex_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { ReadingProgress } from "@/components/animations/ReadingProgress";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/sections/Navbar";
import { getProfile, getSiteUrl } from "@/lib/data";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0C0E12" },
    { media: "(prefers-color-scheme: light)", color: "#F6F7F9" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rahmat Suhadi | Frontend & Fullstack Developer",
    template: "%s | Rahmat Suhadi",
  },
  description:
    "Portofolio Rahmat Suhadi, Frontend & Fullstack Developer di Yogyakarta. Membangun aplikasi web yang rapi dan cepat dengan React, Next.js, dan TypeScript.",
  authors: [{ name: "Rahmat Suhadi", url: siteUrl }],
  creator: "Rahmat Suhadi",
  publisher: "Rahmat Suhadi",
  keywords: [
    "Rahmat Suhadi",
    "Frontend Developer",
    "Fullstack Developer",
    "React",
    "Next.js",
    "Nuxt.js",
    "TypeScript",
    "Yogyakarta",
    "Portofolio Web Developer",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rahmat Suhadi | Frontend & Fullstack Developer",
    description:
      "Portofolio Rahmat Suhadi, Frontend & Fullstack Developer dari Yogyakarta yang berfokus pada pengembangan aplikasi web.",
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Rahmat Suhadi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahmat Suhadi | Frontend & Fullstack Developer",
    description:
      "Frontend & Fullstack Developer berbasis di Yogyakarta. Fokus di React, Next.js, Nuxt.js, dan TypeScript.",
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}else{document.documentElement.dataset.theme='dark';}}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = getProfile();

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${bricolage.variable} ${jakarta.variable} ${ibmMono.variable} antialiased`}
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static theme init script before first paint */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <ReadingProgress />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-accent-foreground"
          >
            Loncat ke konten utama
          </a>
          <Navbar resumeUrl={profile.resumeUrl} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
