import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Search, FileUp, AlertCircle } from 'lucide-react';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Searcher from './components/Searcher.jsx';
import ResultCard from './components/ResultCard.jsx';

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    setError('');
    const droppedFile = acceptedFiles[0];
    
    if (!droppedFile) return;
    
    if (droppedFile.type !== 'application/pdf') {
      setError('Please upload a PDF file.');
      return;
    }
    
    if (droppedFile.size > 50 * 1024 * 1024) {
      setError('File size must be under 50 MB.');
      return;
    }
    
    setFile(droppedFile);
    setQuery('');
    setResults([]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  const handleRemoveFile = () => {
    setFile(null);
    setQuery('');
    setResults([]);
    setError('');
  };

  const handleSearch = () => {
    if (!file) {
      setError('Please upload a PDF first.');
      return;
    }
    
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // TODO: Integrate with backend API to search PDF content
    setResults([]);
  };

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    if (!file) return;
    
    if (!newQuery.trim()) {
      setResults([]);
      return;
    }

    // TODO: Integrate with backend API to search PDF content
    setResults([]);
  };

  return (
    <div className="app">
      <Header onAddClick={() => console.log('Add clicked')} />
      
      <div className="content-shell">
        {!file ? (
          <div className="hero-card">
            <div>
              <div className="eyebrow">PDF Search Tool</div>
              <h1>Find what you need in seconds</h1>
              <p className="hero-copy">
                Upload a PDF document and instantly search through its content. Get quick summaries and exact page references.
              </p>
              <div className="hero-meta">
                <div className="status-pill">
                  <FileUp size={16} style={{ marginRight: '0.5rem' }} />
                  Ready to upload
                </div>
                <p className="status-note">Supports PDF files up to 50 MB</p>
              </div>
            </div>
          </div>
        ) : null}

        <div className={`panel-grid ${file ? 'with-file' : ''}`}>
          <Main
            file={file}
            error={error}
            onRemove={handleRemoveFile}
            dropzoneProps={getRootProps()}
            inputProps={getInputProps()}
            isDragActive={isDragActive}
          />

          {file && (
            <div className="search-panel">
              <Searcher 
                query={query}
                setQuery={handleQueryChange}
                onSearch={handleSearch}
              />

              {results.length > 0 && (
                <div>
                  <div className="results-meta">
                    <h2>Results ({results.length})</h2>
                  </div>
                  <div className="results-list">
                    {results.map((result, idx) => (
                      <ResultCard
                        key={idx}
                        title={result.title}
                        description={result.description}
                        tags={result.tags}
                      />
                    ))}
                  </div>
                </div>
              )}

              {file && query && results.length === 0 && (
                <div className="empty-state">
                  <Search size={32} className="empty-state-icon" />
                  <h3>No results found</h3>
                  <p>Try different keywords or check your document content.</p>
                </div>
              )}

              {file && !query && (
                <div className="empty-state">
                  <AlertCircle size={32} className="empty-state-icon" />
                  <h3>Start searching</h3>
                  <p>Enter keywords to search within your document.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
