
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNavBer from '@/pages/topNavBer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HRView - HR Management System",
  description: "Manage your workforce efficiently with HRView.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground `}
      >
        <TopNavBer className="bg-white overflow-hidden h-16 " ></TopNavBer>
        <main className="pt-16" >{children}</main>
      </body>
    </html>
  );
}
