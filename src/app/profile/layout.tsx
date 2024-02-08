import { Suspense } from "react";
import "@/styles/globals.css";
import { type Metadata } from "next";
import React from "react";
import Loading from "@/app/loading";
import HeaderBlack from "@/components/header/header-black/Header";

export const metadata: Metadata = {
  title: "Profile",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <body className="h-full min-h-screen overflow-hidden bg-charcoal ">
      <div className="mx-6">
        <HeaderBlack />
        <Suspense fallback={<Loading />}>{children} </Suspense>
      </div>
    </body>
  );
}
