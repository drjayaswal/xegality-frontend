import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xegality - AI-Powered Legal Case Management",
  description: "Modern case management platform for legal professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {/* <Header /> */}
          <main className="mx-auto">
            <GridPattern className=" fixed -z-10 bg-gradient-to-br from-white to-indigo-500/20" />
            {children}
          </main>
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
