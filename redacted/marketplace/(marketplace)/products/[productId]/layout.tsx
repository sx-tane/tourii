import { Suspense } from "react";
import "@/styles/globals.css";
import Header from "@/components/header/header-white/header-white";
import { productsData } from "@/lib/data/marketplace/product-data";
import type { Metadata } from "next";

type Props = {
	params: Promise<{
		productId: string;
	}>;
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
	const params = await props.params;
	const productId: string = await new Promise((resolve) => {
		setTimeout(() => {
			resolve(`${params.productId}`);
		}, 300);
	});
	const product = productsData.find((p) => p.productId === productId);
	const decodeproductId = product?.name ?? "";
	return {
		title: {
			absolute: `${decodeproductId} | Bonjin Bazaar`,
		},
	};
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="item-center h-full animate-fadeIn overflow-hidden">
			<div className="mx-6">
				<Header />
				<Suspense>{children}</Suspense>
			</div>
		</div>
	);
}
