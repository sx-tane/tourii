import { Suspense } from "react";
import "@/styles/globals.css";
import { type Metadata } from "next";
import React from "react";
import Loading from "@/app/loading";
import HeaderBlack from "@/components/header/header-black/Header";

export const metadata: Metadata = {
  title: "Bonjin Bazaar",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <body className="h-full animate-fadeIn bg-charcoal ">
        <div className="mx-6">
          <HeaderBlack />
          {children}
        </div>
      </body>
    </Suspense>
  );
}
