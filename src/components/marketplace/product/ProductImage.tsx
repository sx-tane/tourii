import Image from "next/image";
import React from "react";

interface ProductImageProps {
  image: string;
  name: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ image, name }) => {
  return (
    <div className="rounded-full border-[1.5px] border-mustard p-2">
      <Image
        src={image ?? ""}
        alt={name}
        layout="responsive"
        width={3000}
        height={3000}
        quality={100}
        className="z-20 aspect-square rounded-full object-cover"
        priority={true}
      />
    </div>
  );
};

export default ProductImage;
