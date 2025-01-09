"use client";

import CartSummary from "@/components/marketplace/checkout/cart-summary";
import type { NextPage } from "next";

const Checkout: NextPage = () => {
	return (
		<div>
			<CartSummary />
		</div>
	);
};

export default Checkout;
