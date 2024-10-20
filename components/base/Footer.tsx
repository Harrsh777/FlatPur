"use client";  // Add this at the top of your file

import React from "react";

const Footer: React.FC = () => {
  const handleLogoClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault(); // Prevent any default action
    window.location.reload(); // Reload the current page
  };

  const handleDeveloperClick = () => {
    window.open("https://www.linkedin.com/in/Harrshh", "_blank"); // Corrected LinkedIn URL
  };

  return (
    <>
      <footer className="bg-black text-white py-8 w-full">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xxxl:px-32">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center md:text-left">
            <div className="col-span-1">
              <img
                src="/images/Flatpur.png"
                width={800} // Adjusted width
                height={800} // Adjusted height
                alt="Logo"
                className="mx-auto mb-4 cursor-pointer"
                style={{ margin: -30 }}
                onClick={handleLogoClick} // Handle the click event to reload the page
              />
             
            </div>
            <div>
              <h3 className="font-bold mb-2">ADVERTISERS</h3>
              <ul>
                <li><a href="#" className="hover:underline">Advertise</a></li>
                <li><a href="/addhome" className="hover:underline">Add a Property</a></li>
                <li><a href="#" className="hover:underline">Digital Feeds Program</a></li>
                <li><a href="#" className="hover:underline">Customer Portal</a></li>
                <li><a href="#" className="hover:underline">Community Voice</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">THE MARKETPLACE</h3>
              <ul>
                <li><a href="#" className="hover:underline">Apartamentos.com</a></li>
                <li><a href="#" className="hover:underline">Apartments Canada</a></li>
                <li><a href="#" className="hover:underline">ApartmentFinder.com</a></li>
                <li><a href="#" className="hover:underline">ForRent</a></li>
                <li><a href="#" className="hover:underline">ApartmentHomeLiving.com</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">NEIGHBORHOODS</h3>
              <ul>
                <li><a href="#" className="hover:underline">Kidwai Nagar</a></li>
                <li><a href="#" className="hover:underline">Swaroop Nagar</a></li>
                <li><a href="#" className="hover:underline">Vijay Nagar</a></li>
                <li><a href="#" className="hover:underline">Panki</a></li>
                <li><a href="#" className="hover:underline">Mall Road</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">RENTAL MANAGER</h3>
              <ul>
                <li><a href="#" className="hover:underline">Rental Manager</a></li>
                <li><a href="#" className="hover:underline">List Your Property For Rent</a></li>
                <li><a href="#" className="hover:underline">Screen Applicants</a></li>
                <li><a href="#" className="hover:underline">Create Rental Leases</a></li>
                <li><a href="#" className="hover:underline">Collect Rent</a></li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#"><img src="/images/google.png" alt="Google" className="w-8 h-8 invert" /></a>
            <a href="#"><img src="/images/twitter.png" alt="Twitter" className="w-8 h-8 invert" /></a>
            <a href="https://www.instagram.com/flatpur/profilecard/?igsh=aHJrdzd0amV2Zjc3"><img src="/images/Instagram.png" alt="Instagram" className="w-8 h-8 invert" /></a>
            <a href="https://www.youtube.com/@Flatpur"><img src="/images/youtube.png" alt="YouTube" className="w-8 h-8 invert" /></a>
            <a href="#"><img src="/images/github.png" alt="GitHub" className="w-8 h-8 invert" /></a>
          </div>
          <div className="flex justify-center mt-10 mb-0">
            <button 
              onClick={handleDeveloperClick} 
              className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
            >
              Developed by Harsh Srivastava
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
