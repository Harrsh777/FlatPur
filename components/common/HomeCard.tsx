"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
import { 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaHeart, 
  FaShare, 
  FaChevronLeft, 
  FaChevronRight,
  FaMapMarkerAlt
} from "react-icons/fa";

interface HomeCardProps {
  home: {
    id: string;
    title: string;
    city: string;
    country: string;
    price: string | number;
    image?: string;
    images?: string[];
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    isFavorite?: boolean;
  };
  showDetails?: boolean;
  buttonHeight?: string;
}

export default function HomeCard({
  home,
  showDetails = true,
  buttonHeight = "44px",
}: HomeCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(home.isFavorite || false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Use images array or fallback to a single image
  const images = home.images && home.images.length > 0 ? home.images : [home.image || "/placeholder-home.jpg"];

  // Move to the next image
  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Move to the previous image
  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // Here you would typically make an API call to update favorite status
  };

  const toggleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareOptions(!showShareOptions);
  };

  // Update currentImageIndex if images change
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [images]);

  // Auto-advance images when hovered (if multiple images)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  // Format price with commas and currency symbol
  const formatPrice = (price: string | number) => {
    if (typeof price === 'number') {
      return `$${price.toLocaleString()}`;
    }
    return price; // Assuming it's already formatted if it's a string
  };

  return (
    <Link href={`/home/${home.id}`}>
      <div 
        className="relative text-start group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-64 xl:h-72 overflow-hidden">
          <Image
            src={getImageUrl(images[currentImageIndex])}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            alt={home.title}
            className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
          
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
          
          {/* Favorite button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-3 left-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
          >
            <FaHeart className={isFavorite ? "text-red-500" : "text-gray-600"} />
          </button>
          
          {/* Share button */}
          <div className="absolute top-3 left-12">
            <button
              onClick={toggleShare}
              className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
            >
              <FaShare className="text-gray-600" />
            </button>
            
            {showShareOptions && (
              <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg p-2 w-40 z-10">
                <div className="text-sm font-medium text-gray-700 p-2 hover:bg-gray-100 rounded-md">Copy link</div>
                <div className="text-sm font-medium text-gray-700 p-2 hover:bg-gray-100 rounded-md">Share on Facebook</div>
                <div className="text-sm font-medium text-gray-700 p-2 hover:bg-gray-100 rounded-md">Share on WhatsApp</div>
              </div>
            )}
          </div>

          {/* Next Image Button */}
          {images.length > 1 && (
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
              style={{ height: buttonHeight, width: buttonHeight }}
            >
              <FaChevronRight className="text-gray-700" />
            </button>
          )}

          {/* Previous Image Button */}
          {images.length > 1 && (
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
              style={{ height: buttonHeight, width: buttonHeight }}
            >
              <FaChevronLeft className="text-gray-700" />
            </button>
          )}
        </div>

        {showDetails && (
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{home.title}</h3>
              <p className="text-lg font-bold text-green-600 whitespace-nowrap ml-2">
                {formatPrice(home.price)}
              </p>
            </div>
            
            <div className="flex items-center text-gray-600 mb-3">
              <FaMapMarkerAlt className="text-gray-400 mr-1" />
              <span className="text-sm">{home.city}, {home.country}</span>
            </div>
            
            {/* Property features */}
            {(home.bedrooms || home.bathrooms || home.area) && (
              <div className="flex justify-between border-t border-gray-100 pt-3 mt-3">
                {home.bedrooms && (
                  <div className="flex items-center text-gray-600">
                    <FaBed className="mr-1 text-gray-500" />
                    <span className="text-sm">{home.bedrooms} {home.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                  </div>
                )}
                
                {home.bathrooms && (
                  <div className="flex items-center text-gray-600">
                    <FaBath className="mr-1 text-gray-500" />
                    <span className="text-sm">{home.bathrooms} {home.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                  </div>
                )}
                
                {home.area && (
                  <div className="flex items-center text-gray-600">
                    <FaRulerCombined className="mr-1 text-gray-500" />
                    <span className="text-sm">{home.area} sq ft</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}