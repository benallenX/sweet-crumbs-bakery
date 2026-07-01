import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// TODO: set NEXT_PUBLIC_SITE_URL to the production domain once it's known.
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Sweet Crumbs Bakery",
  description: "Handcrafted pastries, artisan breads, and custom cakes baked fresh daily.",
  openGraph: {
    title: "Sweet Crumbs Bakery",
    description: "Handcrafted pastries, artisan breads, and custom cakes baked fresh daily.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sweet Crumbs Bakery",
    description: "Handcrafted pastries, artisan breads, and custom cakes baked fresh daily.",
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
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-amber-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to main content
          </a>
          {children}
        </body>
    </html>
  );
}
