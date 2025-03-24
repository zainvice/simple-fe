import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaRegCalendarAlt } from "react-icons/fa";

const Favorites = () => {
  // Simulating dynamic data fetching
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call to fetch favorite appointments
    setTimeout(() => {
      setFavorites([
        {
          id: 1,
          date: "Wednesday, 20th October",
          time: "11 AM - 12 PM",
          type: "Video Appointment",
          status: "Booked",
          doctor: "Dr. Adam Cooper",
          specialty: "Dermatologist, Cosmetologist",
        },
        {
          id: 2,
          date: "Wednesday, 20th October",
          time: "11 AM - 12 PM",
          type: "Video Appointment",
          status: "Booked",
          doctor: "Dr. Adam Cooper",
          specialty: "Dermatologist, Cosmetologist",
        },
        // Add more favorites dynamically
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-teal-600">Favorites</h2>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg">
          <FaRegCalendarAlt /> Book New Appointment
        </Button>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Scheduled Appointments</h3>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          favorites.map((fav, index) => (
            <div
              key={fav.id}
              className={`bg-white shadow-md rounded-lg p-4 border-2 ${index === 1 ? "border-purple-500" : "border-transparent"}`}
            >
              <h4 className="text-teal-600 font-bold">{fav.date}</h4>
              <p className="text-gray-600 text-sm">{fav.time}</p>
              <p className="text-gray-500 text-sm font-medium mt-1">{fav.type}</p>
              <p className="text-green-600 text-sm font-semibold mt-1">{fav.status}</p>
              <div className="flex items-center mt-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="ml-2">
                  <p className="text-gray-800 font-medium">{fav.doctor}</p>
                  <p className="text-gray-500 text-xs">{fav.specialty}</p>
                </div>
              </div>
              <Button className="mt-3 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md">View</Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
