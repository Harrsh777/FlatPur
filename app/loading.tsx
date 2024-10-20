import React from "react";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white relative">
      {/* Image adjusted to 1/3 of the screen */}
      <div
        className="absolute w-3/4 h-3/4 bg-no-repeat bg-contain bg-center"
        style={{ backgroundImage: 'url("/images/Flatpur.png")' }}
      />
      {/* Centered text moved slightly lower */}
      <p
        className="text-2xl text-center bg-white bg-opacity-80 p-4 rounded absolute"
        style={{ top: '50%' }} // Adjust this percentage as needed
      >
        Just a sec, your new home is on its way...
      </p>
    </div>
  );
}
