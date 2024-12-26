import React, { useState } from 'react';
import AppointmentCard from '../../common/patient/appointmentcard';
import DoctorCard from '../../common/patient/doctorcard';
import Button from '../../common/patient/button';

const MainDash = ({handleNewAppointmentOpen, handleViewAppointmentOpen, appointments, favoriteDoctors}) => {

  

  const handleBookNewAppointment = () => {

    console.log('Redirect to booking page');
  };

  return (
    <div className="p-6 mt-8 mx-2 border4 lg:mx-8 bg-white shadow-md rounded-[10px] max-h-[84%] min-h-[84%] overflow-y-auto">
      {/* Upcoming Appointments Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="lg:text-2xl text-xl font-semibold text-[#1EBDB8]">Upcoming Appointments</h2>
            <Button icon={'add'} text={'Book New Appointment'} onClick={(e)=> window.location.href = `/patient/explore`}/>
            
        </div>
        {appointments?.length > 0 ? 
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
            {appointments.slice(0,3).map((appointment, index) => (
              <AppointmentCard appointment={appointment} index={index} view={handleViewAppointmentOpen}/>
            ))}
          </div>
        :
          <div className='flex w-full text-center'>
                <img src="https://i.gifer.com/4Snj.gif" alt="hello" /> <p className='font-semibold text-3xl text-[#1EBDB8] m-auto'>WELCOME ABOARD, START BOOKING APPOINTMENTS</p> 
          </div>
        }
      </div>

      {/* Favorite Doctors Section */}
      <div>
        <h2 className="lg:text-2xl text-xl font-semibold text-[#1EBDB8] mb-4">Favorite Providers</h2>
        {favoriteDoctors?.length > 0 ? 
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 overflow-y-auto">
            {favoriteDoctors.map((doctor) => (
              <DoctorCard doctor={doctor} schedule={handleNewAppointmentOpen} fav={true}  />
            ))}
          </div>
          :
          <div className='flex w-full text-center'>
               <img src="https://i.pinimg.com/originals/ae/47/c6/ae47c6219b5ef4793bc6d9cb7a113998.gif" alt="hello" className='w-60 h-60'/> <p className='font-semibold text-3xl text-[#1EBDB8] m-auto'>NO FAVORITES YET</p> 
          </div>
        }
      </div>
    </div>
  );
};

export default MainDash;
