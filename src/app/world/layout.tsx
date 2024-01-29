import { Suspense } from "react";
import "@/styles/globals.css";
import HeaderBlack from "@/components/header/header-black/Header";
import { type Metadata } from "next";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "World",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full animate-fadeIn bg-charcoal pb-10">
      <div className="mx-6">
        <HeaderBlack />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}
