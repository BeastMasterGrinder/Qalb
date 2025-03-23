import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/navbar";
import { quranKareem, uthmanicScript, scheherazade, allahMuhammad, ayatQuran, aalmaghribi, khebratMusamim, ramadhanKarim } from "@/public/fonts/fonts";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "قلب",
  description: "قلب",
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
      `}
      suppressHydrationWarning>
      <script src="https://accounts.google.com/gsi/client" async></script>
      <body className={`${geistSans.className} bg-background text-foreground h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex-1 flex flex-col overflow-hidden">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
