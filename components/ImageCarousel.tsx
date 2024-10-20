"use client"; // Mark this as a Client Component

import React, { useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils"; // Ensure you import getImageUrl

interface ImageCarouselProps {
  images: string[]; // Ensure this is an array of strings
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Convert images to URLs using the getImageUrl utility
  const imageUrls = images.map((image) => getImageUrl(image));

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  const currentImageUrl = imageUrls.length > 0 ? imageUrls[currentImageIndex] : '/default-image.jpg';

  return (
    <div className="relative">
      <div className="image-container w-full h-[500px] overflow-hidden flex items-center justify-center my-5">
        <Image
          src={currentImageUrl}
          alt="home_img"
          layout="fill" // Use layout fill for responsive image
          objectFit="contain" // Contain the image
          className="rounded-lg" // Keep rounded corners
          unoptimized
        />
      </div>
      {imageUrls.length > 1 && (
        <>
          <button
            onClick={handlePreviousImage}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2"
          >
            &lt; {/* Left Arrow */}
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2"
          >
            &gt; {/* Right Arrow */}
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
