import React, {useState} from "react";
import { updateAppointment } from "../../api/api";

import Spinner from "../../common/spinner";
import LeaveReviewOverlay from "../leaveReviewOverlay";

const ViewAppointmentOverlayP = ({ onClose, appointment, findVisitReason }) => {

  const [appointmentToModify, setAppointmentToModify] = useState(appointment);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reviewOverlayOpen, setReviewOverlayOpen] = useState(false)

  // derive completed flag
  const isCompleted = appointmentToModify.providerDetails?.status === 'completed';

  const toggleReviewOverlay = () => {
    setReviewOverlayOpen(!reviewOverlayOpen)
  }


  // handle toggle flip
  const handleToggle = (next) => {
    // ensure providerDetails exists
    const pd = appointmentToModify.providerDetails || {};
    pd.status = next ? 'completed' : undefined;

    setAppointmentToModify({
      ...appointmentToModify,
      providerDetails: pd,
    });
  };

  console.log(appointment)
  // stub: save to backend
  const onSave = async() => {
    // e.g. fetch('/api/update-appointment', { method: 'POST', body: JSON.stringify(appointmentToModify) })
    setIsSaving(true);
    setSaveError(null);
    const updatedAppointment = { ...appointmentToModify };

    const isPatientDone = updatedAppointment.patientDetails?.status === 'completed';
    const isProviderDone = updatedAppointment.providerDetails?.status === 'completed';
  
    if (isPatientDone && isProviderDone) {
      updatedAppointment.status = 'Completed';
    }


    try {
        await updateAppointment(updatedAppointment._id, updatedAppointment);
        setShowSuccessPopup(true);
        setIsSaving(false)
        setTimeout(() => setShowSuccessPopup(false), 2000); 
    } catch (error) {
        console.error("error", error)
        setIsSaving(false)
        setSaveError("⚠️ Server error. Please try again.");
    }
    console.log('Saving appointment:', appointmentToModify);
  };
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
        case 'Completed':
            const message = appointment.providerDetails?.review ? 'Appointment Completed' :  'Leave a review'
            return message; 
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

  const handleActionButtonClick = (status, email) => {
    switch (status) {
        case 'Booked':
         
            {
              const emailParam = encodeURIComponent(email); 
              if(emailParam && emailParam !== 'undefined'){
                const currentUrl = `/provider/chats?email=${emailParam}`; 

                window.location.href = currentUrl;
              }
            };
            break;
        case 'Completed':
         
            toggleReviewOverlay();
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
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
       {reviewOverlayOpen && <LeaveReviewOverlay appointment={appointment} onClose={onClose} side={'provider'}/>}
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-lg relative">
        <button className="absolute top-6 left-4 text-gray-600" onClick={onClose}>
          <span className="material-symbols-outlined text-[#1EBDB8]">chevron_left</span>
        </button>
        {showSuccessPopup && (
        <div className="fixed top-20 right-10 bg-[#1EBDB8] text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slideIn">
          Appointment Status Updated!
        </div>
      )}
        {appointment.status !== 'Cancelled' && appointment.status !== 'Completed' &&
                <button 
                  onClick={onSave}
                  className="absolute top-6 right-4 text-gray-600 px-4 flex py-4 bg-[#1EBDB8] text-white rounded-full items-center"
                  title="Save"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Spinner/>
                  ) : (
                    <span className="material-symbols-outlined my-auto">save</span>
                  )}
                </button> 
        }
        <h2 className="text-center text-lg font-semibold text-[#1EBDB8]">{appointment.date && new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'})}</h2>

        <div className="flex flex-col items-center mt-4">
          <img
            src={appointment?.patientDetails?.avatar} 
            alt="PatientDetails"
            className="w-20 h-20 rounded-full mb-3"
          />
          <h3 className="text-2xl font-semibold text-gray-700">{appointment?.patientDetails?.name}</h3>
          <p className="text-gray-500">{appointment?.patientDetails?.email}</p>
          <span className="text-[#1EBDB8] text-sm font-medium ">{appointment?.schedulingDetails?.patientType?.toUpperCase()} PATIENT</span>
          {appointment.status === 'Completed' && appointment.providerDetails?.review && (
            <div className="text-center mt-2">
             
              <div className="flex justify-center ">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={i < appointment.providerDetails.review.rating ? '#FBBF24' : 'none'}
                    viewBox="0 0 24 24"
                    stroke="#FBBF24"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.02 6.21a1 1 0 00.95.69h6.462c.969 0 1.371 1.24.588 1.81l-5.233 3.8a1 1 0 00-.364 1.118l2.02 6.21c.3.921-.755 1.688-1.54 1.118l-5.233-3.8a1 1 0 00-1.176 0l-5.233 3.8c-.784.57-1.838-.197-1.539-1.118l2.02-6.21a1 1 0 00-.364-1.118l-5.233-3.8c-.784-.57-.38-1.81.588-1.81h6.462a1 1 0 00.95-.69l2.02-6.21z"
                    />
                  </svg>
                ))}
              </div>
              <p className="text-yellow-500 mt-2 font-bold">
                Rated {appointment.providerDetails.review.rating} Star{appointment.providerDetails.review.rating > 1 ? 's' : ''}
              </p>
              <span className='text-gray-600 text-sm italic'>"{appointment.patientDetails?.review?.comment}"</span>
            </div>
          )}
        </div>
        {appointment.status !== 'Cancelled' && appointment.status !== 'Completed'  &&  <CompleteToggle isCompleted={isCompleted} onToggle={handleToggle} />}
        {appointment.patientDetails.status==='completed' && appointment.providerDetails.status!=='completed' && <p className="text-center bg-[#1EBDB8] text-white rounded-full px-2 py-1 my-2">Appointment was marked completed by your patient.</p>}
        {appointment.providerDetails.status==='completed' && appointment.patientDetails.status!=='completed' && <p className="text-center bg-[#1EBDB8] text-white rounded-full px-2 py-1 my-2">Appointment was marked completed by you.</p>}

        {appointment.providerDetails.status==='completed' && appointment.patientDetails.status==='completed' && appointment.status !== 'Completed' && <p className="text-center bg-[#1EBDB8] text-white rounded-full px-2 py-1 my-2">Warning: this action will complete current appointment and trigger review process.</p>}
        <div className="bg-[#1EBDB8] text-white rounded-lg p-4 mt-6">
          <div className="flex justify-between">
            <p>Status:</p>
            <p className={`${getStatusColor(appointment.status)} font-semibold bg-white px-2 rounded-full`}>
                {appointment.status}
            </p>
          </div>
          <div className="flex justify-between mt-2">
            <p>Visit Reason:</p>
            <p className={`font-semibold`}>
                {findVisitReason(appointment?.schedulingDetails?.visitReason)}
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
              onClick={() => handleActionButtonClick(appointment.status, appointment?.patientDetails?.email)}
              disabled={appointment.status === 'Cancelled' || appointment.status === 'Pending'}
            >
              {getActionButtonText(appointment.status)}
            </button>
          </div>
          {appointment.status !== 'Cancelled' && appointment.status !== 'Completed' &&
            <div className="mt-2 flex w-full justify-center rounded-[20px] hover:bg-white hover:text-[#1EBDB8] transition-all duration-300 border shadow-md">
              <button 
                className={`w-full p-2 text-center font-semibold ${appointment.status === 'Cancelled' ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={() => {
                  window.open(
                    'https://zoom.us/start/videomeeting',
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
                disabled={appointment.status === 'Cancelled' || appointment.status === 'Pending'}
              >
                Consult over zoom
              </button>
            </div>
          }
        </div>
        
     
      </div>
    </div>
  );
};

export default ViewAppointmentOverlayP;

const CompleteToggle = ({ isCompleted, onToggle }) => (
  <div className="flex items-center justify-center space-x-3">
    <span className="font-medium text-gray-700">
      {isCompleted ? 'Completed' : 'Mark as Completed'}
    </span>
    <button
      onClick={() => onToggle(!isCompleted)}
      className={`
        relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1EBDB8]
        ${isCompleted ? 'bg-[#1EBDB8]' : 'bg-gray-300'}
      `}
      aria-pressed={isCompleted}
    >
      <span
        className={`
          inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition-transform
          ${isCompleted ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  </div>
);
