import React from 'react';
import { useDropzone } from 'react-dropzone';

const App = () => {
  const onDrop = useCallback(acceptedFiles => {
    // Handle file drop logic here
  }, []);

  const {getRootProps, getInputProps} = useDropzone({onDrop});

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Buscador de Manuales Automotores</h1>
      <div {...getRootProps()} className="border-dashed border-2 border-white p-8 rounded-lg w-full max-w-md flex justify-center items-center">
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
};

export default App;