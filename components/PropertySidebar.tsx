"use client";
import React from "react";

interface PropertySidebarProps {
  price?: string | number;
  agentName?: string;
}

const PropertySidebar: React.FC<PropertySidebarProps> = ({ price, agentName }) => {
  const handleSchedule = () => {
    const el = document.getElementById("book-visit");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url: window.location.href });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied");
      }
    } catch (e) {
      // noop
    }
  };

  const handleSave = () => {
    alert("Saved!");
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 sm:p-6">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-sm text-gray-500">Price</p>
          <p className="mt-1 text-2xl font-semibold">{price}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3">
        <a
          href="#contact"
          className="inline-flex w-full items-center justify-center rounded-lg bg-green-600 text-white px-4 py-3 text-sm font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Contact Agent
        </a>
        <button
          onClick={handleSchedule}
          className="inline-flex w-full items-center justify-center rounded-lg bg-white text-gray-900 px-4 py-3 text-sm font-medium shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
        >
          Schedule a Visit
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleShare}
          className="inline-flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50"
        >
          Share
        </button>
        <button
          onClick={handleSave}
          className="inline-flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50"
        >
          Save
        </button>
      </div>

      {agentName && (
        <div className="mt-6 rounded-lg bg-gray-50 p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500">Listed by</p>
          <p className="mt-1 font-medium">{agentName}</p>
        </div>
      )}
    </div>
  );
};

export default PropertySidebar;


