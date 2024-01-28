"use client";

import CartSummary from "@/components/marketplace/checkout/CartSummary";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { type NextPage } from "next";

const Checkout: NextPage = withPageAuthRequired(async () => {
  return (
    <div>
      <CartSummary />
    </div>
  );
});

export default Checkout;
