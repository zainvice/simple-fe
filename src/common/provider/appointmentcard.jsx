import React from 'react';
import Button from '../button';

function AppointmentCardP({index, appointment, view}) {

    const getStatusColor = (status) => {
        switch (status) {
            case 'Booked':
                return 'text-green-500';  
            case 'Payment Failed':
                return 'text-red-500';    
            case 'Pending':
                return 'text-yellow-500'; 
            case 'Cancelled':
                return 'text-gray-500';   
            default:
                return 'text-gray-500';   
        }
    };

    return (
        <div
            key={index}
            className="bg-white shadow-md rounded-[20px] shadow-lg py-8 px-4 border poppins relative"
        >
             <div className="flex items-center  justify-between">
                <div className='flex '>
                    <img
                        src={appointment?.patientDetails?.avatar} 
                        alt="Patient"
                        className="w-12 h-12 rounded-full mr-3"
                    />
                   <div className='flex flex-col mt-2'>
                    <span className="text-[#1EBDB8] text-sm font-semibold ">{appointment?.patientDetails?.name}</span>
                    <span className="text-[#707271] text-xs font-medium ">{appointment?.patientDetails?.email}</span>
                   </div>
                </div>
                <div className=''>
                    <Button text={'View'} onClick={(e)=>view(appointment)} />
                </div>
            </div>
            <h2 className="text-[22px]   mt-6 font-semibold text-[#1EBDB8]">{appointment.date && new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'})}</h2>
            <p className="text-gray-500 font-semibold">{appointment.time}</p>
            <p className="text-gray-500">{appointment.type}</p>
  
            <p className={`${getStatusColor(appointment.status)} font-semibold`}>
                {appointment.status}
            </p>
            {appointment.status === 'Completed' && appointment.patientDetails?.review &&  <p className="text-yellow-500 bottom-4 right-4 absolute text-center font-bold mt-2 flex-col flex"><span>Rated {appointment.patientDetails?.review?.rating} stars. </span></p>}

           
        </div>
    );
}

export default AppointmentCardP;
