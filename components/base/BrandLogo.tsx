"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BrandLogo() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/'); // Navigate to the home page without refreshing
  };

  return (
    <button 
      className="absolute top-0 left-0 z-50 p-0 m-0" 
      onClick={handleLogoClick} 
      style={{ 
        cursor: 'pointer', 
        border: 'none', 
        background: 'none', 
        position: 'absolute',   // Use absolute to place it at the top
        top: 0,                 // Stick to the top of the page
        left: 0,                // Stick to the left of the page
        zIndex: 50              // Ensure it stays above other elements
      }} 
    >
      {/* Larger logo for large screens */}
      <Image 
        src="/images/Flatpur.png" 
        width={500} 
        height={400} 
        alt="logo" 
        className="hidden lg:block object-contain"
        style={{ margin: -80, padding: 10 }} // Adjust margins as needed
      />
      
      {/* Smaller logo for small screens */}
      <Image 
        src="/images/Flatpur.png" 
        width={300} 
        height={300} 
        alt="logo" 
        className="lg:hidden object-contain"
        style={{ margin: -45, padding: 0 }} // Adjust margins as needed
      />
    </button>
  );
}
