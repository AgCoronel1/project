import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Searcher from './components/Searcher.jsx';
import ResultCard from './components/ResultCard.jsx';
import { mockResults } from './mockData';

function App() {
  const [files, setFiles] = useState([]);
  const [query, setQuery] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    console.log('Accepted files:', acceptedFiles)
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  const rootProps = getRootProps();
  const inputProps = getInputProps();

  const fileList = useMemo(
    () =>
      files.map((file) => (
        <li key={file.name}>
          {file.name} ({Math.round(file.size / 1024)} KB)
        </li>
      )),
    [files]
  );

  return (
    <div className="app">
      <Header />
      <Main />
      <Searcher />

      {files.length > 0 && (
        <div className="file-preview">
          <h2>Selected file</h2>
          <ul>{fileList}</ul>
        </div>
      )}

      {/* Mock data for ResultCard */}
      <div className="result-container">
        {mockResults.map((result, index) => (
          <ResultCard
            key={index}
            title={result.title}
            description={result.description}
          />
        ))}
      </div>

      {/* File Upload Error Handling */}
      {files.length === 0 && (
        <p className="text-gray-500">No file selected. Drag & drop a PDF file here, or click to select one.</p>
      )}

      {/* File Deletion Button */}
      {files.length > 0 && (
        <button
          onClick={() => setFiles([])}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete File
        </button>
      )}
    </div>
  )
}

export default App