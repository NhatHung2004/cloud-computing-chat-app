import type { Metadata } from "next";
import { Geist, Geist_Mono, Andada_Pro } from "next/font/google";
import "./globals.css";
import 'typeface-abel';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const andadaPro = Andada_Pro({
  variable: "--font-andada-pro",
  subsets: ["latin"],
});

// const akshar = Akshar({
//   variable: "--font-akshar",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Login | Cloud Messenger",
  description: "Login to your account",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${andadaPro.variable}`}>
        {children}
      </body>
    </html>
  );
}
