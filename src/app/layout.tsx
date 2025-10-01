import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { seo } = siteConfig;

export const metadata: Metadata = {
  title: {
    default: seo.baseTitle,
    template: seo.titleTemplate ?? `%s · ${seo.baseTitle}`,
  },
  description: seo.description,
  metadataBase: new URL(seo.siteUrl),
  openGraph: {
    title: seo.baseTitle,
    description: seo.description,
    url: seo.siteUrl,
    siteName: siteConfig.name,
    images: [{ url: seo.ogImage }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.baseTitle,
    description: seo.description,
    site: seo.twitterHandle,
    creator: seo.twitterHandle,
    images: [seo.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
