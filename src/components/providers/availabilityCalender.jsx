import React, { useState, useEffect, useRef } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  parse, 
  isValid
} from "date-fns";
import Spinner from "../../common/spinner";
import EditAvailabilityOverlay from "../../overlays/provider/editAvailabilityOverlay";
import ViewAppointmentsOverlay from "../../overlays/provider/viewAppointmentsOverlay";
import { getUserByEmail } from "../../api/userCalls";
import { useSelector } from "react-redux";


const AvailabilityCalendar = ({appointments}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef(null); 
  const currentTimeRef = useRef(null); 
  const [editAvailibiltyOpen, setEditAvailibilityOpen] = useState()
  const [viewAppointmentOpen, setViewAppointmentOpen] = useState()
  const { user } = useSelector((state) => state.auth);
  const [availability, setAvailability] = useState([]);

  const [timezone, setTimezone] = useState("UTC");
  
  useEffect(() => {
      // Fetch IP-based timezone
      const fetchTimezone = async () => {
          try {
              const response = await fetch("https://ipapi.co/json/");
              const data = await response.json();
              setTimezone(data.timezone);
          } catch (error) {
              console.error("Error fetching timezone:", error);
              setTimezone("UTC"); // Fallback timezone
          }
      };
      fetchTimezone();
  }, []);

    useEffect(()=> {
      const fetchUserData = async() => {
        try {
          const response = await getUserByEmail(user.email)
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

  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const period = i < 12 ? "AM" : "PM";
    return `${hour}:00 ${period}`;
  });

  const isToday = (day) => {
    const today = new Date();
    return format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
  };

  
  const isCurrentTime = (time) => {
    // Get the current time in the user's timezone
    const now = new Date();

    // Format the current hour based on the timezone
    const formattedNow = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // This keeps the AM/PM format
    }).format(now);

    // Extract current hour and period (AM/PM)
    const [currentHourWithPeriod] = formattedNow.split(":");
    const currentPeriod = formattedNow.includes("AM") ? "AM" : "PM";
    const currentHour = parseInt(currentHourWithPeriod);

    // Split the input time into hour and period
    const [hourWithMinutes, period] = time.split(" ");
    const hour = parseInt(hourWithMinutes.split(":")[0]);

    // Compare the extracted hours and periods
    return currentHour === hour && currentPeriod === period;
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  useEffect(() => {
    if (calendarRef.current && currentTimeRef.current) {
      const calendarElement = calendarRef.current;
      const timeSlotElement = currentTimeRef.current;
  
   
      const currentDateColumn = Array.from(calendarElement.querySelectorAll('.date-column')).find(
        (column) => column.dataset.date === format(new Date(), "yyyy-MM-dd")
      );
  
      if (currentDateColumn) {
        const scrollTop = timeSlotElement.offsetTop - calendarElement.offsetTop;
  
    
        const calendarWidth = calendarElement.clientWidth;
        const columnWidth = currentDateColumn.offsetWidth;
        const scrollLeft =
          currentDateColumn.offsetLeft - calendarElement.offsetLeft - calendarWidth / 2 + columnWidth / 2;
  
        calendarElement.scrollTo({
          top: scrollTop,
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [currentMonth, timezone]);
  const toggleEditAvailibilityOpen = () => {
    setEditAvailibilityOpen(!editAvailibiltyOpen)
  }
  const toggleViewAppointmentsOpen = () => {
    setViewAppointmentOpen(!viewAppointmentOpen)
  }


  const getAppointmentsForSlot = (day, time) => {

    const timezone = day.toString().match(/([A-Z]+[-+][0-9]+(?:[:][0-9]{2})?)/)?.[0] || 'UTC';

    return appointments?.filter((appointment) => {
        try {
           
            const appointmentDate = parse(`${appointment.date}T00:00:00`, 'yyyy-MM-dd\'T\'HH:mm:ss', new Date(), { timeZone: timezone });  // Ensure appointment.date is a valid date string

           
            if (!isValid(appointmentDate)) {
                console.error("Invalid date in appointment:", appointment.date);
                return false;
            }

            
            const formattedAppointmentDate = format(appointmentDate, "yyyy-MM-dd");
            const formattedDay = format(day, "yyyy-MM-dd");

            
            let appointmentTime = appointment.time?.split(" - ")[0].trim(); 
            if (!appointmentTime) {
                console.error("Invalid time in appointment:", appointment.time);
                return false;
            }

            const standardizedAppointmentTime = format(parse(appointmentTime, 'h a', new Date()), 'hh:mm a');

      
            const standardizedUserTime = format(parse(time, 'h:mm a', new Date()), 'hh:mm a');

            

            
            return formattedDay === formattedAppointmentDate && standardizedUserTime === standardizedAppointmentTime;
        } catch (error) {
            console.error("Error processing appointment:", appointment, error);
            return false;
        }
    });
  };
  const getAvailabilityForSlot = (date, time) => { 
    const slotAvailability = availability?.find((availability) => availability.date === date);
    if (!slotAvailability) return "Unavailable";

    const isAvailable = slotAvailability.availableAppointments.includes(time);
    return isAvailable ? "Available" : "Unavailable";
  };

  console.log(availability)


  return (
    <div className="p-6 min-h-full">
      <div className="flex justify-between items-center mb-4 ">
        <div className="flex items-center border border-[#707271] rounded-[10px] px-4 ">
         
          <h2 className="text-lg font-semibold text-[#1EBDB8]">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <button
            className="text-lg font-semibold text-gray-700 ml-4"
            onClick={handlePrevMonth}
          >
            <span className="material-symbols-outlined mt-2">chevron_left</span>
          </button>
          <button
            className="text-lg font-semibold text-gray-700"
            onClick={handleNextMonth}
          >
            <span className="material-symbols-outlined mt-2">chevron_right</span>
          </button>
        </div>
        <div className="flex space-x-2">
          <button className="bg-[#1EBDB8] text-white px-4 py-2 rounded shadow-md" onClick={(e)=> setEditAvailibilityOpen(!editAvailibiltyOpen)}>
            Edit Schedule
          </button>
          <button className="bg-[#1EBDB8] text-white px-4 py-2 rounded shadow-md" onClick={toggleViewAppointmentsOpen}>
            View Appointments
          </button>
        </div>
        
      </div>
      {editAvailibiltyOpen && <EditAvailabilityOverlay onClose={toggleEditAvailibilityOpen}/>}
      {viewAppointmentOpen && <ViewAppointmentsOverlay appointments={appointments} onClose={toggleViewAppointmentsOpen}/>}

      {/* Calendar Grid */}
      <div
        ref={calendarRef}
        className="relative overflow-auto border border-gray-200 rounded h-[550px]"
      >
        <div className="grid grid-flow-col auto-cols-[200px] min-w-max">
          {/* Timezone Column */}
          <div className="flex flex-col min-w-[100px] border-r border-gray-200 sticky left-0 bg-white z-10">
            <div className="p-2 grid text-center items-center font-bold text-sm sticky left-0 top-0 bg-white text-gray-600 border-b h-[80px]">
              <p>GMT +8</p>
            </div>

            {/* Time Slots */}
            {times.map((time) => (
              <div
                key={time}
                ref={isCurrentTime(time) ? currentTimeRef : null}
                className={`p-2 text-sm text-gray-600 bg-white h-[150px] text-center grid items-center `}
              >
                <p className={`${
                  isCurrentTime(time) ? "bg-[#1EBDB8] text-white rounded-full" : ""
                }`}>{time}</p>
             
              </div>
            ))}
          </div>

          {/* Date Columns */}
          {daysInMonth.map((day) => (
             <div
                key={day}
                data-date={format(day, "yyyy-MM-dd")}
                className="flex flex-col min-w-[200px] date-column"
              >
              {/* Date Header */}
              <div
                className={`p-2 text-center text-sm font-bold text-gray-600 border-b h-[80px] grid items-center sticky top-0 bg-white z-0`}
              >
                <div>{format(day, "EEE")}</div>
                <div className="my-2">
                  <span
                    className={`${
                      isToday(day)
                        ? "bg-[#1EBDB8] text-white p-2 rounded-full"
                        : "opacity-50"
                    }`}
                  >
                    {format(day, "d")}
                  </span>
                </div>
              </div>

              {/* Time Slots */}
              {times.map((time) => (
                <div
                  key={`${format(day, "yyyy-MM-dd")}-${time}`}
                  className="p-2 border-b bg-white h-[150px] border-r"
                >
                  {!getAppointmentsForSlot(day, time)?.length && (
                    <p className="text-[#1EBDB8] font-bold text-center">
                        {getAvailabilityForSlot(format(day, "yyyy-MM-dd"), time)}
                      </p>

                  ) }

                  {getAppointmentsForSlot(day, time)?.map((appointment, index) => (
                    <div key={index} className="bg-[#1EBDB8] rounded-[10px] bg-opacity-30 h-full p-3 text-sm text-[#707271]">
                      <div className="flex items-center gap-2">
                        <img
                          src={appointment?.patientDetails?.avatar}
                          alt="patientavatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="text-sm text-[#333333] font-semibold">{appointment?.patientDetails?.name}</p>
                      </div>
                      <p>{appointment?.status}</p>
                      <p>{appointment?.type}</p>
                      <p className="mt-4 font-semibold">{appointment?.time}</p>
                    </div>
                  ))}
               
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
