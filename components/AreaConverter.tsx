"use client";
import React, { useState } from "react";
import { FaArrowsAltH } from "react-icons/fa"; // Importing an arrow icon

// Define the types for your measurement units
type MeasurementUnit =
  | "Square Feet"
  | "Guntha"
  | "Hectare"
  | "Ground"
  | "Bigha"
  | "Square Meter"
  | "Gaj"; // Added Gaj

const states = [
  "Madhya Pradesh",
  "Maharashtra",
  "Tamil Nadu",
  "Karnataka",
  "Uttar Pradesh",
  "Gujarat",
  "Rajasthan",
  "West Bengal",
  "Andhra Pradesh",
  "Odisha",
  "Punjab",
  "Haryana",
];

// Define the measurement units with their conversion values
const measurementUnits: Record<MeasurementUnit, number> = {
  "Square Feet": 1,
  Guntha: 0.001,
  Hectare: 0.000247105,
  Ground: 0.00247105,
  Bigha: 0.005,
  "Square Meter": 10.7639, // Conversion value for Square Meter
  Gaj: 9, // Assuming 1 Gaj = 9 Square Feet
};

const AreaConverter = () => {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [inputValue, setInputValue] = useState(1);
  const [fromUnit, setFromUnit] = useState<MeasurementUnit>("Square Feet");
  const [toUnit, setToUnit] = useState<MeasurementUnit>("Square Meter");
  const [convertedValue, setConvertedValue] = useState<number | null>(null); // Changed to nullable

  const handleConversion = () => {
    const baseValue = inputValue * measurementUnits[fromUnit];
    const result = baseValue / measurementUnits[toUnit];
    setConvertedValue(result);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-16 mb-16">
      <h2 className="text-3xl font-bold text-center mb-4">Area Converter</h2>

      <div className="mb-4">
        <label className="block text-gray-600 font-semibold">Select State</label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="border-b-2 border-gray-400 p-1 w-full rounded-none focus:outline-none focus:border-blue-500"
        >
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 font-semibold">Enter No. of Units</label>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
          className="border-b-2 border-gray-400 p-1 w-full rounded-none focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex justify-between mb-4">
        <div>
          <label className="block text-gray-600 font-semibold">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as MeasurementUnit)}
            className="border-b-2 border-gray-400 p-1 rounded-none focus:outline-none focus:border-blue-500"
          >
            {Object.keys(measurementUnits).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center mx-4">
          <FaArrowsAltH className="text-2xl" />
        </div>

        <div>
          <label className="block text-gray-600 font-semibold">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as MeasurementUnit)}
            className="border-b-2 border-gray-400 p-1 rounded-none focus:outline-none focus:border-blue-500"
          >
            {Object.keys(measurementUnits).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleConversion}
        className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
      >
        Convert
      </button>

      {/* Show converted value */}
      {convertedValue !== null && (
        <h3 className="text-xl font-semibold mt-4">
          Converted Value: {convertedValue.toFixed(4)} {toUnit}
        </h3>
      )}

      {/* Show conversion rate */}
      {convertedValue !== null && (
        <p className="mt-4 text-gray-600">
          {inputValue} {fromUnit} = {convertedValue.toFixed(4)} {toUnit}
        </p>
      )}
    </div>
  );
};

export default AreaConverter;
