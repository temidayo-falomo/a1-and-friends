import type { Metadata } from "next";
import { Geist_Mono, Raleway } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import GridBg from "@/components/grid-bg";
import { AudioProvider } from "@/components/AudioProvider";
import { FloatingAudioButton } from "@/components/FloatingAudioButton";
import { ConvexClientProvider } from "./ConvexClientProvider";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const canela = localFont({
  src: [
    {
      path: "../public/fonts/canela/Canela-Thin-Trial.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/canela/Canela-ThinItalic-Trial.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/canela/Canela-Light-Trial.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/canela/Canela-LightItalic-Trial.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/canela/Canela-Regular-Trial.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/canela/Canela-RegularItalic-Trial.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/canela/Canela-Medium-Trial.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/canela/Canela-MediumItalic-Trial.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/canela/Canela-Bold-Trial.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/canela/Canela-BoldItalic-Trial.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/canela/Canela-Black-Trial.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/canela/Canela-BlackItalic-Trial.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-canela",
});

export const metadata: Metadata = {
  title: "Exhibit | A1 & Friends",
  description: "The Future of African Entertainment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${geistMono.variable} ${canela.variable} antialiased`}
      >
        <ConvexClientProvider>
          <AudioProvider>{children}</AudioProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
