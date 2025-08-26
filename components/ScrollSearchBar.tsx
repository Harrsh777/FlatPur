'use client';
import React, { useState, useEffect } from "react";
import { FaHeadset, FaArrowUp } from 'react-icons/fa'; // Add FaArrowUp for the upward arrow
import { useRouter } from "next/navigation";
import NavMenu from "./base/NavMenu";

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
        className={`fixed inset-x-0 transition-transform duration-500 ease-in-out ${isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
        style={{ height: '70px' }}
      >
        <div className="h-full w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 flex items-center gap-2 sm:gap-3">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex-shrink-0 focus:outline-none">
            <img src="/images/Flatpur.png" alt="Logo" className="h-10 sm:h-12 object-contain" />
          </button>

          {/* Search */}
          <div className="flex-grow flex items-center bg-white border border-gray-200 rounded-full px-2 sm:px-3 py-1.5 sm:py-2 shadow-sm">
            <input
              type="text"
              placeholder="Search Locality / Project / Society / Landmark"
              className="flex-grow outline-none text-sm sm:text-base text-gray-700 px-2"
            />
            <button className="h-9 w-9 rounded-full bg-green-600 text-white hidden sm:inline-flex items-center justify-center hover:bg-green-700" aria-label="Search" />
          </div>

          {/* CTA */}
          <button
            className="hidden md:inline-flex bg-green-600 text-white px-3 py-2 rounded-full text-sm hover:bg-green-700"
            onClick={() => { window.location.href = "/addhome"; }}
          >
            Post Property <span className="ml-1 bg-white text-green-600 px-2 py-0.5 rounded-full">FREE</span>
          </button>

          {/* Support */}
          <div className="relative hidden sm:block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="p-2 rounded-full bg-gray-100">
              <FaHeadset size={18} className="text-gray-600" />
            </button>
            {isHovered && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
                <h3 className="font-semibold text-base mb-1">CONTACT US</h3>
                <p className="text-xs text-gray-600">Toll Free | 9:30 AM to 6:30 PM</p>
                <p className="text-base font-bold">+91 8004959778</p>
                <p className="text-xs text-gray-600 mt-2">For International Users</p>
                <p className="text-base font-bold">+91 8004959778</p>
                <button className="mt-3 bg-blue-600 text-white w-full py-2 rounded-lg text-sm">Request a Call Back</button>
                <p className="mt-2 text-xs">To check all the FAQ <a href="#" className="text-blue-600">click here</a></p>
              </div>
            )}
          </div>

          {/* Menu */}
          <div className="hidden sm:block">
            <NavMenu session={session} />
          </div>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="ml-auto sm:ml-0 p-2 bg-green-500 rounded-full shadow-md hover:bg-green-600 transition duration-300"
            aria-label="Scroll to top"
          >
            <FaArrowUp size={14} className="text-black" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ScrollSearchBar;
