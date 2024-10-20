"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const PropertyTypesSection: React.FC = () => {
  const router = useRouter(); // Initialize the router for navigation

  const propertyTypes = [
    { name: "Apartment", image: "/images/Apartment.png", category: "Apartments" },
    { name: "House", image: "/images/penthouse.png", category: "Houses" },
    { name: "Commercial", image: "/images/commercial1.png", category: "Lands" },
    { name: "Residential Land", image: "/images/Residential.png", category: "Lands" },
    { name: "Underconstruction", image: "/images/underconstruction.jpg", category: "Under-Constructions" },
  ];

  const handleClick = (category: string) => {
    // Navigate to the homepage with the selected category as a query parameter
    router.push(`/?category=${category}`);
  };

  return (
    <section className="py-16 bg-white-100 text-center">
      <h2 className="text-lg font-semibold text-gray-500 uppercase mb-2">Why We Are Leading</h2>
      <h1 className="text-3xl font-bold mb-4">One-Stop Real Estate Solution</h1>
      <p className="text-gray-700 mb-1 mx-4">
       At FlatPur, we lead the real estate market by offering personalized solutions, transparent pricing,
        and data-driven insights. Unlike others, we prioritize customer trust, 
      </p>
      <p className="text-gray-700 mb-10 mx-4"> using cutting-edge technology
         to provide accurate predictions and seamless transactions for buyers and sellers alike.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-[1cm] px-4">
        {propertyTypes.map((property, index) => (
          <button
            key={index}
            className="text-center p-4 border-none rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => handleClick(property.category)} // Navigate to the Categories section with the category
          >
            <div
              className="w-[6cm] h-[7cm] rounded-xl mx-auto mb-4 bg-cover bg-center"
              style={{ backgroundImage: `url(${property.image})` }}
            >
              {/* Image is set as background image */}
            </div>
            <h3 className="text-lg font-bold">{property.name}</h3>
            <p className="text-gray-500">PROPERTIES</p>
          </button>
        ))}
      </div>
      <div className="mt-8">
        <a
          href="#"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
          onClick={() => handleClick("")} // Redirect to Categories without a category to show all properties
        >
          View All Properties →
        </a>
      </div>
    </section>
  );
};

export default PropertyTypesSection;
