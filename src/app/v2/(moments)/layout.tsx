"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function MomentsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={`${inter.className} min-h-screen bg-gray-50`}>
			<div className="container mx-auto px-4 py-8">
				{children}
			</div>
		</div>
	);
}