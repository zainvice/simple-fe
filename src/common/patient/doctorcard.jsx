import React, {useState, useEffect} from 'react';
import Button from '../button';
import { updateUserByEmail } from '../../api/userCalls';


function DoctorCard({doctor, schedule, fav, user}) {
        const [nextAvailable, setNextAvailable] = useState(null);

        const [isFav, setIsFav] = useState(false);

         
        const [showSuccessPopup, setShowSuccessPopup] = useState(false);
        useEffect(() => {
            // Check if this doctor is already in user's favorites on mount
            if (user?.favoriteProviders?.includes(doctor.email)) {
              setIsFav(true);
            }
        }, [user, doctor.email]);
    
        const toggleFavorite = async () => {
          try {
            const updatedData = { ...user };
            let updatedFavorites = [...(user.favoriteProviders || [])];
    
            if (isFav) {
              // Remove doctor from favorites
              updatedFavorites = updatedFavorites.filter(email => email !== doctor.email);
              setIsFav(false);
            } else {
              // Add doctor to favorites
              updatedFavorites.push(doctor.email);
              setIsFav(true);
            }
    
            updatedData.favoriteProviders = updatedFavorites;
            await updateUserByEmail(user.email, updatedData);
    
            setShowSuccessPopup(true);
            setTimeout(() => setShowSuccessPopup(false), 2000);
          } catch (error) {
            console.error("error", error);
          }
        };
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
        <div key={doctor.id} className="border bg-white relative shadow-md rounded-[20px] shadow-lg py-8 px-4 poppins">
          {showSuccessPopup && (
                <div className="fixed top-20 right-10 bg-[#1EBDB8] text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slideIn">
                  {isFav? 'Added to': 'Removed from'} favorites!
                </div>
            )}
         <div
            className="absolute right-4 top-4 cursor-pointer group"
            onClick={toggleFavorite}
            >
            <span
                className={`material-symbols-outlined text-2xl transition-colors duration-200 ${
                isFav ? 'text-red-500' : 'text-gray-400'
                }`}
            >
                {isFav ? "favorite" : "favorite_border"}
            </span>
            <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap">
                {isFav ? "Remove from favorites" : "Add to favorites"}
            </div>
            </div>
         
         <div className='flex w-full cursor-pointer' onClick={(e)=> window.location.href = `/patient/explore/providerDetails?id=${doctor._id}`} >
            <img
            src={doctor.avatar ? doctor.avatar : doctor?.gender?.toUpperCase() === "MALE" ? 'https://pngimg.com/d/doctor_PNG15992.png': 'https://static.vecteezy.com/system/resources/previews/041/409/059/non_2x/ai-generated-a-female-doctor-with-a-stethoscope-isolated-on-transparent-background-free-png.png'}
            alt="Doctor"
            className="w-24 h-24 rounded-full mb-2"
            />
            <div className='text-left ml-4'>
                <h3 className="text-lg font-semibold text-[#1EBDB8]"> {'Dr. '} {doctor?.firstName} {' '} {doctor?.lastName}</h3>
                <p className="text-sm text-[#333333] font-medium">{doctor.practiceName}</p>
                <p className="text-sm text-[#888888] whitespace-nowrap">{doctor?.specialty && doctor?.specialty[0]}</p>
             
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
                onClick={(e)=>schedule(doctor)}
                >
                Schedule Appointment
            </button>
            
        </div>
      </div>
    );
}

export default DoctorCard;