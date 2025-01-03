import Line from "@/components/about/divider-line/line";
import { productsData } from "@/lib/data/marketplace/product-data";
import type { RelatedProductsProps } from "@/types/product-type";
import type React from "react";
import ProductCard from "../storefront/product-card";

const RelatedProducts: React.FC<RelatedProductsProps> = ({
	bungoOnoArea,
	productId,
}) => {
	const filteredProducts = productsData.filter(
		(product) =>
			product.category.bungoOnoArea === bungoOnoArea &&
			product.productId !== productId,
	);

	const displayedProducts = filteredProducts.slice(0, 6);

	return (
		<div>
			<div className="relative -my-5 mx-auto flex w-6/12 items-center justify-center align-middle">
				<Line />
			</div>
			<h2 className="text-center text-3xl font-bold uppercase tracking-widest text-red">
				Engage in the Art of {bungoOnoArea}
			</h2>
			<div className="relative -my-5 mx-auto flex w-6/12 items-center justify-center align-middle">
				<Line />
			</div>
			<div className=" grid grid-cols-6">
				{displayedProducts.map((product) => (
					<ProductCard
						key={product.productId}
						product={product}
						textColor={"red"}
						productTypeTextColor={"warmGrey"}
					/>
				))}
			</div>
		</div>
	);
};

export default RelatedProducts;
