"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import HomeCard from './common/HomeCard';
import { FiSearch, FiHome, FiTrendingUp, FiMap, FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";

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
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCategory(selectedCategory || "");
  }, [selectedCategory]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
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

  const clearSearch = () => {
    setSearchQuery("");
    setError("");
    setIsFocused(false);
  };

  const categoryIcons: Record<string, JSX.Element> = {
    "Buy": <FiHome className="mr-1" />,
    "Rent": <FiHome className="mr-1" />,
    "Apartments": <FiHome className="mr-1" />,
    "Houses": <FiHome className="mr-1" />,
    "Trending": <FiTrendingUp className="mr-1" />,
    "Lands": <FiMap className="mr-1" />,
    "Under-Construction": <FiHome className="mr-1" />,
    "All Properties": <FiHome className="mr-1" />
  };

  const categoryNames = ["Buy", "Rent", "Apartments", "Houses", "Trending", "Lands", "Under-Construction", "All Properties"];

  return (
    <div className="w-full flex flex-col items-center relative" ref={searchRef}>
      <div className="bg-white rounded-2xl shadow-md py-5 px-6 mb-6 w-full max-w-5xl transition-all duration-300 hover:shadow-lg">
        <div className="flex flex-wrap justify-start gap-3 mb-5 category-links">
          {categoryNames.map((cat) => (
            <button
              key={cat}
              className={`flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${category === cat ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => cat === "All Properties" ? handleAllPropertiesClick() : handleClick(cat)}
            >
              {categoryIcons[cat]}
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full bg-white rounded-xl px-2 py-2 flex items-center justify-between border border-gray-200 transition-all duration-300 focus-within:border-green-500 focus-within:shadow-md">
          <div className="flex-grow flex items-center">
            <FiSearch className="text-gray-400 ml-3 mr-1" />
            <input
              type="text"
              placeholder={error || `Search in ${category ? category : "city, state, or title"}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              className={`flex-grow px-4 py-3 outline-none bg-transparent ${error ? 'placeholder-red-300' : ''}`}
            />
            {searchQuery && (
              <button onClick={clearSearch} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <FiX className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="ml-2 bg-green-500 text-white py-3 px-5 rounded-xl hover:bg-green-600 transition-all duration-200 flex items-center disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <FiSearch className="mr-2" />
                Search
              </>
            )}
          </button>
        </div>
      </div>

      {((filteredHomes.length > 0 || noResults) && resultsVisible) && (
        <div 
          className="absolute top-full w-full max-w-5xl bg-white rounded-2xl shadow-xl z-20 overflow-hidden mt-1"
        >
          <div className="max-h-96 overflow-y-auto">
            {noResults ? (
              <div className="p-6 text-center">
                <div className="text-red-500 mb-2 text-lg">No properties found</div>
                <p className="text-gray-600">Please try a different search term</p>
              </div>
            ) : (
              filteredHomes.map((home) => (
                <div 
                  key={home.id} 
                  className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start cursor-pointer transition-colors duration-200 hover:bg-gray-50"
                  onClick={() => handleHomeClick(home.id)}
                >
                  <div className="flex-grow mb-4 md:mb-0 md:mr-4">
                    <h3 className="font-bold text-lg mb-1">{home.title}</h3>
                    <p className="text-gray-600 mb-2">{home.city}, {home.state}</p>
                    <p className="text-green-500 font-semibold">${home.price.toLocaleString()}</p>
                  </div>

                  <div className="w-full md:w-40 h-32 rounded-lg overflow-hidden shadow-md">
                    <HomeCard home={home} showDetails={false} />
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="flex justify-center p-3 bg-gray-50 border-t border-gray-100">
            <button 
              onClick={toggleResultsVisibility} 
              className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
              aria-label="Collapse results"
            >
              <FiChevronUp size={20} />
            </button>
          </div>
        </div>
      )}

      {((filteredHomes.length > 0 || noResults) && !resultsVisible) && (
        <div className="absolute top-full w-full max-w-5xl flex justify-center mt-2">
          <button 
            onClick={toggleResultsVisibility} 
            className="bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 transition-colors"
            aria-label="Expand results"
          >
            <FiChevronDown size={20} />
          </button>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .category-links {
            overflow-x: auto;
            padding-bottom: 8px;
            margin-bottom: 16px;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .category-links::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FullSearchBar;