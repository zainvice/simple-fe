import React, { useState } from 'react';

const MainDash = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: 'Wednesday, 20th October',
      time: '11 AM - 12 PM',
      type: 'Online Appointment',
      doctorName: 'Dr. Adam Cooper',
      doctorImage: 'https://via.placeholder.com/50', // Placeholder for doctor image
    },
    {
      id: 2,
      date: 'Wednesday, 20th October',
      time: '11 AM - 12 PM',
      type: 'Online Appointment',
      doctorName: 'Dr. Adam Cooper',
      doctorImage: 'https://via.placeholder.com/50',
    },
    // Add more appointments as needed
  ]);

  const [favoriteDoctors, setFavoriteDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Adam Cooper',
      qualification: 'MBBS',
      university: 'California State University',
      rating: 4.8,
      doctorImage: 'https://via.placeholder.com/100', // Placeholder for doctor image
    },
    {
      id: 2,
      name: 'Dr. Adam Cooper',
      qualification: 'MBBS',
      university: 'California State University',
      rating: 4.8,
      doctorImage: 'https://via.placeholder.com/100',
    },
    // Add more favorite doctors as needed
  ]);

  const handleBookNewAppointment = () => {
    // Implement functionality to book a new appointment here
    console.log('Redirect to booking page');
  };

  return (
    <div className="p-6 mx-8 bg-white">
      {/* Upcoming Appointments Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-green-600">Upcoming Appointments</h2>
          <button
            onClick={handleBookNewAppointment}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            + Book New Appointment
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center">
              <div>
                <h3 className="text-lg font-semibold">{appointment.date}</h3>
                <p>{appointment.time}</p>
                <p className="text-gray-500">{appointment.type}</p>
              </div>
              <div className="ml-auto flex items-center">
                <img
                  src={appointment.doctorImage}
                  alt="Doctor"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div className="text-right">
                  <p className="text-sm font-semibold">{appointment.doctorName}</p>
                  <button className="mt-2 px-3 py-1 text-sm text-green-600 border border-green-600 rounded-lg">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Favorite Doctors Section */}
      <div>
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Favorite Doctors</h2>
        <div className="grid grid-cols-4 gap-4">
          {favoriteDoctors.map((doctor) => (
            <div key={doctor.id} className="p-4 bg-gray-100 rounded-lg shadow-md text-center">
              <img
                src={doctor.doctorImage}
                alt="Doctor"
                className="w-16 h-16 rounded-full mx-auto mb-2"
              />
              <h3 className="text-lg font-semibold">{doctor.name}</h3>
              <p className="text-sm">{doctor.qualification}</p>
              <p className="text-sm text-gray-500">{doctor.university}</p>
              <div className="flex justify-center items-center mt-2">
                <span className="text-yellow-500 text-lg">⭐ {doctor.rating}</span>
              </div>
              <button className="mt-2 px-4 py-1 text-sm text-white bg-green-500 rounded-lg">
                Schedule Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainDash;
