import React, { useState } from "react";

const EditAvailabilityOverlay = () => {
  const [availability, setAvailability] = useState([]);

  const times = [
    "12:00 am", "1:00 am", "2:00 am", "3:00 am", "4:00 am", "5:00 am", "6:00 am", "7:00 am", "8:00 am", "9:00 am", "10:00 am", "11:00 am",
    "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm", "9:00 pm", "10:00 pm", "11:00 pm"
  ];

  const handleTimeClick = (time, date, day) => {
    setAvailability((prevAvailability) => {
      const dayIndex = prevAvailability.findIndex((item) => item.date === date);

      if (dayIndex === -1) {
        return [
          ...prevAvailability,
          { date, day, availableAppointments: [time] }
        ];
      }

      const dayAvailability = { ...prevAvailability[dayIndex] };

      if (dayAvailability.availableAppointments.includes(time)) {
        dayAvailability.availableAppointments = dayAvailability.availableAppointments.filter(
          (t) => t !== time
        );
      } else {
        dayAvailability.availableAppointments.push(time);
      }

      const updatedAvailability = [...prevAvailability];
      updatedAvailability[dayIndex] = dayAvailability;

      return updatedAvailability;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-300">
          <h2 className="text-xl font-semibold">Edit Availability</h2>
          <p className="text-gray-600 mt-2">Click a time, you're available for appointments.</p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium">Mon, Dec 15</h3>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {times.map((time) => (
                <button
                  key={time}
                  className={`border rounded py-1 px-3 text-center text-sm font-medium ${
    availability.find((item) => item.date === "2024-12-15" && item.availableAppointments.includes(time))
      ? "bg-teal-500 text-white"
      : "bg-gray-100 hover:bg-gray-200"
  }`}
                  onClick={() => handleTimeClick(time, "2024-12-15", "Monday")}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-300 flex justify-end space-x-4">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Cancel</button>
          <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditAvailabilityOverlay;