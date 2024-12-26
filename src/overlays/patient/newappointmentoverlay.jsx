import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AppointmentOverlay = ({ doctor, onClose, visitReasons, setNewAppointmentDetails, newAppointmentDetails}) => {
  
  const navigate = useNavigate()

  const handleTimeSelection = (dayDate, selectedTime) => {

    const timeParts = selectedTime.split(" ");
    const hour = parseInt(timeParts[0]);

    const endHour = hour === 12 ? 1 : hour + 1; // Special case for 12 PM or 12 AM
    const period = timeParts[1]; // "AM" or "PM"

    // Construct the full time range
    const startTime = `${hour} ${period}`;
    const endTime = `${endHour === 12 ? 12 : endHour} ${period}`;
    const fullTime = `${startTime} - ${endTime}`;

    setNewAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      date: dayDate,
      time: fullTime, 
    }));
    navigate('/patient/book')
    onClose()
  };
  const handleVisitReasonChange = (event) => {
    const { value } = event.target;
    setNewAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      schedulingDetails: {
        ...prevDetails.schedulingDetails,
        visitReason: value, 
      }
    }));
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 h-screen">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative h-[90%] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-2xl font-medium text-[#1E232F] mb-4">Book an appointment</h2>
        <div className="flex items-center mb-6">
          <img
            src={doctor?.avatar ? doctor?.avatar : doctor?.gender?.toUpperCase() === "MALE" ? 'https://pngimg.com/d/doctor_PNG15992.png': 'https://static.vecteezy.com/system/resources/previews/041/409/059/non_2x/ai-generated-a-female-doctor-with-a-stethoscope-isolated-on-transparent-background-free-png.png'}
            alt={doctor?.name}
            className="w-28 h-28 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-[#1E232F]">{'Dr. '} {doctor?.firstName} {' '} {doctor?.lastName}</h3>
            <p className="text-sm  font-medium">{doctor?.type}</p>
            <p className="text-sm text-[#333333] whitespace-nowrap">⭐ {doctor?.rating} . {doctor?.reviews?.length} reviews</p>
            <p className="text-sm text-[#333333]">{doctor?.location}</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-normal font-medium ">
            Scheduling Details
          </label>
          <label className="block text-sm mb-2 text-[#333333]">
            Your selections will help show the right availability
          </label>
          <select
            id="visitReason"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-[#1EBDB8]"
            onChange={handleVisitReasonChange}
            value={newAppointmentDetails.schedulingDetails.visitReason} // Make sure the selected value is controlled
          >
            {visitReasons.map((category, categoryIndex) => (
              <optgroup key={categoryIndex} label={category.label}>
                {category.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <h4 className="font-medium text-normal mb-2">Scheduling Details</h4>
          <label className="block text-sm mb-2 text-[#333333]">
              Click a time to book your appointment.
          </label>
          {doctor?.availability?.map((day) => (
            <div key={day.date} className="mb-4">
              <p className="font-semibold text-gray-800">
                {day.day.slice(0, 3)}, {new Date(day?.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {day.availableAppointments.length > 0 ? (
                  day.availableAppointments.map((time, index) => (
                    <button
                      key={index}
                      className="px-4 py-2 bg-[#1EBDB8] border border-[#1EBDB8] text-white text-sm rounded hover:bg-white duration-300 hover:text-[#1EBDB8]"
                      onClick={() => handleTimeSelection(day.date, time)} 
                    >
                      {time}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No appointments available.</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="w-full py-2 bg-teal-500 text-white rounded text-sm hover:bg-teal-600">
          Show more availability
        </button>
      </div>
    </div>
  );
};

export default AppointmentOverlay;
