"use client";
import { useState, useEffect } from "react";
import HomeCard from "@/components/common/HomeCard"; // Adjust the import according to your project structure.

// Define the Home type
type Home = {
  id: string;
  images: string[]; // Updated to string[] to match the expected type
  title: string;
  country: string;
  city: string;
  price: string; // or string | number if that's the case
};

interface TrendingPropertiesProps {
  trendingHomes: Home[]; // This should be populated with all trending homes
}

export default function TrendingProperties({ trendingHomes }: TrendingPropertiesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleHomes, setVisibleHomes] = useState(4); // Default to 4 properties for larger screens
  const totalHomes = trendingHomes.length; // Total homes available

  // Update the number of visible homes based on window size
  useEffect(() => {
    const updateVisibleHomes = () => {
      setVisibleHomes(window.innerWidth < 768 ? 1 : 4); // Show 1 property on mobile, 4 on larger screens
    };

    updateVisibleHomes(); // Initial check on mount
    window.addEventListener("resize", updateVisibleHomes); // Update on resize

    return () => {
      window.removeEventListener("resize", updateVisibleHomes); // Clean up on unmount
    };
  }, []);

  // Handle the next button click
  const handleNext = () => {
    if (window.innerWidth < 768) { // Mobile view
      if (currentIndex < totalHomes - 1) {
        setCurrentIndex((prev) => prev + 1); // Move to the next property (one at a time)
      }
    } else { // Desktop view
      if (currentIndex < totalHomes - visibleHomes) {
        setCurrentIndex((prev) => prev + 1); // Move to the next set of properties
      }
    }
  };

  // Handle the previous button click
  const handlePrev = () => {
    if (window.innerWidth < 768) { // Mobile view
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1); // Move to the previous property (one at a time)
      }
    } else { // Desktop view
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1); // Move to the previous set of properties
      }
    }
  };

  return (
    <div className="relative my-10 px-4 md:px-10">
      <h2 className="text-2xl font-bold mb-6">Recommended Properties</h2>

      {/* Left Arrow Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full"
        onClick={handlePrev}
        disabled={currentIndex === 0} // Disable if at the start
      >
        &#8249; {/* Left Arrow */}
      </button>

      {/* Slider Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${(currentIndex * (100 / (visibleHomes === 1 ? 1 : 4)))}%)`, // Adjust transform based on screen size
            width: `${(totalHomes * (100 / visibleHomes))}%`, // Set width based on visible homes
          }}
        >
          {trendingHomes.map((home) => (
            <div key={home.id} className={`w-${100 / visibleHomes}% mx-2`}> {/* Adjust width dynamically */}
              <HomeCard home={home} />
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full"
        onClick={handleNext}
        disabled={currentIndex >= (visibleHomes === 1 ? totalHomes - 1 : totalHomes - visibleHomes)} // Disable if at the end
      >
        &#8250; {/* Right Arrow */}
      </button>
    </div>
  );
}
