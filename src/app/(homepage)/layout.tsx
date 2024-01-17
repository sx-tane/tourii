import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "../loading";
import Header from "@/components/header/header-white/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="animate-fadeIn lg:mx-6">
        <Header />
        {children}
      </div>
    </Suspense>
  );
}
