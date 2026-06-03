import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';

const ResultCard = ({ title, description, tags }) => {
  return (
    <div className="result-card">
      <div className="result-card-head">
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <FileText size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <h3>{title}</h3>
          </div>
          <p className="result-description">{description}</p>
        </div>
        <div className="tag-pill">{tags?.[0] ?? 'Note'}</div>
      </div>

      <div className="result-actions">
        <button 
          className="button-secondary" 
          type="button"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          title="Open document"
        >
          <span>View</span>
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
