import React, { useState } from 'react';

   const Main = () => {
     const [file, setFile] = useState(null);
     const [error, setError] = useState(null);

     const handleDrop = (event) => {
       event.preventDefault();
       const droppedFiles = event.dataTransfer.files;
       if (droppedFiles.length > 0) {
         const file = droppedFiles[0];
         if (file.type === 'application/pdf') {
           setFile(file);
         } else {
           setError('Only PDF files are allowed');
         }
       }
     };

     const handleFileChange = (event) => {
       const selectedFile = event.target.files[0];
       if (selectedFile && selectedFile.type === 'application/pdf') {
         setFile(selectedFile);
       } else {
         setError('Only PDF files are allowed');
       }
     };

     return (
       <main className="flex flex-col items-center justify-center h-full py-12">
         {file ? (
           <>
             <div className="text-lg font-bold">Uploaded: {file.name}</div>
             <button
               onClick={() => setFile(null)}
               className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
             >
               Remove
             </button>
           </>
         ) : (
           <>
             <input
               type="file"
               accept=".pdf"
               onChange={handleFileChange}
               className="p-4 border-dashed border-2 border-gray-300 rounded"
               onDragOver={(e) => e.preventDefault()}
               onDrop={handleDrop}
             />
             {error && <div className="text-red-500 mt-2">{error}</div>}
           </>
         )}
       </main>
     );
   };

   export default Main;