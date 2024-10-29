"use client"; // This ensures it's treated as a client component

import React, { useEffect, useState } from 'react';

const InteractiveBanner: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Update the state based on the window width
      setIsMobile(window.innerWidth < 640);
    };

    // Set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        backgroundImage: 'url("/images/Banner4.png")',
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: isMobile ? "40vh" : "50vh", // Optional: Adjust height for mobile
        margin: 0, // Set margin to 0
        padding: 0, // Set padding to 0
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.5s ease-in-out",
        overflow: "hidden",
        width: "100%",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.transform = "scale(1)";
      }}
    >
      {/* Any content you want to display on the banner */}
    </div>
  );
};

export default InteractiveBanner;
