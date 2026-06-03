import React from 'react';
import { Search } from 'lucide-react';

const Searcher = ({ query, setQuery, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="panel search-panel-inner">
      <label className="panel-title" htmlFor="search-input">
        <Search size={18} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom' }} />
        Search
      </label>

      <div className="search-wrapper">
        <input
          id="search-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search keywords..."
          className="search-input"
          autoComplete="off"
        />
        <button 
          className="button-primary" 
          type="button"
          onClick={onSearch}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          <Search size={18} />
          Search
        </button>
      </div>

      <p className="search-hint">💡 Try: "Executive summary", "Pricing", or "Implementation"</p>
    </div>
  );
};

export default Searcher;
