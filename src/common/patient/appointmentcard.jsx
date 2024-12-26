import React from 'react';
import Button from './button';

function AppointmentCard({index, appointment, view}) {

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
            className="bg-white shadow-md rounded-[20px] shadow-lg py-8 px-4 border poppins"
        >
            <h2 className="text-[22px] font-semibold text-[#1EBDB8]">{appointment.date && new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'})}</h2>
            <p className="text-gray-500 font-semibold">{appointment.time}</p>
            <p className="text-gray-500">{appointment.type}</p>
  
            <p className={`${getStatusColor(appointment.status)} font-semibold`}>
                {appointment.status}
            </p>

            <div className="flex items-center mt-6 justify-between">
                <div className='flex mt-4'>
                    <img
                        src={appointment?.providerDetails?.providerAvatar} 
                        alt="Provider"
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <span className="text-[#707271] text-sm font-medium mt-3">{appointment?.providerDetails?.providerName}</span>
                </div>
                <div className='mt-5'>
                    <Button text={'View'} onClick={(e)=>view(appointment)} />
                </div>
            </div>
        </div>
    );
}

export default AppointmentCard;
