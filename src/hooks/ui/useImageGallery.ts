import { useState } from "react";

interface UseImageGalleryOptions {
  images: Array<{ url: string }>;
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

/**
 * Custom hook for managing image gallery state
 * Handles current image selection and navigation
 */
export const useImageGallery = (options: UseImageGalleryOptions) => {
  const { images, autoPlay = false, autoPlayDelay = 3000 } = options;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNext = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentImageIndex(index);
    }
  };

  const currentImage = images[currentImageIndex];
  const hasMultipleImages = images.length > 1;

  return {
    currentImageIndex,
    currentImage,
    hasMultipleImages,
    goToNext,
    goToPrevious,
    goToImage,
    totalImages: images.length,
  };
};