"use client";

import "./globals.css";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./(navbar)/navbar";
import { usePathname } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

const disableNavbarFooter = ["/login", "/register"];

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${inter.className} h-full flexc flex-col w-full`}>
        <SessionProvider>
          {!disableNavbarFooter.includes(pathname) && <Navbar />}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
