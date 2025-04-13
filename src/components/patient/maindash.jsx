import React, { useState } from 'react';
import AppointmentCard from '../../common/patient/appointmentcard';
import DoctorCard from '../../common/patient/doctorcard';
import Button from '../../common/button';
import ClipLoader from 'react-spinners/ClipLoader';

const MainDash = ({handleNewAppointmentOpen, loading, handleViewAppointmentOpen, user, appointments, favoriteDoctors}) => {



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
        :(
          <>
          {loading ? (
               <div className='flex w-full h-full justify-center py-20 items-center'>
                  <ClipLoader
                    color={'#1EBDB8'}
                    
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
              </div>
          ): (
            <div className='flex flex-col h-full w-full space-y-4 py-12 items-center justify-center text-center'>
                  <p className='font-semibold text-3xl text-[#1EBDB8] m-auto'>WELCOME TO SIMPLE <br/> <span className='text-xl'>START BOOKING APPOINTMENTS</span></p> 
                  <Button  text={'Book Now'} onClick={(e)=> window.location.href = `/patient/explore`}/>
            </div>
          )}
          </>
        )}
      </div>

      {/* Favorite Doctors Section */}
      <div>
        <h2 className="lg:text-2xl text-xl font-semibold text-[#1EBDB8] mb-4">Favorite Providers</h2>
        {favoriteDoctors?.length > 0 ? 
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 overflow-y-auto">
            {favoriteDoctors.map((doctor) => (
              <DoctorCard doctor={doctor} schedule={handleNewAppointmentOpen} fav={true}  user={user}/>
            ))}
          </div>
          :(
          
            <>
            {loading ? (
               <div className='flex w-full h-full py-20 justify-center items-center'>
                  <ClipLoader
                    color={'#1EBDB8'}
                    
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
              </div>
            ): (
              <div className='flex w-full text-center my-12'>
                  <p className='font-semibold text-xl text-[#1EBDB8] m-auto my-8'>Your favorite providers will show up here!</p> 
              </div>
            )}
            </>
         
        )}
      </div>
    </div>
  );
};

export default MainDash;
