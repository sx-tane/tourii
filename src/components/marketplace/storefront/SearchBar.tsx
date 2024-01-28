import React, { useState } from "react";

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    setSearchQuery(query);
  };

  return (
    <div className="flex space-x-2 p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-4 py-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 px-4 py-2 text-white"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
