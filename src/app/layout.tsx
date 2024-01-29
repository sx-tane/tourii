import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "./loading";
import { type Viewport, type Metadata as NextMetadata } from "next";
import { Montserrat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { CartProvider } from "@/components/context/CartContext";
import { Toaster } from "@/lib/ui/toast";

const baseURL = new URL("https://www.tourii.xyz/");

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

type Metadata = NextMetadata & {
  language: string;
  category: string;
  viewport: string;
  og: {
    title: string;
    description: string;
    image: string;
    url: string;
    locale: string;
  };
  canonical: string;
  twitter: {
    card: string;
    site: string;
    title: string;
    description: string;
    image: string;
  };
  geo: {
    region: string;
    placename: string;
  };
  title: {
    default: string;
    template: string;
  };
  description: string;
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseURL.toString()),
  language: "en",
  geo: {
    region: "JP",
    placename: "Tokyo",
  },
  category: "Travel",
  viewport: "width=device-width, initial-scale=1.0",
  og: {
    title: "Tourii - Unveiling Japan's Mystical Realms",
    description:
      "Unveiling Japan's mystical realms through narrative storytelling & Web 3.0 tourism.",
    image: "/homepage/tourii_main.png", // Replace with Open Graph image
    url: baseURL.toString(),
    locale: "ja_JP",
  },
  canonical: baseURL.toString(),
  twitter: {
    card: "summary_large_image",
    site: "@Tourii",
    title: "Tourii - Unveiling Japan's Mystical Realms",
    description:
      "Unveiling Japan's mystical realms through narrative storytelling & Web 3.0 tourism.",
    image: "/homepage/tourii_main.png", // Replace with Twitter card image
  },
  title: {
    default: "Tourii",
    template: "%s | Tourii",
  },
  description:
    "Unveiling Japan's mystical realms through narrative storytelling & Web 3.0 tourism.",
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
      <UserProvider>
        <body>
          <Suspense fallback={<Loading />}>
            <CartProvider>{children}</CartProvider>
            <Toaster />
            <SpeedInsights />
            <Analytics />
          </Suspense>
        </body>
      </UserProvider>
    </html>
  );
}
