// InvestmentHotspotModal.tsx
"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Props interface to control modal open state and close function
interface InvestmentHotspotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Data for the chart based on your provided image
const data = [
  { name: "Gautam Budh Nagar", GDP: 91317.25 },
  { name: "Lucknow", GDP: 44264.01 },
  { name: "Allahabad", GDP: 43077.70 },
  { name: "Agra", GDP: 42184.16 },
  { name: "Kanpur Nagar", GDP: 39682.32 },
  { name: "Meerut", GDP: 39464.07 },
  { name: "Bareilly", GDP: 37337.05 },
  { name: "Chhatrapati Shahu Ji Maharaj Nagar", GDP: 37246.39 },
  { name: "Bulandshahr", GDP: 29168.49 },
  { name: "Saharanpur", GDP: 24208.97 },
];

const InvestmentHotspotModal: React.FC<InvestmentHotspotModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &#x2715;
        </button>
        <h2 className="text-2xl font-bold mb-4">Investment Hotspot</h2>
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="GDP" fill="#00bcd4">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#3f51b5" : "#00bcd4"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InvestmentHotspotModal;
