import React from "react";
import AppointmentCard from "../common/appointmentcard";
import Button from "../common/button";


const Appointments = ( {handleNewAppointmentOpen, handleViewAppointmentOpen, appointments}) => {
  

  return (
    <div className="p-4 mx-8">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-[#1EBDB8]">Scheduled Appointments</h1>
        <Button icon={'add'} text={'Book New Appointment'} onClick={handleNewAppointmentOpen}/>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map((appointment, index) => (
          <AppointmentCard index={index} appointment={appointment} view={handleViewAppointmentOpen}/>
        ))}
      </div>
      
    </div>
  );
};

export default Appointments;
