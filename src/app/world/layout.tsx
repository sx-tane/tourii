import { Suspense } from "react";
import "@/styles/globals.css";
import Header from "@/components/header-white/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="min-h-screen animate-fadeIn overflow-hidden bg-black px-6">
        <Header />
        {children}
      </div>
    </Suspense>
  );
}
