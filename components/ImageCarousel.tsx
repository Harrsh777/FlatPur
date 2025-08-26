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
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] overflow-hidden my-5">
        <Image
          src={currentImageUrl}
          alt="home_img"
          fill
          sizes="100vw"
          className="object-contain rounded-lg"
          unoptimized
        />
      </div>
      {imageUrls.length > 1 && (
        <>
          <button
            onClick={handlePreviousImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm rounded-full p-2"
          >
            &lt; {/* Left Arrow */}
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm rounded-full p-2"
          >
            &gt; {/* Right Arrow */}
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
