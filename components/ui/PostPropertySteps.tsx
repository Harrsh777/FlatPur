"use client";
import ContactButton from "@/app/contact/ContactButton";
import React from "react";

const PostPropertySteps = () => {
  return (
    <section className="py-12 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-semibold text-gray-900">Post Your Property</h2>
        <h1 className="text-4xl font-semibold text-gray-900">in 3 Simple Steps</h1>
      </div>

      <div className="flex justify-around items-start space-x-8">
        {/* Step 1 */}
        <div className="flex flex-col items-center max-w-xs">
          <img
            src="/images/search.png"
            alt="Add details of your property"
            className="mb-4 w-20 h-20 rounded-full"
          />
          <h3 className="text-xl font-bold text-black-600 mb-2">01. Add details of your property</h3>
          <p className="text-gray-600 text-center">
            Begin by telling us the few basic details about your property like your
            property type, location, No. of rooms, etc.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center max-w-xs">
          <img
            src="/images/image-upload.png"
            alt="Upload Photos & Videos"
            className="mb-4 w-20 h-20 rounded-full"
          />
          <h3 className="text-xl font-bold text-black-600 mb-2">02. Upload Photos & Videos</h3>
          <p className="text-gray-600 text-center">
            Upload photos and videos of your property either via your desktop device
            or from your mobile phone.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center max-w-xs">
          <img
            src="/images/price-tag.png"
            alt="Add Pricing & Ownership"
            className="mb-4 w-20 h-20 rounded-full"
          />
          <h3 className="text-xl font-bold text-black-600 mb-2">03. Add Pricing & Ownership</h3>
          <p className="text-gray-600 text-center">
            Just update your property's ownership details and your expected price
            and your property is ready for posting.
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
       {/* Add the Contact Us button */}
      <ContactButton /> {/* Use the ContactButton component here */}
      </div>
    </section>
  );
};

export default PostPropertySteps;
