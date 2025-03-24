import React, { useState, useEffect } from "react";

const HistoryScreen = () => {
  // Mock data (Replace with API fetch later)
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Simulating API response
    setAppointments([
      {
        id: 1,
        date: "Wednesday, 20th October",
        time: "11 AM - 12 PM",
        type: "Video Appointment",
        status: "Booked",
        doctor: "Dr. Adam Cooper",
        specialty: "Dermatologist, Cosmetologist",
      },
      // Duplicate for now, replace with real data later
      { id: 2, date: "Wednesday, 20th October", time: "11 AM - 12 PM", type: "Video Appointment", status: "Booked", doctor: "Dr. Adam Cooper", specialty: "Dermatologist, Cosmetologist" },
      { id: 3, date: "Wednesday, 20th October", time: "11 AM - 12 PM", type: "Video Appointment", status: "Booked", doctor: "Dr. Adam Cooper", specialty: "Dermatologist, Cosmetologist" },
      { id: 4, date: "Wednesday, 20th October", time: "11 AM - 12 PM", type: "Video Appointment", status: "Booked", doctor: "Dr. Adam Cooper", specialty: "Dermatologist, Cosmetologist" },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-teal-600">History</h2>
      <h3 className="text-2xl font-bold mt-2">Scheduled Appointments</h3>
      <div className="flex justify-end mt-4">
        <button className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 flex items-center">
          📅 Book New Appointment
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <h4 className="text-teal-600 font-bold">{appointment.date}</h4>
            <p className="text-gray-600">{appointment.time}</p>
            <p className="font-semibold text-gray-800 mt-2">{appointment.type}</p>
            <span className="text-teal-500 font-semibold">{appointment.status}</span>
            <div className="mt-3 flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="ml-3">
                <p className="font-semibold">{appointment.doctor}</p>
                <p className="text-gray-500 text-sm">{appointment.specialty}</p>
              </div>
            </div>
            <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg w-full hover:bg-teal-600">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryScreen;
