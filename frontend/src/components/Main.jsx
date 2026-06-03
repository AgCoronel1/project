import React from 'react';
import { Upload, CheckCircle, Trash2 } from 'lucide-react';

const Main = ({ file, error, onRemove, dropzoneProps, inputProps, isDragActive }) => {
  return (
    <section className="panel upload-panel">
      <div className="panel-header">
        <div>
          <p className="panel-title">Upload PDF</p>
          <p className="panel-subtitle">Drag & drop or click to import one file.</p>
        </div>
      </div>

      <div className={`upload-area ${isDragActive ? 'drag-active' : ''}`} {...dropzoneProps}>
        <input {...inputProps} />
        <div>
          <Upload size={32} style={{ marginBottom: '0.5rem', opacity: 0.7 }} />
          <p className="upload-cta">Tap or drop a PDF here</p>
          <p className="upload-helper">We support one document at a time.</p>
        </div>
      </div>

      {file ? (
        <div className="file-panel">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <CheckCircle size={20} style={{ color: 'var(--accent)', marginTop: '0.1rem', flexShrink: 0 }} />
            <div>
              <p className="file-label">Selected file</p>
              <p className="file-name">{file.name}</p>
              <p className="file-meta">{Math.round(file.size / 1024)} KB • PDF</p>
            </div>
          </div>
          <button 
            className="button-secondary" 
            type="button" 
            onClick={onRemove}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}
            title="Remove file"
          >
            <Trash2 size={16} />
            Remove
          </button>
        </div>
      ) : null}

      {error && <p className="error-text">⚠️ {error}</p>}
    </section>
  );
};

export default Main;
