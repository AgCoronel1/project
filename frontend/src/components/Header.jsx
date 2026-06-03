import React from 'react';
import { Plus } from 'lucide-react';

const Header = ({ onAddClick }) => {
  return (
    <header className="app-header">
      <div>
        <p className="header-label">📄 RTM</p>
        <p className="header-subtitle">Read The Manual AI</p>
      </div>
      <button 
        className="header-action" 
        type="button"
        onClick={onAddClick}
        title="Add new document"
        aria-label="Add new document"
      >
        <Plus size={20} />
      </button>
    </header>
  );
};

export default Header;
