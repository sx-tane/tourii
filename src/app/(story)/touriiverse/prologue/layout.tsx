import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "@/app/loading";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
	title: "Prologue | Tourii",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <Suspense fallback={<Loading />}>{children} </Suspense>;
}
