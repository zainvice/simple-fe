import React from "react";
import AppointmentCard from "../../common/patient/appointmentcard";
import Button from "../../common/patient/button";


const Appointments = ( {handleNewAppointmentOpen, handleViewAppointmentOpen, appointments}) => {
  

  return (
    <div className="p-6 bg-white shadow-md rounded-[10px] mt-8 mx-8 overflow-y-auto max-h-[84%]">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-[#1EBDB8]">Scheduled Appointments</h1>
        <Button icon={'add'} text={'Book New Appointment'} onClick={(e)=> window.location.href = `/patient/explore`}/>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[50%] overflow-y-auto ">
        {appointments.map((appointment, index) => (
          <AppointmentCard index={index} appointment={appointment} view={handleViewAppointmentOpen}/>
        ))}
      </div>
      <div className='w-full h-[1px] rounded-full bg-gray-300 mb-4'></div>
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-semibold text-[#1EBDB8]">Completed Appointments</h1>
       
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[50%] overflow-y-auto">
        {appointments.map((appointment, index) => (
          <AppointmentCard index={index} appointment={appointment} view={handleViewAppointmentOpen}/>
        ))}
      </div>
      
    </div>
  );
};

export default Appointments;
