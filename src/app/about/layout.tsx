import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "../loading";
import { Metadata } from "next";
import { Montserrat } from "next/font/google";

import Header from "@/components/header/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tourii",
    template: "%s | Tourii",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="mx-6 min-h-screen animate-fadeIn overflow-hidden">
        <Header />
        {children}
      </div>
    </Suspense>
  );
}
