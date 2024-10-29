"use client"; // This ensures it's treated as a client component

import React from 'react';

const InteractiveBanner: React.FC = () => {
  // Determine if the window width is below 640px (mobile)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div
      style={{
        backgroundImage: 'url("/images/Banner4.png")',
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: isMobile ? "40vh" : "50vh", // Adjust height for mobile if needed
        margin: isMobile ? "0" : "auto", // Set margin to 0 on mobile
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
