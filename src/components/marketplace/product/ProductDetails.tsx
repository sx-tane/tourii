import Image from "next/image";
import { type Product } from "@/types/interface";
import AddToCartButton from "./AddToCartButton";
import MerchandiseForm from "./Form/MerchandiseForm";
import ExperienceForm from "./Form/ExperienceForm";
import Link from "next/link";
import { ArrowLeftCircleIcon } from "lucide-react";
import Markdown from "react-markdown";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="pr-44">
      <div className="mb-5 w-fit border-[1.5px] border-red bg-red p-1 text-xs font-bold uppercase tracking-widest text-warmGrey  ">
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
            <MerchandiseForm />
          ) : product.category.productType === "Experience" ? (
            <ExperienceForm />
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
        <p className=" text-3xl font-bold uppercase tracking-normal text-red">{`${product.price} Yen`}</p>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductDetails;
