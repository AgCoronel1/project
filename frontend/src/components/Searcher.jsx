import React from 'react';
import { Search, Loader } from 'lucide-react';

const Searcher = ({ query, setQuery, onSearch, isSearching }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isSearching) {
      onSearch();
    }
  };

  return (
    <div className="panel search-panel-inner">
      <label className="panel-title" htmlFor="search-input">
        <Search size={18} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom' }} />
        Search inside your document
      </label>

      <div className="search-wrapper">
        <input
          id="search-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type keywords, titles, or sections..."
          className="search-input"
          disabled={isSearching}
        />
        <button 
          className="button-primary" 
          type="button"
          onClick={onSearch}
          disabled={isSearching}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          {isSearching ? (
            <>
              <Loader size={18} className="spinner" />
              Searching...
            </>
          ) : (
            <>
              <Search size={18} />
              Search
            </>
          )}
        </button>
      </div>

      <p className="search-hint">💡 Try: "Executive summary", "Pricing", or "Implementation"</p>
    </div>
  );
};

export default Searcher;
