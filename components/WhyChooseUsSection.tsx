import React from "react";

export default function WhyChooseUsSection() {
  return (
    <div className="bg-gray-100 py-16 px-10">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title Section */}
        <h3 className="text-red-500 text-xl font-semibold mb-4">OUR BENEFIT</h3>
        <h2 className="text-4xl font-bold mb-10">Why Choose FlatPur</h2>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            {/* Placeholder for Icon */}
            <div className="w-16 h-16 bg-gray-200 mb-6 rounded-full flex items-center justify-center">
              {/* Replace this with actual icon */}
              <img src="images\experience.png" alt="Proven Expertise" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Proven Expertise</h3>
            <p className="text-gray-600">
              Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            {/* Placeholder for Icon */}
            <div className="w-16 h-16 bg-gray-200 mb-6 rounded-full flex items-center justify-center">
              {/* Replace this with actual icon */}
              <img src="images\stationery-tool.png" alt="Customized Solutions" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Customized Solutions</h3>
            <p className="text-gray-600">
              We pride ourselves on crafting personalized strategies to match your unique goals, ensuring a seamless real estate journey.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            {/* Placeholder for Icon */}
            <div className="w-16 h-16 bg-gray-200 mb-6 rounded-full flex items-center justify-center">
              {/* Replace this with actual icon */}
              <img src="images\research.png" alt="Transparent Partnerships" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Transparent Partnerships</h3>
            <p className="text-gray-600">
              Transparency is key in our client relationships. We prioritize clear communication and ethical practices, fostering trust and reliability throughout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
