import React, { useEffect, useState } from "react";

const TimeOfDaySelector = ({setSearchTerm, searchTerm}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

 
  const filters = [
    { id: "earlyMorning", label: "Early morning", count: 0, description: "Starts before 10 am" },
    { id: "morning", label: "Morning", count: 0, description: "Starts before 12 pm" },
    { id: "afternoon", label: "Afternoon", count: 0, description: "Starts after 12 pm" },
    { id: "evening", label: "Evening", count: 0, description: "Starts after 5 pm" },
  ];


  const handleCheckboxChange = (id) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="absolute -bottom-[600%] left-10 bg-white rounded-[10px] z-50 text-[#1E232F] w-[300px] px-4 py-2 h-[250px] border-2 text-left overflow-y-auto">
      {filters.map((filter) => (
        <div key={filter.id} style={{ marginBottom: "10px" }}>
          <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={selectedOptions.includes(filter.id)}
              onChange={() => handleCheckboxChange(filter.id)}
              style={{ marginRight: "8px" }}
            />
            <div>
              <strong>{filter.label}</strong> {/* ({filter.count}) */}
              <br />
              <small style={{ color: "#666" }}>{filter.description}</small>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default TimeOfDaySelector;
