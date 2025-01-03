import { Button } from "@/lib/ui/button";
import type { AddToCartButtonProps, CartItem } from "@/types/product-type";
import Link from "next/link";
import type React from "react";
import { useCart } from "redacted/marketplace/marketplace-api/cart/CartContext";
import { toast } from "sonner";

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
	product,
	purchaseData,
}) => {
	const { addToCart } = useCart();
	const handleAddToCart = async () => {
		const productWithDetails: CartItem = {
			product, // the product details
			purchaseData, // the purchase-specific details
		};

		// Add to local cart context
		addToCart(productWithDetails);

		// Show success notification
		toast("", {
			description: `${product.name} has been entrusted to your Kinchaku.`,
			style: {
				backgroundColor: "#21211b",
				color: "#e3e3dc",
			},
			action: {
				label: "Kinchaku",
				onClick: () => {
					<Link href={"/bonjin-bazaar"}>bonjin bazaar</Link>;
				},
			},
		});

		const cartItemData = {
			product: {
				productId: product.productId,
				productName: product.name,
			},
			purchaseData: {
				purchaseType: purchaseData.purchaseType,
				details: purchaseData.details,
				totalPurchase: purchaseData.totalPurchase,
			},
		};

		// Send the details to the backend
		try {
			const response = await fetch("/api/cart/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(cartItemData),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			console.log("Added to cart:", result);
		} catch (error) {
			console.error("Failed to add to cart:", error);
		}

		console.log("Product with details:", productWithDetails);
	};

	return (
		<div className="flex space-x-2">
			<Button
				variant="outline"
				onClick={handleAddToCart}
				className="rounded-full border-[1.5px] border-red bg-transparent px-4 py-2 text-sm font-medium uppercase tracking-widest text-red transition-all duration-300 hover:bg-red hover:text-warmGrey"
			>
				Add to Kinchaku
			</Button>
			<Link
				href={"/bonjin-bazaar"}
				className="rounded-full border-[1.5px] border-red bg-transparent px-4 py-2 text-sm font-medium uppercase tracking-widest text-red transition-all duration-300 hover:bg-red hover:text-warmGrey"
			>
				<div className="">bonjin bazaar</div>
			</Link>
		</div>
	);
};

export default AddToCartButton;
