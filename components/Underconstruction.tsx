"use client";
import { useState } from "react";
import HomeCard from "@/components/common/HomeCard"; // Adjust the import according to your project structure.

// Define the Home type
type Home = {
  id: string; // Keep as string
  images: string[]; // Change this from 'string' to 'string[]'
  title: string;
  country: string;
  city: string;
  price: string | number; // Allow both string and number
};

interface UnderConstructionProjectsProps {
  underConstructionHomes: Home[]; // This should be populated with all under-construction homes
}

export default function UnderConstructionProjects({ underConstructionHomes }: UnderConstructionProjectsProps) {
  // Set the initial state for the visible properties
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleHomes = 4; // Number of visible properties at a time
  const totalHomes = underConstructionHomes.length; // Total homes available

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
      <h2 className="text-2xl font-bold mb-6">Under Construction Projects</h2>

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
          {underConstructionHomes.map((home) => (
            <div key={home.id} className="w-1/4 mx-2">
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
