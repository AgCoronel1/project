import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Search, AlertCircle } from 'lucide-react';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Searcher from './components/Searcher.jsx';
import ResultCard from './components/ResultCard.jsx';

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

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
    
    console.log('File dropped:', droppedFile);
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

  const handleSearch = async () => {
    if (!file) {
      setError('Please upload a PDF first.');
      return;
    }
    
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setIsSearching(true);
      setError('');
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('query', query);

      console.log('handleSearch function called');
      
      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResults(Array.isArray(data) ? data : [data]); 
      } else {
        const errorData = await response.text();
        setError(errorData || 'An error occurred during search.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('An unexpected network error occurred.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    
    if (!newQuery.trim()) {
      setResults([]);
    }
  };

  return (
    <div className="app">
      <Header onAddClick={() => console.log('Add clicked')} />
      
      <div className="content-shell">
        {!file ? (
          <div className="hero-card">
            <div>
              <div className="eyebrow">Instant semantic search for vehicle manuals.</div>
              <h1>Your car's manual, indexed by meaning, not keywords.</h1>
              <p className="hero-copy">
                Drop your PDF manual. Find exact pages instantly.
              </p>
              <div className="hero-meta">
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
                isSearching={isSearching}
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

              {file && query && results.length === 0 && !isSearching && (
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