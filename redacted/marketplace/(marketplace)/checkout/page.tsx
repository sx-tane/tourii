"use client";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import type { NextPage } from "next";
import CartSummary from "redacted/marketplace/marketplace-component/checkout/CartSummary";

const Checkout: NextPage = withPageAuthRequired(async () => {
	return (
		<div>
			<CartSummary />
		</div>
	);
});

export default Checkout;
