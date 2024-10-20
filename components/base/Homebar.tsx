import React from "react";
import BrandLogo from "./BrandLogo";
import Link from "next/link";

const Homebar = () => {
  return (
    <div className="mt-8 md:mt-24">
      <nav className="flex items-center justify-between md:px-12 py-2 border-b-[1px]">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <Link href="/">
            <BrandLogo />
          </Link>
        </div>

        {/* Add more sections here if needed, like navigation links */}
      </nav>
    </div>
  );
};

export default Homebar;
