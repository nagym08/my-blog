import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "My Blog",
    template: "%s | My Blog",
  },
  description:
    "A coding blog about software engineering, projects, and developer growth.",
  openGraph: {
    type: "website",
    siteName: "My Blog",
    title: "My Blog",
    description:
      "A coding blog about software engineering, projects, and developer growth.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Nav />
        <main
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            padding: "2rem 1.5rem",
            flex: 1,
          }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
