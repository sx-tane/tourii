import { Suspense } from "react";
import "@/styles/globals.css";
import { type Metadata } from "next";
import React from "react";
import Loading from "@/app/loading";
import Header from "@/components/header/header-white/Header";
import { CartProvider } from "@/components/context/CartContext";

export const metadata: Metadata = {
  title: "Kinchaku",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="item-center h-full animate-fadeIn overflow-hidden">
      <div className="mx-6">
        <Header />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}
