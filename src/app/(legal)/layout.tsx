import Loading from "@/app/loading";
import { Header } from "@/components/header";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: {
		default: "Legal",
		template: "%s | Tourii Legal",
	},
	description: "Legal information and policies for Tourii platform",
};

export default function LegalLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-full flex flex-col">
			<div className="relative min-h-screen flex flex-col w-full mx-auto">
				<div className="relative w-full mx-auto">
					<div className="mx-5">
						<Header theme="white" />
					</div>
					<Suspense fallback={<Loading />}>{children}</Suspense>
				</div>
			</div>
		</div>
	);
}
