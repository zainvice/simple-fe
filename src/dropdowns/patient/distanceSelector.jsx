import React, { useEffect, useState } from "react";

const DistanceSelector = ({setSearchTerm, searchTerm}) => {
  const [selectedRange, setSelectedRange] = useState('');
  const milesOptions = [
    { label: '0.5 mile', count: 228 },
    { label: '1 mile', count: 232 },
    { label: '5 miles', count: 299 },
    { label: '10 miles', count: 401 },
    { label: '25 miles', count: 502 },
    { label: '50 miles', count: 742 },
  ];

  return (
    <div className="absolute -bottom-[380%] left-[25%] bg-white rounded-[10px] w-[250px] text-[#1E232F] px-4 py-2 h-[150px] border-2 text-left overflow-y-auto">
      <h3 className="font-semibold">Distance</h3>
      {milesOptions.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`miles-${index}`}
            name="miles"
            value={option.label}
            checked={selectedRange === option.label}
            onChange={() => setSelectedRange(option.label)}
          />
          <label htmlFor={`miles-${index}`} className="ml-2"> 
            {option.label} {/* ({option.count}) */}
          </label>
        </div>
      ))}
    </div>
  );
};

export default DistanceSelector;
