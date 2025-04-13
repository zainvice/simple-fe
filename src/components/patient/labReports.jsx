import React, { useState } from 'react';
import DoctorCard from '../../common/patient/doctorcard';
import Button from '../../common/button';

const LabReports = ({labReports}) => {

  

  const handleBookNewAppointment = () => {

    console.log('Redirect to booking page');
  };

  return (
    <div className="p-6 mt-8 mx-2 border4 lg:mx-8 bg-white shadow-md rounded-[10px] max-h-[84%] min-h-[84%] overflow-y-auto">
      {/* Upcoming Appointments Section */}
      

      {/* LabReport Doctors Section */}
      
        {labReports?.length > 0 ? 
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 overflow-y-auto">
            {labReports.map((report) => (
              <DoctorCard />
            ))}
          </div>
          :
          <div className='flex w-full text-center h-full justify-center items-center '>
              <p className='font-semibold text-xl text-[#1EBDB8] m-auto my-8'>Your lab reports and precriptions will show up here!</p> 
          </div>
        }
      
    </div>
  );
};

export default LabReports;
