"use client";
import { categories } from "@/config/categories";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FullSearchBar from "@/components/SearchBar"; // Import the search bar component

export default function Categories() {
  const router = useRouter();
  const params = useSearchParams();
  const [cat, setCat] = useState<string>("");

  useEffect(() => {
    const categoryFromUrl = params?.get("category");
    if (categoryFromUrl) {
      setCat(categoryFromUrl);
    }
  }, [params]);

  const handleClick = (category: string) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("category", category);

    router.replace(currentUrl.toString());
    setCat(category);
  };

  return (
    <>
      {/* Pass the handleClick function to the FullSearchBar */}
      <FullSearchBar handleClick={handleClick} selectedCategory={cat} />

      <div className="flex justify-center items-center space-x-8 px-10 my-3 overflow-x-auto whitespace-nowrap scroll-smooth pb-4">
        {categories.map((item) => (
          <div
            className="flex justify-center flex-col items-center cursor-pointer"
            key={item.name}
            onClick={() => handleClick(item.name)}
          >
            <Image src={item.icon} width={25} height={25} alt={item.name} />
            <span
              className={`${
                cat === item.name ? "inline-block border-b-4 border-brand" : ""
              } text-sm`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
