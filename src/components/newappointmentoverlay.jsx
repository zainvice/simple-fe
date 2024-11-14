import React, { useState } from "react";

const NewAppointmentOverlay = ({ onClose }) => {
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState("October");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedTime, setSelectedTime] = useState("00:00");
  const [selectedDate, setSelectedDate] = useState(11);
  const [selectedDoctor, setSelectedDoctor] = useState("Dr. Adam Cooper");
  const [appointmentType, setAppointmentType] = useState("Online");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 4 }, (_, i) => currentYear + i);

  const doctors = ["Dr. Adam Cooper", "Dr. Shelly Christian", "Dr. John Doe"];

  const daysInMonth = new Date(selectedYear, months.indexOf(selectedMonth) + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleTimeChange = (event) => {
    const value = event.target.value;
    const hours = String(Math.floor(value)).padStart(2, "0");
    const minutes = value % 1 === 0.5 ? "30" : "00";
    setSelectedTime(`${hours}:${minutes}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#EEECEC] rounded-3xl w-full max-w-lg shadow-lg relative">
        
        {/* Header with Month and Year */}
        <div className="flex w-full justify-between bg-[#1EBDB8] text-white rounded-t-3xl p-4">
          <button onClick={onClose}>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <select
            name="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-[#1EBDB8] text-white font-semibold appearance-none focus:outline-none"
          >
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <select
            name="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-[#1EBDB8] text-white font-semibold appearance-none focus:outline-none"
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Time and Date Selectors */}
        <div className="flex flex-col items-center justify-center bg-[#1EBDB8] p-6 rounded-b-[30px] shadow-md z-50">
          <h3 className="text-5xl font-bold text-white">{selectedTime}</h3>
          <input
            type="range"
            defaultValue={'0'}
            min="0"
            max="24"
            step="0.5"
            className="w-full my-4 "
            onChange={handleTimeChange}
          />

          {/* Horizontal Scrollable Date Selector */}
          <div className="flex items-center w-full relative mt-4 overflow-hidden">
            <button
              onClick={() => setSelectedDate((prev) => (prev > 1 ? prev - 1 : prev))}
              className="text-white text-2xl absolute left-0"
            >
               <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex space-x-14 overflow-x-scroll scrollbar-hide px-4">
              {dates.map((date) => (
                <div
                  key={date}
                  className={` px-2 flex items-center justify-center rounded-full
                    ${selectedDate === date ? "bg-white text-[#1EBDB8]" : "text-white"}`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date}
                  {selectedDate === date && <div className="w-8 bg-white"></div>}
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedDate((prev) => (prev < daysInMonth ? prev + 1 : prev))}
              className="text-white text-2xl absolute right-0 bg-"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
         
        </div>

        <div className="flex-1 px-4 py-6 justify-between bg-white rounded-b-[30px] shadow-md z-0">
          
         <div className="flex justify-between">
          <div className="flex items-center space-x-3">
              <img src="https://via.placeholder.com/40" alt="Doctor" className="w-10 h-10 rounded-full" />
              <select
                name="doctor"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="bg-transparent outline-none text-gray-700 font-semibold rounded-md px-2 py-1"
              >
                {doctors.map((doctor) => (
                  <option key={doctor} value={doctor}>{doctor}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center">

              <select
                name="appointmentType"
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                className="bg-transparent outline-none text-gray-700 font-semibold rounded-md px-2 py-1"
              >
                <option value="Online">Online Appointment</option>
                <option value="Physical">Physical Appointment</option>
              </select>
            </div>
         </div>
          <div className="w-full items-center text-center">
          <p className="text-[#707271] font-semibold text-sm">Secured Payment Checkout</p>
          <div className="flex justify-center mt-2">
            <img src="./cards.png" alt="Cards" />
            
          </div>

          </div>
        </div>

        {/* Payment and Buttons */}
        <div className="mt-4 text-center">
                   <div className="flex justify-between mt-6 mx-20 my-4">
            <button
              className="bg-gray-300 text-gray-600 px-4 py-2 rounded-r-[20px] rounded-t-[20px] bg-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="bg-[#1EBDB8] text-white px-4 py-2 rounded-l-[20px] rounded-t-[20px]">
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAppointmentOverlay;
