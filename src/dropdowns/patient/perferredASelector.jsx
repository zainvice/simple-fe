import React, { useState } from "react";

const VisitTypeSelector = ({setSearchTerm, searchTerm}) => {
  const [selectedVisit, setSelectedVisit] = useState('');
  const visitOptions = [
    { label: 'In-person and video visits', count: 4842 },
    { label: 'Video visits only', count: 4762 },
    { label: 'In-person visits only', count: 80 },
  ];

  return (
    <div className="absolute -bottom-[380%] left-[38%] bg-white rounded-[10px] w-[250px] text-[#1E232F] px-4 py-2 h-[150px] border-2 text-left overflow-y-auto">
     
      <h3 className="font-semibold">Visit Options</h3>
      {visitOptions.map((option, index) => (
        <div key={index} className="mt-2">
          <input
            type="radio"
            id={`visit-${index}`}
            name="visit"
            value={option.label}
            checked={selectedVisit === option.label}
            onChange={() => setSelectedVisit(option.label)}
          />
          <label htmlFor={`visit-${index}`} className="ml-2">
            {option.label} {/* ({option.count}) */}
          </label>
        </div>
      ))}
    </div>
  );
};

export default VisitTypeSelector;
