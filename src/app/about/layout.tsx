import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "../loading";

import Header from "@/components/header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="item-center mx-6 mb-20 min-h-screen animate-fadeIn overflow-hidden">
        <Header />
        {children}
      </div>
    </Suspense>
  );
}
