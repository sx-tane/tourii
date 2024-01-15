import { Suspense } from "react";
import "@/styles/globals.css";
import Header from "@/components/header-white/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="item-center mb-20 h-full animate-fadeIn overflow-hidden">
        <div className="mx-6">
          <Header />
          {children}
        </div>
      </div>
    </Suspense>
  );
}
