"use client"
import React from "react";

const BenefitsSection: React.FC = () => {
  return (
    <section className="text-center py-16 bg-white">
      <h2 className="text-3xl font-bold mb-4">Benefits You Get</h2>
      <p className="text-xl mb-8">
        Guaranteed Visibility | Maximum Buyer Attention | Better Responses
      </p>
      <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-16">
        {/* First Benefit */}
        <div className="max-w-xs mx-auto md:mx-0">
          <div className="flex justify-center mb-4">
            {/* Placeholder for the Happy Clients Icon */}
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              {/* Insert the icon here */}
              <img src="\images\customer-service.png" alt="Happy Clients Icon" />
            </div>
          </div>
          <h3 className="text-xl font-semibold">50,000+ Happy Clients</h3>
          <p className="text-gray-600 mt-2">
            95% of our customers are 'happy with us' and over 80% 'recommend us'
          </p>
        </div>

        {/* Second Benefit */}
        <div className="max-w-xs mx-auto md:mx-0">
          <div className="flex justify-center mb-4">
            {/* Placeholder for the Services Delivered Icon */}
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              {/* Insert the icon here */}
              <img src="\images\delivered.png" alt="Services Delivered Icon" />
            </div>
          </div>
          <h3 className="text-xl font-semibold">75,000+ Services Delivered</h3>
          <p className="text-gray-600 mt-2">
            From advertising solutions to tenant verification to legal assistance, we do it all.
          </p>
        </div>

        {/* Third Benefit */}
        <div className="max-w-xs mx-auto md:mx-0">
          <div className="flex justify-center mb-4">
            {/* Placeholder for the Relationship Manager Icon */}
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              {/* Insert the icon here */}
              <img src="images\customer-relationship-management.png" alt="Relationship Manager Icon" />
            </div>
          </div>
          <h3 className="text-xl font-semibold">Dedicated Relationship Manager</h3>
          <p className="text-gray-600 mt-2">
            Most comprehensive selling/renting assistance to help you at every stage.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
