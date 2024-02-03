import { Suspense } from "react";
import "@/styles/globals.css";
import { type Metadata } from "next";
import React from "react";
import Loading from "@/app/loading";

export const metadata: Metadata = {
  title: "Bungo Ono | Tourii",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loading />}>{children} </Suspense>;
}
