import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Resepi GPT",
  description: "Resepi GPT",
  icons: {
    icon: '/chef_icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${outfit.variable}`}>
      <body className="font-outfit">
        <ThemeProvider>{children}</ThemeProvider>
        
        {/* Umami Analytics */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="a8d44d16-6cad-4a92-b9ae-3a72a949c452"
          strategy="afterInteractive"
          defer
        />
      </body>
    </html>
  );
}
