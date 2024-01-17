import { Suspense } from "react";
import "@/styles/globals.css";
import HeaderBlack from "@/components/header/header-black/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="item-center h-full animate-fadeIn overflow-hidden bg-charcoal pb-20">
        <div className="mx-6">
          <HeaderBlack />
          {children}
        </div>
      </div>
    </Suspense>
  );
}
