import { Suspense } from "react";
import "@/styles/globals.css";
import HeaderBlack from "@/components/header-black/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="item-center mb-20 min-h-screen animate-fadeIn overflow-hidden bg-charcoal">
        <div className="mx-6">
          <HeaderBlack />
          {children}
        </div>
      </div>
    </Suspense>
  );
}
