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

    {appointments.filter(appointment=>  appointment.status !== 'Completed' && appointment.status !== 'Cancelled' ).length > 0 ?
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
        {appointments
          .filter(appointment => appointment.status !== 'Completed' && appointment.status !== 'Cancelled')
          .map((appointment, index) => (
            <AppointmentCard key={index} index={index} appointment={appointment} view={handleViewAppointmentOpen} />
          ))}
      </div>
       :
       <div className='flex w-full text-center'>
             <p className='font-semibold text-xl text-[#1EBDB8] m-auto my-8'>NO SCHEDULED APPOINTMENTS YET</p> 
       </div>
     }

      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-semibold text-[#1EBDB8]">Completed Appointments</h1>
       
      </div>
      {appointments.filter(appointment=> appointment.status === 'Completed' ).length > 0 ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
          {appointments.filter(appointment=> appointment.status === 'Completed').map((appointment, index) => (
            <AppointmentCard index={index} appointment={appointment} view={handleViewAppointmentOpen}/>
          ))}
        </div>
        :
        <div className='flex w-full text-center'>
              <p className='font-semibold text-xl text-[#1EBDB8] m-auto my-8'>NO COMPLETED APPOINTMENTS YET</p> 
        </div>
      }
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-semibold text-[#1EBDB8]">Cancelled Appointments</h1>
       
      </div>
      {appointments.filter(appointment=> appointment.status === 'Cancelled').length > 0 ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
          {appointments.filter(appointment=> appointment.status === 'Cancelled').map((appointment, index) => (
            <AppointmentCard index={index} appointment={appointment} view={handleViewAppointmentOpen}/>
          ))}
        </div>
        :
        <div className='flex w-full text-center'>
              <p className='font-semibold text-3xl text-[#1EBDB8] m-auto'>NO COMPLETED APPOINTMENTS YET</p> 
        </div>
      }
      
    </div>
  );
};

export default Appointments;
