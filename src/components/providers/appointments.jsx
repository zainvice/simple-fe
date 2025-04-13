import React, { useState } from "react";
import AppointmentCardP from "../../common/provider/appointmentcard";
import SetRateOverlay from "../../overlays/provider/setRateOverlay";

const AppointmentsP = ({ handleViewAppointmentOpen, appointments, user, onSetRate }) => {
  const [showRateOverlay, setShowRateOverlay] = useState(false);
  const [newRate, setNewRate] = useState(user?.hourlyRate || "");

  const completed = appointments.filter(a => a.status === "completed").length;
  const cancelled = appointments.filter(a => a.status === "cancelled").length;
  const booked = appointments.filter(a => a.status === "booked").length;

  const handleRateSubmit = () => {
    onSetRate(newRate);
    setShowRateOverlay(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-[10px] mt-8 mx-8 overflow-y-auto max-h-[84%] h-[84%]">
      {/* Header section */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-xl font-bold text-gray-800">
              <span className="material-symbols-outlined align-middle text-[#1EBDB8] mr-1">payments</span>
              Hourly Rate: <span className="text-[#1EBDB8]">${user?.hourlyRate || 'Not Set'}</span>
            </p>
            <div className="text-sm text-gray-600 mt-2 flex flex-wrap gap-4">
              <span className="flex items-center">
                <span className="material-symbols-outlined text-green-600 mr-1">check_circle</span>
                Completed: <strong className="ml-1">{completed}</strong>
              </span>
              <span className="flex items-center">
                <span className="material-symbols-outlined text-blue-500 mr-1">event</span>
                Booked: <strong className="ml-1">{booked}</strong>
              </span>
              <span className="flex items-center">
                <span className="material-symbols-outlined text-red-500 mr-1">cancel</span>
                Cancelled: <strong className="ml-1">{cancelled}</strong>
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowRateOverlay(true)}
            className="bg-[#1EBDB8] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#17a5a0] transition duration-200 shadow-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined">edit</span>
            Set Hourly Rate
          </button>
        </div>


      {/* Appointments */}
      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appointment, index) => (
            <AppointmentCardP
              key={index}
              index={index}
              appointment={appointment}
              view={handleViewAppointmentOpen}
            />
          ))}
        </div>
      ) : (
        <div className='flex w-full text-center'>
          <p className='font-semibold text-xl text-[#1EBDB8] m-auto my-8'>NO SCHEDULED APPOINTMENTS YET</p>
        </div>
      )}

      {/* Overlay */}
      {showRateOverlay && (
          <SetRateOverlay handleRateSubmit={handleRateSubmit} setNewRate={setNewRate} setShowRateOverlay={setShowRateOverlay} newRate={newRate}/>
      )}
    </div>
  );
};

export default AppointmentsP;