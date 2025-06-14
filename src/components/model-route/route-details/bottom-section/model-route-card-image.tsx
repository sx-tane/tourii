import Image from "next/image";

interface ModelRouteCardImageProps {
	routeDetailsSmallImage: {
		image1: string;
		image2: string;
		image3?: string;
	};
	imageName: string;
}

const ModelRouteCardImage: React.FC<ModelRouteCardImageProps> = ({
	routeDetailsSmallImage,
	imageName,
}) => {
	const hasThirdImage =
		routeDetailsSmallImage.image3 &&
		routeDetailsSmallImage.image3 !== "image3" &&
		routeDetailsSmallImage.image3.trim() !== "";

	return (
		<div className="w-1/2">
			<div className="flex flex-col space-y-2">
				{routeDetailsSmallImage.image1 &&
					routeDetailsSmallImage.image1.trim() !== "" && (
						<Image
							src={routeDetailsSmallImage.image1}
							alt={imageName}
							width={500}
							height={500}
							priority
							className="h-[40vh] w-full object-cover"
						/>
					)}
				<div
					className={`grid ${hasThirdImage ? "grid-cols-2 gap-2" : "grid-cols-1"}`}
				>
					{routeDetailsSmallImage.image2 &&
						routeDetailsSmallImage.image2.trim() !== "" && (
							<Image
								src={routeDetailsSmallImage.image2}
								alt={imageName}
								width={500}
								height={500}
								priority
								className="h-[20vh] w-full object-cover"
							/>
						)}
					{hasThirdImage && routeDetailsSmallImage.image3 && (
						<Image
							src={routeDetailsSmallImage.image3}
							alt={imageName}
							width={500}
							height={500}
							priority
							className="h-[20vh] w-full object-cover"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default ModelRouteCardImage;
