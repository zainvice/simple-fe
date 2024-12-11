import React, { useState } from "react";

const ProviderDetails = ({ doctor }) => {
  const [selectedTab, setSelectedTab] = useState("New Patient");
  const [availability, setAvailability] = useState({
    "Fri Dec 13": ["No appts"],
    "Sat Dec 14": ["4 appts"],
    "Sun Dec 15": ["4 appts"],
    "Mon Dec 16": ["4 appts"],
    "Tue Dec 17": ["4 appts"],
    "Wed Dec 18": ["4 appts"],
  });

  return (
    <div className="p-6 bg-teal-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg grid grid-cols-3 gap-6 p-6">
        {/* Left Column */}
        <div className="col-span-1 border-r border-gray-200">
          <div className="flex items-center mb-4">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <p className="text-sm text-gray-500">{doctor.speciality}</p>
              <p className="text-sm text-red-500">{doctor.status}</p>
            </div>
          </div>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              <strong>Highlights:</strong>
            </li>
            <li>✔️ Highly recommended</li>
            <li>✔️ Excellent wait time</li>
            <li>✔️ New patient appointments available</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="col-span-2">
          <h3 className="text-lg font-bold mb-2">Book an appointment on Simple</h3>
          <p className="text-sm text-gray-500 mb-4">
            The office partners with Simple to schedule appointments.
          </p>

          {/* Scheduling Details */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Scheduling details
            </label>
            <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300">
              <option>New Patient Visit</option>
              <option>Follow-Up Visit</option>
            </select>
          </div>

          {/* Tab Navigation */}
          <div className="flex mb-4">
            <button
              className={`w-1/2 py-2 text-center ${
                selectedTab === "New Patient"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-700"
              } rounded-l-lg`}
              onClick={() => setSelectedTab("New Patient")}
            >
              New Patient
            </button>
            <button
              className={`w-1/2 py-2 text-center ${
                selectedTab === "Returning Patient"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-700"
              } rounded-r-lg`}
              onClick={() => setSelectedTab("Returning Patient")}
            >
              Returning Patient
            </button>
          </div>

          {/* Availability */}
          <div>
            <h4 className="text-md font-bold mb-2">Today, Dec 13 – Thu, Dec 26</h4>
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(availability).map((date) => (
                <div
                  key={date}
                  className="p-4 bg-gray-100 text-center rounded-lg shadow-sm"
                >
                  <p className="text-sm font-medium">{date}</p>
                  {availability[date].map((appt, index) => (
                    <p
                      key={index}
                      className={`text-sm mt-2 ${
                        appt === "No appts"
                          ? "text-red-500"
                          : "text-teal-600 font-semibold"
                      }`}
                    >
                      {appt}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* View More */}
          <button className="mt-4 w-full py-2 bg-teal-500 text-white rounded text-sm hover:bg-teal-600">
            View more availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;
