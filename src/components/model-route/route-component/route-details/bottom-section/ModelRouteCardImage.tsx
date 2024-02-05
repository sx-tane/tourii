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
  // Dynamic class generation based on the presence of image3
  const hasThirdImage =
    routeDetailsSmallImage.image3 && routeDetailsSmallImage.image3 !== "image3";
  const image2Classes = hasThirdImage
    ? "mr-2 h-[20vh] w-[49%] object-cover"
    : "h-[20vh] w-full object-cover";
  const image3Classes = hasThirdImage ? "h-[20vh] w-[49%] object-cover" : "";

  return (
    <div className="space-y-2">
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
      <div className="flex">
        {routeDetailsSmallImage.image2 && (
          <Image
            src={routeDetailsSmallImage.image2}
            alt={imageName}
            width={500}
            height={500}
            priority={true}
            className={image2Classes}
          />
        )}
        {hasThirdImage && (
          <Image
            src={routeDetailsSmallImage.image3}
            alt={imageName}
            width={500}
            height={500}
            priority={true}
            className={image3Classes}
          />
        )}
      </div>
    </div>
  );
};

export default ModelRouteCardImage;
