import React from 'react';

   const Header = () => {
     return (
       <header className="sticky top-0 bg-white/80 backdrop-blur-lg">
         <div className="container flex items-center justify-between py-4 px-6">
           <h1 className="font-bold">LeeManual</h1>
           <div className="flex space-x-4">
             <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-700 hover:text-gray-900">
               GitHub
             </a>
             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-700 hover:text-gray-900">
               LinkedIn
             </a>
           </div>
         </div>
       </header>
     );
   };

   export default Header;