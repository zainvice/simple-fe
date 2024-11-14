import React from "react";

const ViewAppointmentOverlay = ({ onClose, appointment }) => {

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

  const getActionButtonText = (status) => {
    switch (status) {
        case 'Booked':
            return 'Chat Now'; 
        case 'Payment Failed':
            return 'Retry Payment'; 
        case 'Pending':
            return 'Waiting for Payment';  
        case 'Cancelled':
            return 'Cancelled'; 
        default:
            return 'Unknown Status';
    }
  };

  const handleActionButtonClick = (status) => {
    switch (status) {
        case 'Booked':
         
            console.log("Chat with doctor");
            break;
        case 'Payment Failed':
           
            console.log("Retry payment");
            break;
        case 'Pending':
          
            console.log("Waiting for payment confirmation");
            break;
        case 'Cancelled':
          
            console.log("Appointment is cancelled");
            break;
        default:
            console.log("Unknown status");
            break;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-lg relative">
        <button className="absolute top-6 left-4 text-gray-600" onClick={onClose}>
          <span className="material-symbols-outlined text-[#1EBDB8]">chevron_left</span>
        </button>
        <h2 className="text-center text-lg font-semibold text-[#1EBDB8]">{appointment?.date}</h2>

        <div className="flex flex-col items-center mt-4">
          <img
            src={appointment?.doctor?.avatar} 
            alt="Doctor"
            className="w-20 h-20 rounded-full mb-3"
          />
          <h3 className="text-2xl font-semibold text-gray-700">{appointment?.doctor?.name}</h3>
          <p className="text-gray-500">{appointment?.doctor?.profession}</p>
          <p className="text-yellow-500 mt-1">★ {appointment?.doctor?.rating}/5.0</p>
        </div>

        <div className="bg-[#1EBDB8] text-white rounded-lg p-4 mt-6">
          <div className="flex justify-between">
            <p>Status:</p>
            <p className={`${getStatusColor(appointment.status)} font-semibold bg-white px-2 rounded-full`}>
                {appointment.status}
            </p>
          </div>
          <div className="flex justify-between mt-2">
            <p>Time:</p>
            <p className="font-semibold">{appointment?.time}</p>
          </div>
          <div className="flex justify-between mt-2">
            <p>Type:</p>
            <p className="font-semibold">{appointment?.type}</p>
          </div>

          
          <div className="mt-2 flex w-full justify-center rounded-[20px] hover:bg-white hover:text-[#1EBDB8] transition-all duration-300 border shadow-md">
            <button 
              className={`w-full p-2 text-center font-semibold ${appointment.status === 'Cancelled' ? 'cursor-not-allowed opacity-50' : ''}`}
              onClick={() => handleActionButtonClick(appointment.status)}
              disabled={appointment.status === 'Cancelled' || appointment.status === 'Pending'}
            >
              {getActionButtonText(appointment.status)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointmentOverlay;
