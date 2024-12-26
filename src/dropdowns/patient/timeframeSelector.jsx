import React from "react";

const TimeframeSelector = ({ timeframe, handleTimeframeChange }) => {
  return (
    <div className="absolute -bottom-[480%] -left-14 bg-white rounded-[10px] text-[#1E232F] w-[300px] px-4 py-2 h-[200px] border-2 text-left overflow-y-auto">
      <div className="dropdown-options" role="listbox">
        <p className="text-[#888888] mb-2">What’s your preferred timeframe?</p>
        
        <div className="flex">
          <input
            type="radio"
            name="preferredTimeline"
            id="flexible"
            className="-mt-10"
            checked={timeframe === "flexible"}  
            onChange={() => handleTimeframeChange("timeframe", "flexible")}
          />
          <div className="ml-2">
            <p className="font-semibold text-md">I'm flexible</p>
            <p className="text-sm text-gray-600">
              We’ll show you providers who best match your search criteria
            </p>
          </div>
        </div>

        <div className="flex">
          <input
            type="radio"
            name="preferredTimeline"
            id="asap"
            className="-mt-10"
            checked={timeframe === "asap"}  
            onChange={() => handleTimeframeChange("timeframe", "asap")}
          />
          <div className="ml-2">
            <p className="font-semibold text-md">ASAP</p>
            <p className="text-sm text-gray-600">
              We’ll show you providers who can see you soonest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeframeSelector;
