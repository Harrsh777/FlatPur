// File: components/RatesTrendsModal.tsx

import React from "react";
import { FaTimes } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface RatesTrendsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RatesTrendsModal: React.FC<RatesTrendsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const data = {
    labels: ["Q1 FY11", "Q1 FY12", "Q1 FY13", "Q1 FY14", "Q1 FY15", "Q1 FY16", "Q1 FY17", "Q1 FY18", "Q1 FY19", "Q1 FY20", "Q1 FY21"],
    datasets: [
      {
        label: "Growth of all-India HPI",
        data: [94.2, 116, 142.6, 162.3, 188, 215.3, 231.1, 251.2, 264.6, 273.7, 281.4],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
        pointHoverBackgroundColor: 'red',
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: any) {
            return `Value: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8 relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={onClose}>
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Growth of all-India HPI</h2>
        <div>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default RatesTrendsModal;
