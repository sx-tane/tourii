import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "../loading";
import Header from "@/components/header/header-white/Header";
import { type Metadata as NextMetadata } from "next";

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
};

export const metadata: Metadata = {
  title: " ",
  description: " ",
  keywords:
    "Japan travel, tourism, cultural experiences, Japanese destinations",
  language: "en",
  geo: {
    region: "JP",
    placename: "Tokyo",
  },
  category: "Travel",
  viewport: "width=device-width, initial-scale=1.0",
  og: {
    title: " ",
    description: " ",
    image: "",
    url: " ",
    locale: "ja_JP",
  },
  canonical: " ",
  twitter: {
    card: " ",
    site: " ",
    title: "Tourii",
    description: " ",
    image: "",
  },
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-6 animate-fadeIn">
      <Header />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
