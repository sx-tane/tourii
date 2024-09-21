import { Suspense } from "react";
import "@/styles/globals.css";
import Header from "@/components/header/header-white/Header";
import { type Metadata } from "next";
import { productsData } from "@/lib/data/marketplace/productData";

type Props = {
  params: {
    productId: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
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
