"use client";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PricePrediction = () => {
  const [locality, setLocality] = useState("");
  const [sqFeet, setSqFeet] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [otherRooms, setOtherRooms] = useState(0);
  const [buildingAge, setBuildingAge] = useState(0);
  const [proximity, setProximity] = useState({
    schools: false,
    parks: false,
    transport: false,
    malls: false,
    markets: false,
    hospitals: false,
    Corner:false,
  });
  const [buyOrRent, setBuyOrRent] = useState("buy");
  const [predictions, setPredictions] = useState<number[]>([]);
  const [showDropdown, setShowDropdown] = useState(false); // New state to control dropdown visibility

  const kanpurAreas = [
    { name: "Swaroop Nagar,Kanpur", pricePerSqFt: 7000, rank: 1, growthRate: 0.07 },
    { name: "Shyam Nagar,Kanpur", pricePerSqFt: 4800, rank: 2, growthRate: 0.065 },
    { name: "Civil Lines,Kanpur", pricePerSqFt: 5300, rank: 3, growthRate: 0.06 },
    { name: "Tilak Nagar,Kanpur", pricePerSqFt: 5500, rank: 4, growthRate: 0.055 },
    { name: "Kalyanpur,Kanpur", pricePerSqFt: 5000, rank: 5, growthRate: 0.054 },
    { name: "Kakadeo,Kanpur", pricePerSqFt: 5200, rank: 6, growthRate: 0.052 },
    { name: "Indiranagar,Kanpur", pricePerSqFt: 5000, rank: 7, growthRate: 0.05 },
    { name: "Harsh Nagar,Kanpur", pricePerSqFt: 4900, rank: 8, growthRate: 0.05 },
    { name: "Saket Nagar,Kanpur", pricePerSqFt: 4800, rank: 9, growthRate: 0.048 },
    { name: "Ganga Nagar,Kanpur", pricePerSqFt: 3500, rank: 10, growthRate: 0.045 },
    { name: "Panki,Kanpur", pricePerSqFt: 4100, rank: 11, growthRate: 0.042 },
    { name: "Naveen Market,Kanpur", pricePerSqFt: 4600, rank: 12, growthRate: 0.042 },
    { name: "Rampuram,Kanpur", pricePerSqFt: 3900, rank: 13, growthRate: 0.039 },
    { name: "Jajmau,Kanpur", pricePerSqFt: 3300, rank: 14, growthRate: 0.029 },
    { name: "Chakeri,Kanpur", pricePerSqFt: 3000, rank: 15, growthRate: 0.025 },
    { name: "Govind Nagar,Kanpur", pricePerSqFt: 4500, rank: 16, growthRate: 0.046 },
    { name: "Ratanlal Nagar,Kanpur", pricePerSqFt: 5000, rank: 17, growthRate: 0.048 },
    { name: "Barra,Kanpur", pricePerSqFt: 4200, rank: 18, growthRate: 0.043 },
    { name: "Vishnupuri,Kanpur", pricePerSqFt: 5200, rank: 19, growthRate: 0.051 },
    { name: "Geeta Nagar,Kanpur", pricePerSqFt: 4800, rank: 20, growthRate: 0.047 },
    { name: "Ashok Nagar,Kanpur", pricePerSqFt: 5300, rank: 21, growthRate: 0.055 },
    { name: "Moti Jheel,Kanpur", pricePerSqFt: 7000, rank: 22, growthRate: 0.067 },
    { name: "Arya ,Kanpur", pricePerSqFt: 6200, rank: 23, growthRate: 0.06 },
    { name: "Rawatpur,Kanpur", pricePerSqFt: 5100, rank: 24, growthRate: 0.052 },
    { name: "Gupta Colony,Kanpur", pricePerSqFt: 4000, rank: 25, growthRate: 0.044 },
    { name: "Lakhanpur,Kanpur", pricePerSqFt: 4600, rank: 26, growthRate: 0.045 },
    { name: "Yashoda Nagar,Kanpur", pricePerSqFt: 4300, rank: 27, growthRate: 0.042 },
    { name: "Ravi Nagar,Kanpur", pricePerSqFt: 4700, rank: 28, growthRate: 0.046 },
    { name: "Shastri Nagar,Kanpur", pricePerSqFt: 5300, rank: 29, growthRate: 0.052 },
    { name: "Keshav Nagar,Kanpur", pricePerSqFt: 4100, rank: 30, growthRate: 0.041 }
];


  const handlePrediction = () => {
    const selectedArea = kanpurAreas.find((area) => area.name === locality);
    if (selectedArea) {
      const { pricePerSqFt, growthRate } = selectedArea;
      let basePrice = pricePerSqFt * sqFeet;

      // Adjust room price effect (each extra room has a progressively larger impact)
      const roomMultiplier = 1 + 0.15 * bedrooms + 0.12 * bathrooms + 0.08 * otherRooms;
      basePrice *= roomMultiplier;

      const ageFactor = Math.max(0, 1 - buildingAge * 0.01);
      basePrice *= ageFactor;

      let amenityBonus = 1;
      if (proximity.Corner) amenityBonus += 0.1;
      if (proximity.schools) amenityBonus += 0.05;
      if (proximity.parks) amenityBonus += 0.05;
      if (proximity.transport) amenityBonus += 0.07;
      if (proximity.malls) amenityBonus += 0.05;
      if (proximity.markets) amenityBonus += 0.04;
      if (proximity.hospitals) amenityBonus += 0.06;
      

      basePrice *= amenityBonus;

      const predictedPrices = [
        basePrice * Math.pow(1 + growthRate, 5),
        basePrice * Math.pow(1 + growthRate, 10),
        basePrice * Math.pow(1 + growthRate, 15),
      ];

      if (buyOrRent === "rent") {
        const rentCurrentPrice = basePrice * 0.004; // Rent is 0.4% of buy price
        setPredictions([rentCurrentPrice, ...predictedPrices.map((price) => price * 0.004)]);
      } else {
        setPredictions([basePrice, ...predictedPrices]);
      }
    }
  };

  // Default empty chart data
  const defaultChartData = {
    labels: ["Current", "5 Years", "10 Years", "15 Years"],
    datasets: [
      {
        label: "No Data Yet",
        data: [0, 0, 0, 0],
        fill: false,
        borderColor: "rgba(200, 200, 200, 0.5)",
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  };

  // Chart data based on predictions
  const chartData = {
    labels: ["Current", "5 Years", "10 Years", "15 Years"],
    datasets: [
      {
        label: buyOrRent === "buy" ? "Buy Price Prediction" : "Rent Price Prediction",
        data: predictions.length > 0 ? predictions : [0, 0, 0, 0], // Use predictions or empty
        fill: false,
        borderColor: predictions.length > 0 ? "rgb(75, 192, 192)" : "rgba(200, 200, 200, 0.5)",
        tension: 0.1,
      },
    ],
  };

  const filteredAreas = kanpurAreas.filter((area) =>
    area.name.toLowerCase().includes(locality.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-10 bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Real Estate Price Prediction</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="w-full">
          {/* Buy vs Rent Toggle */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Are you looking to Buy or Rent?</label>
            <select
              value={buyOrRent}
              onChange={(e) => setBuyOrRent(e.target.value)}
              className="border p-2 w-full mt-1"
            >
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          {/* Locality Autocomplete Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Locality:</label>
            <input
              type="text"
              value={locality}
              onChange={(e) => {
                setLocality(e.target.value);
                setShowDropdown(true); // Show dropdown when typing
              }}
              className="border p-2 w-full mt-1"
              placeholder="Type to search localities"
            />
            {locality && showDropdown && (
              <ul className="border border-gray-300 mt-1 bg-white">
                {filteredAreas.map((area) => (
                  <li
                    key={area.name}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setLocality(area.name);
                      setShowDropdown(false); // Hide dropdown after selection
                    }}
                  >
                    {area.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Square Feet */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Total Square Feet:</label>
            <input
              type="number"
              value={sqFeet}
              onChange={(e) => setSqFeet(Number(e.target.value))}
              className="border p-2 w-full mt-1"
              placeholder="Enter square footage"
            />
          </div>

          {/* Bedrooms, Bathrooms, Other Rooms */}
          <div className="mb-4 grid grid-cols-3 gap-4">
  <div>
    <label className="block text-sm font-medium">Bedrooms:</label>
    <input
      type="number"
      value={bedrooms}
      onChange={(e) => setBedrooms(Number(e.target.value))}
      className="border p-2 w-full mt-1"
      placeholder="0"
    />
  </div>

  <div>
    <label className="block text-sm font-medium">Bathrooms:</label>
    <input
      type="number"
      value={bathrooms}
      onChange={(e) => setBathrooms(Number(e.target.value))}
      className="border p-2 w-full mt-1"
      placeholder="0"
    />
  </div>

  <div>
    <label className="block text-sm font-medium">Other Rooms:</label>
    <input
      type="number"
      value={otherRooms}
      onChange={(e) => setOtherRooms(Number(e.target.value))}
      className="border p-2 w-full mt-1"
      placeholder="0"
    />
  </div>
</div>

          {/* Building Age */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Building Age (years):</label>
            <input
              type="number"
              value={buildingAge}
              onChange={(e) => setBuildingAge(Number(e.target.value))}
              className="border p-2 w-full mt-1"
              placeholder="Enter building age"
            />
          </div>

          {/* Proximity Checkboxes */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Proximity to amenities:</label>
            <div className="flex items-center">
            <label className="mr-2">
                <input
                  type="checkbox"
                  checked={proximity.Corner}
                  onChange={(e) => setProximity({ ...proximity, Corner: e.target.checked })}
                  className="mr-1"
                />
                Corner
              </label>
              <label className="mr-2">
                <input
                  type="checkbox"
                  checked={proximity.schools}
                  onChange={(e) => setProximity({ ...proximity, schools: e.target.checked })}
                  className="mr-1"
                />
                Schools
              </label>
              <label className="mr-2">
                <input
                  type="checkbox"
                  checked={proximity.parks}
                  onChange={(e) => setProximity({ ...proximity, parks: e.target.checked })}
                  className="mr-1"
                />
                Parks
              </label>
              <label className="mr-2">
                <input
                  type="checkbox"
                  checked={proximity.transport}
                  onChange={(e) => setProximity({ ...proximity, transport: e.target.checked })}
                  className="mr-1"
                />
                Transport
              </label>
              <label className="mr-2">
                <input
                  type="checkbox"
                  checked={proximity.malls}
                  onChange={(e) => setProximity({ ...proximity, malls: e.target.checked })}
                  className="mr-1"
                />
                Malls
              </label>
              <label className="mr-2">
                <input
                  type="checkbox"
                  checked={proximity.markets}
                  onChange={(e) => setProximity({ ...proximity, markets: e.target.checked })}
                  className="mr-1"
                />
                Markets
              </label>
              <label className="mr-2">
                <input
                  type="checkbox"
                  checked={proximity.hospitals}
                  onChange={(e) => setProximity({ ...proximity, hospitals: e.target.checked })}
                  className="mr-1"
                />
                Hospitals
              </label>
              
            </div>
          </div>

          {/* Predict Button */}
          <button
            className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded mt-4"
            onClick={handlePrediction}
          >
            Predict Price
          </button>
        </div>

        {/* Chart Section */}
        <div className="w-full h-auto min-h-[350px]"> {/* Set min-height */}
          <Line data={predictions.length > 0 ? chartData : defaultChartData} />
        </div>
      </div>
    </div>
  );
};

export default PricePrediction;
