import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Meta from "@/lib/components/Meta";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CryptoHub – Real-Time Crypto Prices, News & Insights",
  description: "Track live cryptocurrency prices, market trends, and latest news. CryptoHub keeps you updated on Bitcoin, Ethereum, and more.",
};


if (process.env.NODE_ENV === "development") {
  await import("@/lib/mocks/init")
    .then(({ initMocks }) => initMocks())
    .then(() => console.log("mocks are ready"));
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Meta title={metadata.title as string} description={metadata.description as string} />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
