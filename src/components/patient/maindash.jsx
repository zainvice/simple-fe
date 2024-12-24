import React, { useState } from 'react';
import AppointmentCard from '../../common/patient/appointmentcard';
import DoctorCard from '../../common/patient/doctorcard';
import Button from '../../common/patient/button';

const MainDash = ({handleNewAppointmentOpen, handleViewAppointmentOpen, appointments}) => {

  const [favoriteDoctors, setFavoriteDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Adam Cooper',
      type: 'Dermatologist, Cosmetologist',
      specialization: 'M.B.B.S., F.C.P.S. (Dermatology)',
      rating: 4.8,
      doctorImage: 'https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png', 
      reviews: [
        {name: '', review: ''},
        {name: '', review: ''},
        {name: '', review: ''},
        {name: '', review: ''},
        {name: '', review: ''},

      ],
      features: 'New Patient Appointments . Excellent wait time . Highly Recommended',
      location: '1.2 mil - ABC Health Partners - 6746 Charlotte Pike, San Antonio, California ',
    },
    {
      id: 2,
      name: 'Dr. Adam Cooper',
      type: 'Dermatologist, Cosmetologist',
      specialization: 'M.B.B.S., F.C.P.S. (Dermatology)',
      rating: 4.8,
      doctorImage: 'https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png',
      reviews: [
        {name: '', review: ''},
        {name: '', review: ''},
        {name: '', review: ''},
        {name: '', review: ''},
        {name: '', review: ''},

      ],
      features: 'New Patient Appointments . Excellent wait time . Highly Recommended',
      location: '1.2 mil - ABC Health Partners - 6746 Charlotte Pike, San Antonio, California ',
    },
    
  ]);

  const handleBookNewAppointment = () => {

    console.log('Redirect to booking page');
  };

  return (
    <div className="p-6 mt-8 mx-2 border4 lg:mx-8 bg-white shadow-md rounded-[10px] max-h-[84%] overflow-y-auto">
      {/* Upcoming Appointments Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="lg:text-2xl text-xl font-semibold text-[#1EBDB8]">Upcoming Appointments</h2>
            <Button icon={'add'} text={'Book New Appointment'} onClick={(e)=> window.location.href = `/patient/explore`}/>
            
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
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 overflow-y-auto">
          {favoriteDoctors.map((doctor) => (
            <DoctorCard doctor={doctor} schedule={handleNewAppointmentOpen} fav={true}  />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainDash;
