import Image from "next/image";

interface ModelRouteCardImageProps {
	routeDetailsSmallImage: {
		image1: string | undefined;
		image2: string | undefined;
		image3: string | undefined;
	};
	imageName: string;
}

const ModelRouteCardImage: React.FC<ModelRouteCardImageProps> = ({
	routeDetailsSmallImage,
	imageName,
}) => {
	const hasThirdImage =
		routeDetailsSmallImage.image3 && routeDetailsSmallImage.image3 !== "image3";

	return (
		<div className="w-1/2">
			<div className="flex flex-col space-y-2">
				{routeDetailsSmallImage.image1 && (
					<Image
						src={routeDetailsSmallImage.image1}
						alt={imageName}
						width={500}
						height={500}
						priority={true}
						className="h-[40vh] w-full object-cover"
					/>
				)}
				<div
					className={`grid ${hasThirdImage ? "grid-cols-2 gap-2" : "grid-cols-1"}`}
				>
					{routeDetailsSmallImage.image2 && (
						<Image
							src={routeDetailsSmallImage.image2}
							alt={imageName}
							width={500}
							height={500}
							priority={true}
							className="h-[20vh] w-full object-cover"
						/>
					)}
					{hasThirdImage && (
						<Image
							src={routeDetailsSmallImage.image3 ?? ""}
							alt={imageName}
							width={500}
							height={500}
							priority={true}
							className="h-[20vh] w-full object-cover"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default ModelRouteCardImage;
