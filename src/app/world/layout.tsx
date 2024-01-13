import { Suspense } from "react";
import "@/styles/globals.css";
import HeaderBlack from "@/components/header-black/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="h-full animate-fadeIn overflow-hidden bg-charcoal px-6">
        <HeaderBlack />
        {children}
      </div>
    </Suspense>
  );
}
