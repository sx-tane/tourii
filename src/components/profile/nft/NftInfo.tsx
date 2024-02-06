import { type NFT } from "@/types/interfaceProfile";
import React from "react";
import Image from "next/image";

interface NftInfoProps {
  selectedNFT: NFT | undefined;
}

const NFTInfo: React.FC<NftInfoProps> = ({ selectedNFT }) => {
  if (!selectedNFT) return null;

  const properties = [
    { label: "Race", value: selectedNFT?.nftDescription?.race },
    { label: "Hair Color", value: selectedNFT?.nftDescription?.hairColor },
    { label: "Eyes", value: selectedNFT?.nftDescription?.eyes },
    { label: "Mouth", value: selectedNFT?.nftDescription?.mouth },
    { label: "Accessory", value: selectedNFT?.nftDescription?.accessory },
    { label: "Clothing", value: selectedNFT?.nftDescription?.clothing },
    { label: "Weapon", value: selectedNFT?.nftDescription?.weapon },
    { label: "Background", value: selectedNFT?.nftDescription?.background },
  ];

  const bottomProperties = [
    { label: "Held Since", value: selectedNFT?.nftHeldDate },
    { label: "Address", value: selectedNFT?.walletAddress },
  ];

  const truncateAddress = (address: string, length = 20) => {
    if (address.length <= length) {
      return address;
    }
    const start = address.slice(0, length / 2);
    const end = address.slice(-length / 2);
    return `${start}........${end}`;
  };

  return (
    <div className="flex h-2/3">
      <div className="h-full w-1/2">
        <div className="text-xs font-bold uppercase tracking-wider text-red">
          NFT & Collectibles
        </div>
        <div className=" mt-10 text-sm font-semibold uppercase tracking-widest text-red">
          tourii
        </div>
        <div className="animate-fadeIn pt-2 text-7xl font-normal uppercase tracking-tight text-red">
          {selectedNFT?.nftId ?? ""}
        </div>
        <div className="pt-2 font-semibold tracking-tight text-red">
          <div className="flex h-[70px] w-[70px] flex-col items-center justify-center rounded-full border border-red">
            <div className="text-center text-xs">Rarity</div>
            <div className="text-center text-lg">
              {selectedNFT?.nftRarity ?? ""}
            </div>
          </div>
        </div>
        {/*NFT INFO*/}
        <div className="mt-8 space-y-2 pr-40">
          {properties.map((property) => (
            <div className="flex items-center justify-center text-sm font-medium tracking-wider text-red">
              <span className="mr-4 whitespace-nowrap">{property.label}</span>
              <div className="w-full border-t border-red" />
              <span className="ml-4 w-auto whitespace-nowrap">
                {property.value}
              </span>
            </div>
          ))}
        </div>
        {/*Bottom NFT INFO*/}
        <div className="mt-12 space-y-2 pr-40">
          {bottomProperties.map((property) => (
            <div className="grid grid-cols-2 items-center text-xs font-normal italic tracking-wider text-red">
              <span className="whitespace-nowrap">{property.label}</span>
              <span
                className={`justify-self-end whitespace-nowrap ${property.label === "Address" ? "font-semibold not-italic  underline" : ""}`}
              >
                {property.label === "Address"
                  ? truncateAddress(property.value ?? "")
                  : property.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 h-full w-1/2">
        <Image
          src={selectedNFT?.nftImage ?? ""}
          alt={selectedNFT?.nftId ?? ""}
          width={500}
          height={500}
          priority={true}
          className="h-full w-auto rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default NFTInfo;
