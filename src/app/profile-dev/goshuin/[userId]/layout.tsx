import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "@/app/loading";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Goshuin | Tourii",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <Suspense fallback={<Loading />}>{children} </Suspense>;
}
