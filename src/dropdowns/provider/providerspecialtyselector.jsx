import React, { useState } from "react";

const ProviderPracticesDropdown = ({ practices, selectedItems, setSelectedItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (value) => {
    setSelectedItems((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else if (prev.length < 3) {
        return [...prev, value];
      }
      return prev; 
    });
  };

  return (
    <div className="relative w-full mt-2">
      
      <button
        className="w-full p-3 bg-[#F5F5F5] rounded-[10px] text-left"
        onClick={toggleDropdown}
      >
        {selectedItems.length > 0
          ? selectedItems.join(", ")
          : <p className="w-full flex justify-between"> <span>Select </span> <span className="material-symbols-outlined">keyboard_arrow_down</span></p>}
      </button>


      {isOpen && (
        <div
          className="absolute z-10 mt-1 w-full max-h-60 px-4 py-2 overflow-y-auto border border-gray-300 bg-white rounded shadow-md"
        >
          {practices.map((practice, index) => (
            <div key={index} className="p-2 ">
              {/* Main Practice Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={practice.name}
                  checked={selectedItems.includes(practice.name)}
                  onChange={() => handleCheckboxChange(practice.name)}
                  className="form-checkbox"
                />
                <span>{practice.name}</span>
              </label>

              {practice.subtypes.length > 0 && (
                <div className="ml-6 mt-1 ">
                  {practice.subtypes.map((subtype, subIndex) => (
                    <label
                      key={`${index}-${subIndex}`}
                      className="flex items-center gap-2 p-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={subtype}
                        checked={selectedItems.includes(subtype)}
                        onChange={() => handleCheckboxChange(subtype)}
                        className="form-checkbox"
                      />
                      <span>{subtype}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderPracticesDropdown;
