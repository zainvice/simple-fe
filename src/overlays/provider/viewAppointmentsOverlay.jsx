import React from 'react';

const ViewAppointmentsOverlay = ({appointments, onClose}) => {
    console.log("Appointments", appointments)
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm p-6 flex items-center justify-center z-30">
            <div className="bg-white w-full p-4 max-w-lg max-h-full overflow-y-auto rounded-lg shadow-lg relative">
                <h1 className='text-xl ml-4 mb-4 font-semibold text-[#1EBDB8]'>Appointments</h1>
                <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>X</button>
                {appointments && appointments?.length > 0 ? (
                    <>
                    {appointments.map((appointment, index) => (
                          <div
                                key={index}
                                className="bg-white mt-2 relative flex shadow-md rounded-[20px] justify-between shadow-lg py-8 px-4 border poppins"
                            >
                                <p className='absolute top-3 right-6 text-[#1EBDB8] font-bold text-lg'>{index + 1}</p>
                               <div className='ml-4'>
                                <h2 className="text-[22px] font-semibold  text-[#1EBDB8]">{appointment.date && new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'})}</h2>
                                    <p className="text-gray-500 font-semibold">{appointment.time}</p>
                                    <p className="text-gray-500">{appointment.type}</p>
                            
                                    <p className={` font-semibold`}>
                                        {appointment.status}
                                    </p>
                               </div>
                                <div className="flex flex-col items-center justify-between mr-4">
                                    
                                        <img
                                            src={appointment?.patientDetails?.avatar} 
                                            alt="Patient"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                    <div className='flex flex-col mt-4 text-center'>
                                        <span className="text-[#707271] text-sm font-medium ">{appointment?.patientDetails?.name}</span>
                                        <span className="text-[#707271] text-sm font-medium ">{appointment?.patientDetails?.email}</span>
                                        <span className="text-[#1EBDB8] text-sm font-medium ">{appointment?.schedulingDetails?.patientType?.toUpperCase()} PATIENT</span>
                                    </div>
                            
                                </div>
                              
                            </div>
                    ))}
                    </>
                ) : (
                    <>
                      No Booked Appointments Found
                    </>
                )}
            </div>
        </div>
    );
}

export default ViewAppointmentsOverlay;