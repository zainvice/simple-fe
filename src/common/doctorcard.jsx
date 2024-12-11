import React from 'react';
import Button from './button';

function DoctorCard({doctor, schedule, fav}) {
    console.log('DOCTOR', doctor)
    return (
        <div key={doctor.id} onClick={(e)=> window.location.href = `/explore/providerDetails`} className="bg-white cursor-pointer relative shadow-md rounded-[20px] shadow-lg py-8 px-4 poppins">
         {fav && <div className='absolute right-4 top-4'>
            <img src="./heart.png" alt="fav" />
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
                <p className="text-sm text-[#333333] font-medium">{doctor.qualification}</p>
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
                
                <p className='text-[#888888] text-sm'>{doctor?.features}</p>
            </div>
            <div className="flex text-sm mb-2">
                Next Available
                <p className='text-[#888888] text-sm'>{doctor?.recentAvailibilty}</p>
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