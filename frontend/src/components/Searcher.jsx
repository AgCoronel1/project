import React, { useState } from 'react';

const Searcher = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="search-input p-4 border-dashed border-2 border-gray-300 rounded w-full"
      />
      <button className="search-button px-4 py-2 bg-blue-500 text-white rounded ml-2">
        Search
      </button>
    </div>
  );
};

export default Searcher;