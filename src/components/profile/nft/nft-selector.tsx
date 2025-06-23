import type { NFTSelectionProps } from "@/types/profile-type";
import Image from "next/image";

const NFTSelection: React.FC<NFTSelectionProps> = ({
	nftList,
	selectedNFT,
	handleNFTChange,
}) => {
	return (
		<div className="mt-10 flex h-1/3 items-center">
			{/* Left Arrow */}
			<Image
				src="/image/about/left.svg"
				alt="left"
				width={20}
				height={20}
				priority
			/>
			<div className="mx-12 grid w-full grid-cols-6 items-center justify-items-center gap-12">
				{nftList.map((nft) =>
					nft ? (
						<Image
							key={nft.nftId}
							src={nft.nftImage}
							alt={nft.nftId}
							width={100}
							height={100}
							onClick={() => handleNFTChange(nft.nftId)}
							priority
							className={`h-auto w-full cursor-pointer rounded-xl transition-all duration-300 hover:scale-110 ${selectedNFT?.nftId === nft.nftId ? " border-4 border-white transition-all" : ""}`}
						/>
					) : (
						<div
							key={`nft-${Math.random()}`}
							className="h-full w-full rounded-xl bg-warmGrey3 shadow-inner"
						/>
					),
				)}
			</div>
			{/* Right Arrow */}
			<Image
				src="/image/about/right.svg"
				alt="left"
				width={20}
				height={20}
				priority
			/>
		</div>
	);
};

export default NFTSelection;
