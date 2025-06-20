import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Digital Passport | Tourii",
	description: "Your blockchain-verified digital travel passport",
};

export default function PassportLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}