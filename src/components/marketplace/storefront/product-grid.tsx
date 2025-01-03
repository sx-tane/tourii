import type { ProductGridProps } from "@/types/product-type";
import type React from "react";
import ProductCard from "./product-card";

const ProductGrid: React.FC<ProductGridProps> = ({ products, currentPage }) => {
	return (
		<div
			key={currentPage} // Key change triggers the animation
			className="grid h-1/2 animate-fadeIn grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
		>
			{products.map((product) => (
				<ProductCard
					key={product.productId}
					product={product}
					textColor="warmGrey3"
					productTypeTextColor={"charcoal"}
				/>
			))}
		</div>
	);
};

export default ProductGrid;
