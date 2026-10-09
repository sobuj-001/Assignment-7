
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import HomeTicker from "./components/HomeTicker";
import ToasterProvider from "./components/ToasterProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BazarData",
  description: "Discover products with BazarData",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-[#f5f8f5] text-[#172019]">
        <div className="sticky top-0 z-50">
          <Navbar />
          <HomeTicker />
        </div>

        <ToasterProvider />

        <main>{children}</main>

        <footer className="border-t border-[#dce7de] bg-white py-6 text-xs text-gray-500">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
            <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>

            <p>
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

