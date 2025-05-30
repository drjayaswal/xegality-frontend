import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { GridPattern } from "@/components/ui/grid-pattern";
import Footer from "@/components/consumer/common/footer";

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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <GridPattern className=" fixed -z-10 bg-gradient-to-br from-white to-indigo-500/20" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
