"use client"; // This makes the component a client component

import React, { useState } from "react";
import HomeCard from "@/components/common/HomeCard";

export default function HomeCardList({ homes }: { homes: any[] | null }) {
  const [visibleHomes, setVisibleHomes] = useState(15);

  const handleLoadMore = () => {
    setVisibleHomes((prevVisibleHomes) => prevVisibleHomes + 15);
  };

  return (
    <div>
      {/* General Homes Section */}
      {homes && homes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 px-10">
          {homes.slice(0, visibleHomes).map((item) => (
            <HomeCard home={item} key={item.id} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-4">
          <h1 className="text-brand font-bold text-2xl">No Properties found!</h1>
        </div>
      )}

      {/* Load More button */}
      {homes && visibleHomes < homes.length && (
        <div className="text-center mt-4">
          <button
            onClick={handleLoadMore}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
