"use client";
import React from "react";
import { FaUserTie, FaHeadset, FaDollarSign, FaBuilding } from "react-icons/fa";

const features = [
  {
    icon: <FaUserTie className="text-black" size={28} />,
    title: "Expert Advisor",
    description:
      "Experienced property consultants guide you in finding the perfect home or investment.",
  },
  {
    icon: <FaHeadset className="text-black" size={28} />,
    title: "Effective Support",
    description: "Prompt assistance for all your real estate queries and concerns.",
  },
  {
    icon: <FaDollarSign className="text-black" size={28} />,
    title: "Low Fees",
    description:
      "Competitive service fees to ensure maximum value for your investment",
  },
  {
    icon: <FaBuilding className="text-black" size={28} />,
    title: "Loan Facility",
    description:
      "Access flexible home loan options tailored to your financial needs",
  },
];

const ClientSection: React.FC = () => {
  return (
    <section className="w-full bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              15k+ clients base & growing.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Your success is our mission. As business advisors, we offer expert
              guidance, unlocking your potential for growth and profitability.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                className="inline-flex items-center justify-center rounded-lg bg-green-600 text-white px-5 py-3 text-sm sm:text-base font-medium shadow-sm hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                onClick={() => alert("Callback request sent! We will contact you soon.")}
              >
                Request a Callback →
              </button>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg bg-white text-gray-800 px-5 py-3 text-sm sm:text-base font-medium shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="group rounded-xl bg-white p-5 sm:p-6 shadow-sm ring-1 ring-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    {f.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">{f.title}</h3>
                </div>
                <p className="mt-3 text-sm sm:text-base text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSection;
