import { Suspense } from "react";
import "@/styles/globals.css";
import Header from "@/components/header/header-white/Header";
import { type Metadata } from "next";
import Loading from "@/app/loading";

export const metadata: Metadata = {
  title: "Story",
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
