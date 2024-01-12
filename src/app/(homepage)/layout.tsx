import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "../loading";

import Header from "@/components/header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="mx-6 h-screen animate-fadeIn overflow-hidden ">
        <Header />
        {children}
      </div>
    </Suspense>
  );
}
