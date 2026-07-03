import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import Navbar from "@/components/Navbar";
import DemoBanner from "@/components/DemoBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const description =
  "Handcrafted pastries, artisan breads, and custom cakes baked fresh daily. A fictional bakery built as a demo project.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Sweet Crumbs Bakery",
  description,
  keywords: ["bakery", "pastries", "artisan bread", "custom cakes", "Maplewood NY"],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Sweet Crumbs Bakery",
    description,
    type: "website",
    url: "/",
    siteName: "Sweet Crumbs Bakery",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweet Crumbs Bakery",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <StructuredData />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-amber-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to main content
          </a>
          <DemoBanner />
          <Navbar />
          {children}
        </body>
    </html>
  );
}
