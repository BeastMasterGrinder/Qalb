import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/navbar";
import { AnimatePresence } from "framer-motion";
import { quranKareem, uthmanicScript, scheherazade, allahMuhammad, ayatQuran, aalmaghribi, khebratMusamim, ramadhanKarim } from "@/public/fonts/fonts";
import { PostHogProvider } from './providers'
import { Icon } from "lucide-react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "قلب | Qalb - Your Spiritual Companion",
    template: "%s | Qalb"
  },
  description: "Qalb - Your spiritual companion for Quranic learning and Islamic knowledge and Journaling. Explore beautiful Arabic calligraphy, Quranic verses, and Islamic teachings with our modern, accessible platform.",
  keywords: ["Quran", "Islamic", "Arabic", "Calligraphy", "Spiritual", "Learning", "Qalb", "قلب", "Journal"],
  authors: [{ name: "Farjad" }],
  creator: "Farjad",
  publisher: "Qalb",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "قلب | Qalb - Your Spiritual Companion",
    description: "Qalb - Your spiritual companion for Quranic learning and Islamic knowledge. Explore beautiful Arabic calligraphy, Quranic verses, and Islamic teachings with our modern, accessible platform.",
    url: defaultUrl,
    siteName: "Qalb",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "قلب | Qalb - Your Spiritual Companion",
    description: "Qalb - Your spiritual companion for Quranic learning and Islamic knowledge and Journaling. Explore beautiful Arabic calligraphy, Quranic verses, and Islamic teachings with our modern, accessible platform.",
    creator: "@QalbApp",
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={
      `${quranKareem.variable} 
      ${uthmanicScript.variable}
      ${scheherazade.variable}
      ${allahMuhammad.variable}
      ${ayatQuran.variable}
      ${aalmaghribi.variable}
      ${khebratMusamim.variable}
      ${ramadhanKarim.variable}
      `}>
      <script src="https://accounts.google.com/gsi/client" async></script>
      <body className={`${geistSans.className}`}>
        {/* <PostHogProvider> */}
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            <main>
              <AnimatePresence mode="wait">
                {children}
              </AnimatePresence>
            </main>
          </ThemeProvider>
        {/* </PostHogProvider> */}
      </body>
    </html>
  );
}
