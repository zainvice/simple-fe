import React from 'react';

const SetRateOverlay = ({ setNewRate, handleRateSubmit, setShowRateOverlay, newRate }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md transform transition-all duration-300 scale-100">
        <h2 className="text-2xl font-bold text-[#1EBDB8] mb-5 text-center">Set Your Hourly Rate</h2>
        
        <div className="relative mb-6">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">$</span>
          <input
            type="number"
            value={newRate}
            onChange={(e) => setNewRate(e.target.value)}
            className="w-full pl-8 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1EBDB8] text-gray-700 text-base shadow-sm transition duration-200"
            placeholder="e.g. 75"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowRateOverlay(false)}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={handleRateSubmit}
            className="px-4 py-2 rounded-lg bg-[#1EBDB8] text-white font-semibold hover:bg-[#159e99] transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetRateOverlay;
