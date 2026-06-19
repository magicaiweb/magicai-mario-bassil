import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Mario Bassil Official | Comedy Night, Tours, Booking",
  description:
    "Official bilingual website draft for Mario Bassil with shows, videos, press, booking, newsletter, and CMS-managed content.",
  keywords: [
    "Mario Bassil",
    "Mario Bassil official",
    "Comedy Night",
    "Lebanese comedian",
    "Mario Bassil booking",
    "Mario Bassil tour",
    "Lebanon comedy",
    "Arab comedy shows",
  ],
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
