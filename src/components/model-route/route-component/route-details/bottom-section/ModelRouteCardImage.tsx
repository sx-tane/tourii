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
  // Determine the classes for image2 based on the presence of image3
  const image2Classes =
    routeDetailsSmallImage.image3 === "image3"
      ? "h-[20vh] w-full object-cover"
      : "mr-2 h-[20vh] w-1/2 object-cover";

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
            // Apply the dynamic classes
            className={image2Classes}
          />
        )}
        {routeDetailsSmallImage.image3 &&
          routeDetailsSmallImage.image3 !== "image3" && (
            <Image
              src={routeDetailsSmallImage.image3}
              alt={imageName}
              width={500}
              height={500}
              priority={true}
              className="h-[20vh] w-1/2 object-cover"
            />
          )}
      </div>
    </div>
  );
};

export default ModelRouteCardImage;
