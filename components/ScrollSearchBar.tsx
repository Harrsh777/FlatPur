'use client';
import React, { useState, useEffect } from "react";
import { FaHeadset, FaArrowUp } from 'react-icons/fa'; // Add FaArrowUp for the upward arrow
import { useRouter } from "next/navigation";

const ScrollSearchBar = ({ session }: { session: object | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  // Scroll handler for the search bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show the search bar only if scrolled down more than 100 pixels
      if (currentScrollY > 100) {
        if (currentScrollY > prevScrollY) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      } else {
        setIsScrolled(false);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  const handleLogoClick = () => {
    router.refresh();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style jsx>{`
        .fixed {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50; /* Set a higher z-index */
          background-color: white; /* Background color to overlay content */
        }
      `}</style>
      <div
        className={`fixed transition-all duration-500 ease-in-out ${isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
        style={{ height: '85px' }} // Set the height of the scroll search bar
      >
        <div className="flex items-center h-full relative"> {/* Ensure full height */}
          <button onClick={handleLogoClick} className="focus:outline-none">
            <div className="h-full flex items-center" style={{ marginLeft: '-10px', marginTop:"35px" }}> {/* Left margin for the logo */}
              <img
                src="/images/Flatpur.png"
                alt="Logo"
                className="h-64" // Set height for the logo
                style={{ objectFit: 'contain' }} // Optional: Maintain aspect ratio and prevent distortion
              />
            </div>
          </button>

          {/* Search Bar */}
          <div className="flex-grow flex items-center bg-white border border-gray-300 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Enter Locality / Project / Society / Landmark"
              className="flex-grow outline-none text-gray-700"
            />
            <div className="flex items-center space-x-2 ml-4">
              <button className="p-2 rounded-full bg-blue-100">
                {/* Search Icon */}
              </button>
              <button className="p-2 rounded-full bg-blue-100">
                {/* Another Icon */}
              </button>
            </div>
            <button className="ml-4 p-2 rounded-full bg-blue-600 text-white">
              {/* Another Icon */}
            </button>
          </div>

          {/* Post Property Button */}
          <div className="ml-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-full"
              onClick={() => {
                window.location.href = "/addhome";
              }}
            >
              Want to Post your Property? <span className="ml-1 bg-white text-green-500 px-2 py-1 rounded-full">FREE</span>
            </button>
          </div>

          {/* Clickable Round Icon Buttons */}
          <div className="ml-4 flex items-center space-x-4">
           
            {/* User Profile and Headphone Icon */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full bg-gray-100 ml-1 mr-5">
                  <FaHeadset size={24} className="text-gray-500" />
                </button>
              </div>

              {/* Dropdown menu */}
              {isHovered && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 transition-transform transform duration-300 ease-in-out"
                  style={{ transform: 'translateY(0)', opacity: 1 }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <h3 className="font-semibold text-lg mb-2">CONTACT US</h3>
                  <p className="text-sm text-gray-600">Toll Free | 9:30 AM to 6:30 PM</p>
                  <p className="text-lg font-bold">+91 8004959778</p>
                  <p className="text-sm text-gray-600 mt-2">For International Users</p>
                  <p className="text-lg font-bold">+91 8004959778</p>
                  <button className="mt-4 bg-blue-600 text-white w-full py-2 rounded-lg">
                    Request a Call Back
                  </button>
                  <p className="mt-2 text-sm">
                    To check all the FAQ <a href="#" className="text-blue-500">click here</a>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Upward Arrow Button */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2"> {/* Positioned at bottom center */}
            <button
              onClick={scrollToTop}
              className="p-1 bg-green-500 rounded-full shadow-md hover:bg-green-600 transition duration-300"
              aria-label="Scroll to top"
            >
              <FaArrowUp size={16} className="text-black" /> {/* Smaller arrow with black color */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollSearchBar;
