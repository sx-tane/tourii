import { Suspense } from "react";
import "@/styles/globals.css";
import HeaderBlack from "@/components/header/header-black/Header";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "World",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="h-full animate-fadeIn bg-charcoal pb-10">
        <div className="mx-6">
          <HeaderBlack />
          {children}
        </div>
      </div>
    </Suspense>
  );
}
