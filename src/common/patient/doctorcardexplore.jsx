import React from 'react';
import Button from './button';

function DoctorCardExplore({doctor, schedule, fav}) {
    console.log('DOCTOR', doctor)
    return (
        <div key={doctor.id}  className="bg-white w-full my-2 flex relative border rounded-[20px] shadow-lg py-8 px-4 poppins mx-auto">
         {fav && <div className='absolute right-4 top-4'>
            <img src="/heart.png" alt="fav" />
         </div>
         }
            <div className='flex cursor-pointer' onClick={(e)=> window.location.href = `/patient/explore/providerDetails`}>
                <img
                src={doctor.doctorImage}
                alt="Doctor"
                className="w-60 h-60 rounded-full mb-2"
            
                />
                <div className='text-left ml-4 text-lg w-1/2 ' >
                    <h3 className="text-2xl font-semibold text-[#1EBDB8]">{doctor.name}</h3>
                    <p className=" text-[#333333] font-medium">{doctor.type}</p>
                    <p className="text-[#333333] whitespace-nowrap flex">⭐ {doctor.rating} . {doctor?.reviews?.length} reviews <p className='ml-2 flex px-2 bg-[#FFC3C3] text-[#FF4747] rounded-[10px]'><img src="/heart.png" alt="" className='h-4 mt-1 mr-2'/>LOYAL PATIENTS</p></p>
                    {doctor?.videoVisits && <p className="text-[#333333] flex font-medium"> <span className="material-symbols-outlined mt-0.5 mr-2">hangout_video</span> Video Visits</p>}
                    <div className="flex mb-2">
                        <span className="material-symbols-outlined mt-1" style={{ fontSize: "20px" }}>
                                location_on
                                        </span>
                        <p>{doctor?.location}</p>
                    </div>
                    <div className="flex text-[#888888] mb-2">
                    
                        <p className='text-[#888888]'>

                        {Array.isArray(doctor?.features)
                            ? doctor.features.map((feature, index) => `${feature}. `)
                            : 'No features available'}
                        </p>
                    </div>
                </div>
            </div>
        
       
            {doctor?.availability?.length> 0 ? 
                    <div className='grid grid-cols-7 gap-2 ' id='availibility'>
                        {doctor?.availability?.map((available)=>(
                    
                            <div className={`flex-1 px-3 text-center  py-6 rounded-[10px]  ${available?.availableAppointments?.length>0 ? 'bg-[#1EBDB8] text-white cursor-pointer': 'text-[#707271] bg-[#F6F3F3] cursor-disabled'}`} >
                                
                                    <p>{available?.day.slice(0, 3)}</p> 
                                    <p className='mb-4'>
                                        {new Date(available?.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </p> 
                                
                                {available?.availableAppointments?.length > 0 ? (
                                    <p className='mx-auto'>{available?.availableAppointments?.length}&nbsp;appts</p>
                                ) : (
                                    <p className='mx-auto'>No&nbsp;appts</p>
                                )}
                            </div>
                        
                        ))}
                </div>
             : (
                <div className='w-1/2 text-center' id='no-availibility'>
                    <p className='text-[#707271] text-center mt-20'>
                        At this time, the provider has no availability on Simple at this location <br/> for appointments that meet your search criteria.
                    </p>
                </div>
            )}
            
        
      </div>
    );
}

export default DoctorCardExplore;