import React, { useState } from "react";

const AppointmentOverlay = ({ doctor, onClose, visitReasons }) => {
  
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 h-screen">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative h-[90%] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-medium text-[#1E232F] mb-4">Book an appointment</h2>
        <div className="flex items-center mb-6">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-28 h-28 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-[#1E232F]">{doctor.name}</h3>
            <p className="text-sm  font-medium">{doctor.type}</p>
            <p className="text-sm text-[#333333] whitespace-nowrap">⭐ {doctor.rating} . {doctor?.reviews?.length} reviews</p>
            <p className="text-sm text-[#333333]">{doctor.location}</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-normal font-medium ">
            Scheduling Details
          </label>
          <label className="block text-sm mb-2 text-[#333333]">
            Your selections will help show the right availability
          </label>
          <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-[#1EBDB8]">
            {visitReasons.map((category, categoryIndex) => (
              <optgroup key={categoryIndex} label={category.label}>
                {category.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <h4 className="font-medium text-normal mb-2">Scheduling Details</h4>
          <label className="block text-sm mb-2 text-[#333333]">
              Click a time to book your appointment.
          </label>
            {doctor?.availability?.map((day) => (
              <div key={day.date} className="mb-4">
                <p className="font-semibold text-gray-800">
                  {day.day.slice(0, 3)}, {new Date(day?.date).toLocaleDateString('en-US', {
                                              month: 'short',
                                              day: 'numeric'
                                          })}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {day.availableAppointments.length > 0 ? (
                    day.availableAppointments.map((time, index) => (
                      <button
                        key={index}
                        className="px-4 py-2 bg-[#1EBDB8] border border-[#1EBDB8] text-white text-sm rounded hover:bg-white duration-300 hover:text-[#1EBDB8]"
                      >
                        {time}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No appointments available.</p>
                  )}
                </div>
              </div>
            ))}
        </div>
        <button className="w-full py-2 bg-teal-500 text-white rounded text-sm hover:bg-teal-600">
          Show more availability
        </button>
      </div>
    </div>
  );
};

export default AppointmentOverlay;
