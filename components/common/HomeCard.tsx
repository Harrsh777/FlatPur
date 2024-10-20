"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";

interface HomeCardProps {
  home: {
    id: string; // Changed to string
    title: string;
    city: string;
    country: string;
    price: string | number;
    image?: string; // Optional fallback image
    images?: string[]; // Array of images
  };
  showDetails?: boolean; // Optional prop to toggle details
  buttonHeight?: string; // Optional prop to set the height of the buttons
}

export default function HomeCard({
  home,
  showDetails = true,
  buttonHeight = "50px", // Default button height
}: HomeCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use images array or fallback to a single image
  const images = home.images && home.images.length > 0 ? home.images : [home.image || ""];

  // Move to the next image
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Move to the previous image
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Update currentImageIndex if images change
  useEffect(() => {
    setCurrentImageIndex(0); // Reset to the first image when the images array changes
  }, [images]);

  return (
    <Link href={`/home/${home.id}`}>
      <div className="relative text-start">
        <Image
          src={getImageUrl(images[currentImageIndex])} // Show the current image
          width={100}
          height={100}
          alt={home.title}
          className="w-full h-[300px] rounded-xl object-cover object-center"
          unoptimized
        />

        {/* Next Image Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent link click on arrow button click
              handleNextImage();
            }}
            className="absolute top-1/3 right-0 transform -translate-y-1/2 bg-white/30 backdrop-blur-md p-2 rounded-full transition-colors duration-300"
            style={{ height: buttonHeight }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.6)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)")}
          >
            &gt; {/* Next Image Arrow */}
          </button>
        )}

        {/* Previous Image Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent link click on arrow button click
              handlePrevImage();
            }}
            className="absolute top-1/3  left-0 transform -translate-y-1/2 bg-white/30 backdrop-blur-md p-2 rounded-full transition-colors duration-300"
            style={{ height: buttonHeight }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.6)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)")}
          >
            &lt; {/* Previous Image Arrow */}
          </button>
        )}

        {showDetails && (
          <div className="mt-2">
            <p className="font-semibold">
              {home.city}, {home.country}
            </p>
            <p>{home.title}</p>
            <p>{home.price}</p>
          </div>
        )}
      </div>
    </Link>
  );
}
