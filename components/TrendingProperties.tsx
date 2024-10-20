"use client";
import { useState } from "react";
import HomeCard from "@/components/common/HomeCard"; // Adjust the import according to your project structure.

// Define the Home type
type Home = {
  id: string; // Ensure id is a string
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
  const visibleHomes = 4; // Show 4 properties at a time
  const totalHomes = trendingHomes.length; // Total homes available

  // Handle the next and previous button clicks
  const handleNext = () => {
    if (currentIndex < totalHomes - visibleHomes) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative my-10 px-10">
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
            transform: `translateX(-${(currentIndex * 100) / visibleHomes}%)`,
            width: `${(totalHomes * 25)}%`, // Set width based on total number of homes
          }}
        >
          {trendingHomes.map((home) => (
            <div key={home.id} className="w-1/4 mx-2"> {/* Width set to 25% for four homes in view */}
              <HomeCard home={home} />
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full"
        onClick={handleNext}
        disabled={currentIndex >= totalHomes - visibleHomes} // Disable if at the end
      >
        &#8250; {/* Right Arrow */}
      </button>
    </div>
  );
}
