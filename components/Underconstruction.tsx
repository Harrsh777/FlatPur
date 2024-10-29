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

interface UnderConstructionPropertiesProps {
  underConstructionHomes: Home[]; // This should be populated with all under-construction homes
}

export default function UnderConstructionProperties({ underConstructionHomes }: UnderConstructionPropertiesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleHomes, setVisibleHomes] = useState(4); // Default to 4 properties for larger screens
  const totalHomes = underConstructionHomes.length; // Total homes available

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
    if (currentIndex < totalHomes - 1) {
      setCurrentIndex((prev) => Math.min(prev + 1, totalHomes - 1)); // Move to the next property (one at a time)
    }
  };

  // Handle the previous button click
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0)); // Move to the previous property (one at a time)
    }
  };

  return (
    <div className="relative my-10 px-4 md:px-10">
      <h2 className="text-2xl font-bold mb-6">Under Construction Properties</h2>

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
            transform: `translateX(-${(currentIndex * 25) / visibleHomes}%)`, // Adjust for one property at a time
            width: `${(totalHomes * (100 / visibleHomes))}%`, // Set width based on visible homes
          }}
        >
          {underConstructionHomes.map((home) => (
            <div key={home.id} className={`w-${100 / visibleHomes}% mx-2`}>
              <HomeCard home={home} />
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full"
        onClick={handleNext}
        disabled={currentIndex >= totalHomes - 1} // Disable if at the end
      >
        &#8250; {/* Right Arrow */}
      </button>
    </div>
  );
}
