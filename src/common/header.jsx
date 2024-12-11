import React, { useState, useEffect } from 'react';

const Header = ({props}) => {
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");
  
    useEffect(() => {
      // Fetch location data
      const fetchLocation = async () => {
        try {
          const response = await fetch("http://ip-api.com/json/");
          if (!response.ok) {
            throw new Error("Failed to fetch location.");
          }
          const data = await response.json();
          if (data.status === "success") {
          
            const locationString = `${data.city}, ${data.regionName}`;
            setLocation(locationString);
          } else {
            setError("Unable to retrieve location.");
          }
        } catch (err) {
          setError(err.message || "An error occurred.");
        }
      };
  
      fetchLocation();
    }, []);

    return (
        <div className='flex w-full mt-8  justify-between z-0'>
            <div> 
                <p className='redRose lg:ml-12 ml-6 text-[#1EBDB8] font-semibold text-[20px]'>
                {props?.state && props?.state!='Explore' ? props?.state?.toUpperCase() :  
                
                    <div className='hidden -mt-4 text-sm font-normal border-black lg:flex flex-col lg:flex-row w-full justify-between items-center '>
                        
                        <div className='w-full lg:w-[90%] flex rounded-l-full px-4 py-3 bg-[#1E232F]'>
                            <div className='flex lg:w-[90%]'>
                                
                                <input type="text" className='bg-transparent placeholder-gray-400 ml-2 border-none outline-none focus:ring-0 caret-white'  placeholder ='Search disease, hospitals'/>
                            </div>
                            <div className='flex text-white'>
                                <span className="material-symbols-outlined mt-1" style={{ fontSize: "24px" }}>
                                    location_on
                                </span>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)} // Allow manual editing if needed
                                    placeholder={error || "Fetching location..."}
                                    className='bg-transparent placeholder-gray-400 ml-2 border-none outline-none focus:ring-0 caret-white'
                                />
                            </div>
                        </div>
                        <button className='bg-[#1EBDB8] text-[16px] mt-6 lg:mt-0 -ml-10 px-3 py-4 text-white rounded-full' onClick={(e)=> window.location.href = '/signup'} ><span class="material-symbols-outlined mx-2 mt-1">search</span></button>
                    </div>}
                </p> 
            </div>
            
            <div className='lg:flex poppins text-sm mt-2 mr-14 hidden'>
                <p className='mx-4 text-[#1E232F]'>{props?.username ? props?.username : 'username'}</p>
                <span class="material-symbols-outlined text-[#888888] mx-2">keyboard_arrow_down</span>
                <span class="material-symbols-outlined text-[#888888] mx-2">notifications</span>

            </div>
            
        </div>
    );
}

export default Header;