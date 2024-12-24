import React, {useState, useEffect} from 'react';
import Button from './button';

function DoctorCard({doctor, schedule, fav}) {
        const [nextAvailable, setNextAvailable] = useState(null);

        // Calculate the next available time
        useEffect(() => {
            if (doctor?.availability) {
                const next = doctor.availability.find((day) => 
                    day.availableAppointments && day.availableAppointments.length > 0
                );

                if (next) {
                    setNextAvailable(
                        `${next.day.slice(0, 3)}, ${new Date(next.date).toLocaleDateString(
                            'en-US',
                            { month: 'short', day: 'numeric' }
                        )} at ${next.availableAppointments[0]}`
                    );
                } else {
                    setNextAvailable(false);
                }
            }
        }, [doctor?.availability]);
    return (
        <div key={doctor.id} onClick={(e)=> window.location.href = `/patient/explore/providerDetails`} className="border bg-white cursor-pointer relative shadow-md rounded-[20px] shadow-lg py-8 px-4 poppins">
         {fav && <div className='absolute  right-4 top-4'>
            <img className='h-6' src="/heart.png" alt="fav" />
         </div>
         }
         <div className='flex w-full'>
            <img
            src={doctor.doctorImage}
            alt="Doctor"
            className="w-24 h-24 rounded-full mb-2"
            />
            <div className='text-left ml-4'>
                <h3 className="text-lg font-semibold text-[#1EBDB8]">{doctor.name}</h3>
                <p className="text-sm text-[#333333] font-medium">{doctor.type}</p>
                <p className="text-sm text-[#888888] whitespace-nowrap">{doctor.university}</p>
             
                <p className="text-sm text-[#333333] whitespace-nowrap">⭐ {doctor.rating} . {doctor?.reviews?.length} reviews</p>
            </div>
         </div>
        
       <div className='flex-col '>
            <div className="flex mb-2">
                <span className="material-symbols-outlined mt-1" style={{ fontSize: "20px" }}>
                        location_on
                                </span>
                <p>{doctor?.location}</p>
            </div>
            <div className="flex text-[#888888] mb-2">
                
             {!fav &&
                <>
                {Array.isArray(doctor?.features)
                            ? doctor.features.map((feature, index) => `${feature}. `)
                            : 'No features available'}
                 </>
             }
            </div>
            <div className="flex text-sm mb-2">
                {nextAvailable? <p>Next Available <span className='text-[#888888] text-sm'>{' '}{nextAvailable}</span></p> : "Currently not Available"}
                
            </div>
            <button
                type="submit"
                className="w-full py-2 mb-2 px-4 bg-[#1EBDB8] border border-[#1EBDB8] text-white rounded-[10px] font-bold hover:text-[#1EBDB8] hover:bg-transparent transition"
                onClick={schedule}
                >
                Schedule Appointment
            </button>
            
        </div>
      </div>
    );
}

export default DoctorCard;