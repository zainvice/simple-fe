import React, { useState, useEffect } from "react";
import { updateUserByEmail } from "../../api/userCalls"
import { useSelector } from "react-redux";
import { getUserByEmail } from "../../api/userCalls";

const EditAvailabilityOverlay = ({ onClose }) => {
  const [availability, setAvailability] = useState([]);
  const [generatedAvailability, setGeneratedAvailability] = useState([]);
  const [duration, setDuration] = useState(14);
  const [selectedHours, setSelectedHours] = useState("24/7");
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState()

  const hourOptions = {
    "24/7": { start: 0, end: 24 },
    "9-5": { start: 9, end: 17 },
    "10-6": { start: 10, end: 18 },
    "8-4": { start: 8, end: 16 },
  };
  useEffect(()=> {
    const fetchUserData = async() => {
      try {
        const response = await getUserByEmail(user.email)
        console.log(response)
        setUserData(response)
        if(response.availability?.length > 0){
          setAvailability(response.availability)
        }
      } catch (error) {
        
      }
    }
    if(user.email){
       fetchUserData()
    }

  },[user])

  useEffect(() => {
    generateAvailability();
    console.log("USER", user)
  }, [duration, selectedHours]);


  const onSave  = async() => {
     try {
        const userData = { availability: availability}
        const response = await updateUserByEmail(user.email, userData)
        console.log("RESPONSE", response)

     } catch (error) {
        console.error("error", error)
     }
  }
  const handleTimeClick = (time, date) => {
    console.log("ON TIME CLICK", time, date, availability);
    setAvailability((prevAvailability) => {
      return prevAvailability.map((item) => {
        if (item.date === date) {
          const isTimeSelected = item.availableAppointments.includes(time);
          return {
            ...item,
            availableAppointments: isTimeSelected
              ? item.availableAppointments.filter((t) => t !== time) // Remove if already selected
              : [...item.availableAppointments, time], // Add if not selected
          };
        }
        return item;
      }).concat(
        prevAvailability.some((item) => item.date === date)
          ? []
          : [{ date, availableAppointments: [time] }]
      );
    });
  };
  

  const generateAvailability = () => {
    const startDate = new Date();
    const newGeneratedAvailability = [];
    const mappedGeneratedAvailability = []
    const { start, end } = hourOptions[selectedHours];
  
    for (let i = 0; i < duration; i++) {
      const currentDate = new Date(startDate); // Fix: Copy startDate to avoid mutation
      currentDate.setDate(startDate.getDate() + i);
      
      const dateString = currentDate.toISOString().split("T")[0];
      const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  
      const times = [];
      for (let hour = start; hour < end; hour++) {
        times.push(`${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? "AM" : "PM"}`);
      }
  
      newGeneratedAvailability.push({ date: dateString, day: dayName, availableAppointments: times });


      const existingAvailability = userData?.availability?.find((item) => item.date === dateString);
  
      mappedGeneratedAvailability.push({
        date: dateString,
        day: dayName,
        availableAppointments: existingAvailability ? existingAvailability.availableAppointments : times,
      });
    }
  
    setGeneratedAvailability(newGeneratedAvailability);
    
    setAvailability(mappedGeneratedAvailability);
    /* setAvailability(
      mappedGeneratedAvailability.map(({ date, day, availableAppointments }) => ({
        date,
        day, // Correct key name
        availableAppointments: [],
      }))
    ); */
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>X</button>
        <div className="p-6 border-b border-gray-300">
          <h2 className="text-xl font-semibold">Edit Availability</h2>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Choose Duration</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value={7}>1 Week</option>
              <option value={14}>2 Weeks (Recommended)</option>
              <option value={21}>3 Weeks</option>
              <option value={28}>4 Weeks</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Choose Availability</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={selectedHours}
              onChange={(e) => setSelectedHours(e.target.value)}
            >
              {Object.keys(hourOptions).map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-60">
          {generatedAvailability.map(({ date, day, availableAppointments }) => (
            <div key={date} className="mb-4">
              <h3 className="text-lg font-medium">{day}, {new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}</h3>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {availableAppointments.map((time) => (
                  <button
                    key={time}
                    className={`border rounded py-1 px-3 text-center text-sm font-medium ${
                      availability.find((item) => item.date === date && item.availableAppointments.includes(time))
                        ? "bg-teal-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                    onClick={() => handleTimeClick(time, date)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-300 flex justify-end space-x-4">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={onClose}>Cancel</button>
          <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600" onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditAvailabilityOverlay;