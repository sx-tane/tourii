// app/layout.tsx
import { Suspense } from "react";
import "@/styles/globals.css";
import { Toaster } from "@/lib/ui/toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Loading from "./loading";
import { ReduxProvider } from "@/lib/providers/redux-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tourii",
  description:
    "Unveiling Japan's mystical realms through narrative storytelling & Web 3.0 tourism.",
  openGraph: {
    title: "Tourii - Unveiling Japan's Mystical Realms",
    description:
      "Unveiling Japan's mystical realms through narrative storytelling & Web 3.0 tourism.",
    images: "https://tanejp.com/wp-content/uploads/2024/01/tourii_main.webp",
    url: "https://www.tourii.xyz/",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Tourii",
    title: "Tourii - Unveiling Japan's Mystical Realms",
    description:
      "Unveiling Japan's mystical realms through narrative storytelling & Web 3.0 tourism.",
    images: "https://tanejp.com/wp-content/uploads/2024/01/tourii_main.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-config"
          content="/favicons/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <ReduxProvider>
          <Suspense fallback={<Loading />}>
            {children}
            <Toaster />
            <SpeedInsights />
            <Analytics />
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}
