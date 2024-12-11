import React, { useState } from "react";

const AppointmentOverlay = ({ doctor }) => {
  const [availability, setAvailability] = useState({
    Mon: ["9:00 am", "10:00 am", "11:00 am"],
    Tue: [],
    Wed: ["9:00 am", "10:00 am", "11:00 am"],
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => console.log("Close Overlay")}
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-4">Book an appointment</h2>
        <div className="flex items-center mb-6">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-bold">{doctor.name}</h3>
            <p className="text-sm text-gray-600">{doctor.speciality}</p>
            <p className="text-sm text-gray-500">{doctor.location}</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Scheduling Details
          </label>
          <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300">
            <option>New Patient Visit</option>
            <option>Follow-Up Visit</option>
          </select>
        </div>
        <div className="mb-6">
          <h4 className="font-medium text-sm mb-2">Scheduling Details</h4>
          {Object.keys(availability).map((day) => (
            <div key={day} className="mb-4">
              <p className="font-semibold text-gray-800">{day}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {availability[day].length > 0 ? (
                  availability[day].map((time, index) => (
                    <button
                      key={index}
                      className="px-4 py-2 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200"
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
