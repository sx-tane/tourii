import Image from "next/image";
import {
  type PurchaseData,
  type Product,
  type ExperiencePurchase,
  type MerchandisePurchase,
} from "@/types/interfaceProduct";
import AddToCartButton from "./AddToCartButton";
import MerchandiseForm from "./Form/MerchandiseForm";
import ExperienceForm from "./Form/ExperienceForm";
import Markdown from "react-markdown";
import { useState } from "react";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [additionalInfo, setAdditionalInfo] = useState<PurchaseData>({
    purchaseType: product.category.productType, // This could be "Experience", "Merchandise", or undefined
    details: undefined,
    totalPurchase: product.price, // This is straightforward
  });

  const handleAdditionalInfoChange = (
    details: ExperiencePurchase | MerchandisePurchase,
  ) => {
    setAdditionalInfo({
      ...additionalInfo,
      details: details,
    });
  };
  return (
    <div className="pr-44">
      <div className="mb-5 w-fit rounded-3xl border-[1.5px] border-red bg-red px-3 py-1 text-xs font-bold uppercase tracking-widest text-warmGrey  ">
        {product.category.productType}
      </div>
      <div className="text-base font-bold uppercase tracking-widest text-red lg:text-4xl">
        {product.name}
      </div>
      <Image
        src="/image/about/double-line.svg"
        alt="divider"
        width={10000}
        height={1000}
        className="my-10 h-3 w-full object-cover"
      />
      <div>
        <div className="mb-4 space-y-2 ">
          <div className=" w-fit border-[1.5px] text-sm font-bold uppercase tracking-widest  text-red">
            Location: {product.category.bungoOnoArea}, Bungo-ono
          </div>
          <p className="text-base leading-normal tracking-widest text-red">
            <Markdown>{product.description}</Markdown>
          </p>
          {product.category.productType === "Merchandise" ? (
            <MerchandiseForm onDetailsChange={handleAdditionalInfoChange} />
          ) : product.category.productType === "Experience" ? (
            <ExperienceForm onDetailsChange={handleAdditionalInfoChange} />
          ) : null}
        </div>
      </div>
      <Image
        src="/image/about/double-line.svg"
        alt="divider"
        width={10000}
        height={1000}
        className="my-10 h-3 w-full object-cover"
      />
      <div className=" flex justify-between">
        <p className=" text-3xl font-bold uppercase tracking-wider text-red">{`${product.price} Yen`}</p>
        <AddToCartButton product={product} purchaseData={additionalInfo} />
      </div>
    </div>
  );
};

export default ProductDetails;
