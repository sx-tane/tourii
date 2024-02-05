import { Suspense } from "react";
import "@/styles/globals.css";
import Header from "@/components/header/header-white/Header";
import { type Metadata } from "next";
import Loading from "@/app/loading";

export const metadata: Metadata = {
  title: "About",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="#top" className="mx-6 h-full animate-fadeIn ">
      <Header />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
