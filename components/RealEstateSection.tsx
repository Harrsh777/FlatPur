'use client'
import React, { useState, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import ContactUsModal from './ContactUsModal'; // Import the ContactUsModal component

export default function RealEstateSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Explicitly define the type for the refs
  const buySectionRef = useRef<HTMLDivElement>(null);
  const rentSectionRef = useRef<HTMLDivElement>(null);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-100 py-16 px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Side Text Section */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h3 className="text-red-500 text-xl font-semibold mb-4">WHAT DRIVES US</h3>
          <h2 className="text-4xl font-bold mb-6">
            Discover What Sets Our Real Estate Expertise Apart
          </h2>
          <p className="text-gray-700 mb-6">
            At RealEstate, our unwavering commitment lies in crafting a personalized
            real estate strategy that addresses your needs. From extensive market knowledge,
            risk mitigation, and through every phase of your property endeavor, our experts 
            ensure nothing short of unparalleled excellence, helping you reach new success in your efforts.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 text-lg mr-2" />
              <p>Transparent Partnership</p>
            </div>
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 text-lg mr-2" />
              <p>Proven Expertise</p>
            </div>
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 text-lg mr-2" />
              <p>Customized Solutions</p>
            </div>
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 text-lg mr-2" />
              <p>Local Area Knowledge</p>
            </div>
          </div>
          <button 
            onClick={openContactModal} 
            className="text-red-500 font-bold"
          >
            Contact Us →
          </button>
        </div>

        {/* Right Side Cards Section */}
        <div className="md:w-1/2">
          <div className="grid gap-6">
            {/* Card 1 */}
            <div 
              className="bg-white p-6 rounded-lg shadow-md flex items-start"
              onClick={() => scrollToSection(buySectionRef)}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-lg">
                  <img src="images/buy-a-house.png" alt="Buy a New Home" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Buy A New Home</h3>
                <p className="text-gray-600 mb-2">
                  Explore diverse properties and expert guidance for a seamless buying experience.
                </p>
                <a href="#" className="text-red-500 font-bold">Learn More →</a>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              className="bg-white p-6 rounded-lg shadow-md flex items-start"
              onClick={() => scrollToSection(rentSectionRef)}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-lg">
                  <img src="images/rent.png" alt="Rent A Home" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Rent A Home</h3>
                <p className="text-gray-600 mb-2">
                  Experience a wide variety of listings tailored precisely to your rental preferences.
                </p>
                <a href="#" className="text-red-500 font-bold">Learn More →</a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-lg">
                  <img src="images/sale.png" alt="Sell A Home" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Sell A Home</h3>
                <p className="text-gray-600 mb-2">
                  Maximize your property's value before it hits the market.
                </p>
                <a href="/addhome" className="text-red-500 font-bold">Learn More →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Modal */}
      <ContactUsModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </div>
  );
}
