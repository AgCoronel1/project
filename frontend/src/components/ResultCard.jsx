import React from 'react';

const ResultCard = ({ title, description }) => {
  return (
    <div className="result-card p-4 border rounded bg-white shadow hover:shadow-lg cursor-pointer">
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Ver Página
      </button>
    </div>
  );
};

export default ResultCard;