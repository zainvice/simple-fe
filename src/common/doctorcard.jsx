import React from 'react';
import Button from './button';

function DoctorCard({doctor, schedule}) {
    return (
        <div key={doctor.id} className="bg-white relative shadow-md rounded-[20px] shadow-lg py-8 px-4 poppins">
         <div className='absolute right-4 top-4'>
            <img src="./heart.png" alt="fav" />
         </div>
         <div className='flex w-full'>
            <img
            src={doctor.doctorImage}
            alt="Doctor"
            className="w-20 h-20 rounded-full mb-2"
            />
            <div className='text-left ml-4'>
                <h3 className="text-lg font-semibold text-[#1EBDB8]">{doctor.name}</h3>
                <p className="text-sm text-[#888888] ">{doctor.qualification}</p>
                <p className="text-sm text-[#888888] whitespace-nowrap">{doctor.university}</p>
            </div>
         </div>
        
       <div className='flex justify-between'>
            <div className="flex flex-col text-left justify-center items-center mt-2">
                <span className="text-yellow-500 text-">⭐⭐⭐⭐⭐ </span>
                <div className='text-[12px] font-semibold text-[#737373]'>
                    <span>High Rating</span>
                    <span className='ml-2 text-[#1EBDB8]'>{doctor.rating}/5.0</span>
                </div>
            </div>
            <div className='h-10 mt-2'>
                <Button text={'Schedule Appointment'} onClick={schedule}/>
            </div>
            
        </div>
      </div>
    );
}

export default DoctorCard;