import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "../loading";
import Header from "@/components/header/header-white/Header";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <div id="#top" className="mx-6 h-full animate-fadeIn ">
        <Header />
        {children}
      </div>
    </Suspense>
  );
}
