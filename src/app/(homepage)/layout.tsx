import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "../loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="mx-6 animate-fadeIn">{children}</div>
    </Suspense>
  );
}
