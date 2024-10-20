"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

interface ResearchInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Data based on the provided image
const data = [
  { year: 2020, Residential: 680.8, Commercial: 300.0, Industrial: 200.0, Land: 100.0, Others: 80.0 },
  { year: 2021, Residential: 699.9, Commercial: 320.0, Industrial: 210.0, Land: 110.0, Others: 90.0 },
  { year: 2022, Residential: 710.0, Commercial: 330.0, Industrial: 220.0, Land: 115.0, Others: 95.0 },
  { year: 2023, Residential: 720.0, Commercial: 340.0, Industrial: 230.0, Land: 120.0, Others: 100.0 },
  { year: 2024, Residential: 740.0, Commercial: 360.0, Industrial: 240.0, Land: 130.0, Others: 110.0 },
  { year: 2025, Residential: 760.0, Commercial: 380.0, Industrial: 250.0, Land: 140.0, Others: 120.0 },
  { year: 2026, Residential: 780.0, Commercial: 400.0, Industrial: 260.0, Land: 150.0, Others: 130.0 },
  { year: 2027, Residential: 800.0, Commercial: 420.0, Industrial: 270.0, Land: 160.0, Others: 140.0 },
  { year: 2028, Residential: 820.0, Commercial: 440.0, Industrial: 280.0, Land: 170.0, Others: 150.0 },
  { year: 2029, Residential: 840.0, Commercial: 460.0, Industrial: 290.0, Land: 180.0, Others: 160.0 },
  { year: 2030, Residential: 860.0, Commercial: 480.0, Industrial: 300.0, Land: 190.0, Others: 170.0 },
];

const ResearchInsightsModal: React.FC<ResearchInsightsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-3/4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &#x2715;
        </button>
        <h2 className="text-2xl font-bold mb-4">Uttar Pradesh Real Estate Market (2020 - 2030)</h2>
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.5)' }} />
              <Legend />
              <Bar dataKey="Residential" stackId="a" fill="#4C4CFF" />
              <Bar dataKey="Commercial" stackId="a" fill="#4AC7F4" />
              <Bar dataKey="Industrial" stackId="a" fill="#8CD3FF" />
              <Bar dataKey="Land" stackId="a" fill="#D4B6FF" />
              <Bar dataKey="Others" stackId="a" fill="#F4E2FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ResearchInsightsModal;
