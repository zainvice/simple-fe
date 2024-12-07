import React, { useState } from 'react';
import AppointmentCard from '../common/appointmentcard';
import DoctorCard from '../common/doctorcard';
import Button from '../common/button';

const MainDash = ({handleNewAppointmentOpen, handleViewAppointmentOpen, appointments}) => {

  const [favoriteDoctors, setFavoriteDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Adam Cooper',
      qualification: 'Dermatologist, Cosmetologist',
      university: 'M.B.B.S., F.C.P.S. (Dermatology)',
      rating: 4.8,
      doctorImage: 'https://via.placeholder.com/100', 
      reviews: [
        {name: '', review: ''},
        {name: '', review: ''},
        {name: '', review: ''},
        {name: '', review: ''},
        {name: '', review: ''},

      ],
      features: 'New Patient Appointments . Excellent wait time . Highly Recommended'
    },
    {
      id: 2,
      name: 'Dr. Adam Cooper',
      qualification: 'Dermatologist, Cosmetologist',
      university: 'M.B.B.S., F.C.P.S. (Dermatology)',
      rating: 4.8,
      doctorImage: 'https://via.placeholder.com/100',
      reviews: [
        {name: '', review: ''},
        {name: '', review: ''},
        {name: '', review: ''},
        {name: '', review: ''},
        {name: '', review: ''},

      ],
      features: 'New Patient Appointments . Excellent wait time . Highly Recommended'
    },
    
  ]);

  const handleBookNewAppointment = () => {
    // Implement functionality to book a new appointment here
    console.log('Redirect to booking page');
  };

  return (
    <div className="p-4 mx-2 border4 lg:mx-8 bg-white overflow-y-auto">
      {/* Upcoming Appointments Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="lg:text-2xl text-xl font-semibold text-[#1EBDB8]">Upcoming Appointments</h2>
            <Button icon={'add'} text={'Book New Appointment'} onClick={handleNewAppointmentOpen}/>
            
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          {appointments.slice(0,3).map((appointment, index) => (
            <AppointmentCard appointment={appointment} index={index} view={handleViewAppointmentOpen}/>
          ))}
        </div>
      </div>

      {/* Favorite Doctors Section */}
      <div>
        <h2 className="lg:text-2xl text-xl font-semibold text-[#1EBDB8] mb-4">Favorite Doctors</h2>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          {favoriteDoctors.map((doctor) => (
            <DoctorCard doctor={doctor} schedule={handleNewAppointmentOpen}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainDash;
