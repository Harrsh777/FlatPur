"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import HomeCard from './common/HomeCard';

interface FullSearchBarProps {
  handleClick: (category: string) => void;
  selectedCategory?: string;
}

const FullSearchBar: React.FC<FullSearchBarProps> = ({ handleClick, selectedCategory }) => {
  const [category, setCategory] = useState<string>(selectedCategory || "");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredHomes, setFilteredHomes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [noResults, setNoResults] = useState(false); 
  const [resultsVisible, setResultsVisible] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    setCategory(selectedCategory || "");
  }, [selectedCategory]);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setNoResults(false); 

    try {
      if (!searchQuery) {
        setError("Please provide a search criterion.");
        setLoading(false);
        return;
      }

      const filters = [];
      if (searchQuery) {
        filters.push(`city.ilike.%${searchQuery}%`);
        filters.push(`state.ilike.%${searchQuery}%`);
        filters.push(`title.ilike.%${searchQuery}%`);
      }

      const filterQuery = filters.join(',');

      const { data: homes, error: homesError } = await supabase
        .from('homes')
        .select('*')
        .or(filterQuery);

      if (homesError) {
        throw homesError;
      }

      if (homes && homes.length > 0) {
        setFilteredHomes(homes);
        setResultsVisible(true);
      } else {
        setFilteredHomes([]);
        setNoResults(true); 
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('An error occurred while fetching properties.');
    } finally {
      setLoading(false);
    }
  };

  const handleAllPropertiesClick = () => {
    router.push("/");
  };

  const handleHomeClick = (homeId: string) => {
    router.push(`/home/${homeId}`);
  };

  const toggleResultsVisibility = () => {
    setResultsVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="w-full flex flex-col items-center" style={{ position: "relative" }}>
      <div className="bg-white shadow-lg rounded-md py-3 px-6 mb-6 w-full max-w-[1000px]">
        <div className="bg-white shadow-lg rounded-md py-3 px-6 mb-6 w-full max-w-[1200px]">
          <div 
            className="flex justify-start space-x-4 mb-4 text-lg category-links" 
            style={{ fontSize: '16px', paddingLeft: '2px' }}
          >
            <a href="#" className="text-green-500 font-semibold hover:underline" onClick={() => handleClick("Buy")}>Buy</a>
            <a href="#" className="text-green-700 font-semibold hover:underline" onClick={() => handleClick("Rent")}>Rent</a>
            <a href="#" className="text-green-700 font-semibold hover:underline" onClick={() => handleClick("Apartments")}>Apartments</a>
            <a href="#" className="text-green-700 font-semibold hover:underline" onClick={() => handleClick("Houses")}>Houses</a>
            <a href="#" className="text-green-700 font-semibold hover:underline" onClick={() => handleClick("Trending")}>Trending</a>
            <a href="#" className="text-green-700 font-semibold hover:underline" onClick={() => handleClick("Lands")}>Lands</a>
            <a href="#" className="text-green-700 font-semibold hover:underline" onClick={() => handleClick("Under-Construction")}>Under-Construction</a>
            <a href="#" className="text-green-700 font-semibold hover:underline" onClick={handleAllPropertiesClick}>All Properties</a>
          </div>

          <div className="w-full bg-white rounded-md px-6 py-4 flex items-center justify-between">
            <div className="flex-grow flex items-center border border-gray-300 rounded-md mr-4">
              <input
                type="text"
                placeholder={error || `Search in ${category ? category : "city, state, or title"}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-grow px-4 py-2 outline-none ${error ? 'border-red-500' : 'border-gray-300'}`}
              />
              <button 
                onClick={handleSearch}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div 
          className={`absolute top-full center w-full max-w-[950px] bg-white shadow-lg z-20 ${resultsVisible && (filteredHomes.length > 0 || noResults) ? 'block' : 'hidden'}`} 
          style={{ borderRadius: "0 0 8px 8px" }}
        >
          {noResults ? (
            <p className="text-red-500 p-4">No properties found. Please try a different search.</p>
          ) : (
            filteredHomes.map((home) => (
              <div 
                key={home.id} 
                className="p-4 border-b flex justify-between items-center cursor-pointer mb-4"
                onClick={() => handleHomeClick(home.id)}
              >
                <div className="flex-grow">
                  <h3 className="font-bold">{home.title}</h3>
                  <p className="text-gray-600">{home.city}</p>
                  <p className="text-green-500 font-semibold">Price: {home.price}</p>
                </div>

                <div className="ml-4" style={{ width: "10cm", height: "6cm", overflow: "hidden", zIndex: 0 }}>
                  <HomeCard home={home} showDetails={false} />
                </div>
              </div>
            ))
          )}

          {resultsVisible && (
            <div className="flex justify-center mb-4">
              <button onClick={toggleResultsVisibility} className="bg-green-500 text-white py-2 px-4 rounded-full">
                ▲
              </button>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .category-links {
            font-size: 10px;
            display: flex;
            justify-content: flex-start;
            white-space: nowrap;
            overflow-x: auto;
            padding-left: 2px;
          }
          .category-links a {
            margin-right: 4px;
          }
          input {
            width: calc(100% + 16px); /* Increase input width for mobile */
            margin-left: -8px; /* Adjust margin to center the input */
          }
          button {
            width: auto; /* Allow button to resize appropriately */
          }
          .bg-white {
            padding-left: 0; /* Remove extra padding on mobile */
            padding-right: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FullSearchBar;
