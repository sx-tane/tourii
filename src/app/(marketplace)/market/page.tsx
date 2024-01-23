import ProductCard from "@/components/marketplace/storefront/ProductCard";
import ProductGrid from "@/components/marketplace/storefront/ProductGrid";
import { productsData } from "@/lib/data/marketplace/productData";
import { type NextPage } from "next";

const Market: NextPage = () => {
  return (
    <div>
      <ProductGrid products={productsData} />
    </div>
  );
};

export default Market;
