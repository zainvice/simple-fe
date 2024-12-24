import React, {useState} from 'react';
import DoctorCard from '../../common/patient/doctorcard.jsx';
import DoctorCardExplore from '../../common/patient/doctorcardexplore.jsx';
import SpecialtyDropdown from '../../dropdowns/patient/specialtySelector.jsx';
const ExplorePage = ({handleNewAppointmentOpen, handleViewAppointmentOpen, location, setLocation, error}) => {
 
    const [searchActive, setSearchActive] = useState(false)
    const [sponsordDoctors, setSponsordDoctors] = useState([
        {
          id: 1,
          name: 'Dr. Adam Cooper',
          type: 'Dermatologist, Cosmetologist',
          university: 'M.B.B.S., F.C.P.S. (Dermatology)',
          rating: 4.8,
          doctorImage: 'https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png', 
          location: '1.2 mil - ABC Health Partners - 6746 Charlotte Pike, San Antonio, California ',
          reviews: [
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
    
          ],
          availability:[
            
              {
                "date": "2024-12-13",
                "day": "Friday",
                "availableAppointments": []
              },
              {
                "date": "2024-12-14",
                "day": "Saturday",
                "availableAppointments": [
                  "9:00 am",
                  "10:00 am",
                  "11:00 am",
                  "12:00 pm"
                ]
              },
              {
                "date": "2024-12-15",
                "day": "Sunday",
                "availableAppointments": [
                  "9:00 am",
                  "10:00 am",
                  "11:00 am"
                ]
              },
              {
                "date": "2024-12-16",
                "day": "Monday",
                "availableAppointments": []
              },
              {
                "date": "2024-12-17",
                "day": "Tuesday",
                "availableAppointments": [
                  "9:00 am",
                  "10:00 am",
                  "11:00 am"
                ]
              },
              {
                "date": "2024-12-18",
                "day": "Wednesday",
                "availableAppointments": [
                  "9:00 am",
                  "10:00 am",
                  "11:00 am"
                ]
              },
              {
                "date": "2024-12-19",
                "day": "Thursday",
                "availableAppointments": []
              },
              {
                "date": "2024-12-20",
                "day": "Friday",
                "availableAppointments": []
              },
              {
                "date": "2024-12-21",
                "day": "Saturday",
                "availableAppointments": [
                  "9:00 am",
                  "10:00 am",
                  "11:00 am",
                  "12:00 pm"
                ]
              },
              {
                "date": "2024-12-22",
                "day": "Sunday",
                "availableAppointments": [
                  "9:00 am",
                  "10:00 am",
                  "11:00 am"
                ]
              }
            
            
          ],
          videoVisits: true,
          features: 'New Patient Appointments . Excellent wait time . Highly Recommended'
        },
        {
          id: 2,
          name: 'Dr. Adam Cooper',
          type: 'Dermatologist, Cosmetologist',
          university: 'M.B.B.S., F.C.P.S. (Dermatology)',
          rating: 4.8,
          doctorImage: 'https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png',
          location: '1.2 mil - ABC Health Partners - 6746 Charlotte Pike, San Antonio, California ',
          reviews: [
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
    
          ],
          videoVisits: false,
          availability:[],
          features: 'New Patient Appointments . Excellent wait time . Highly Recommended'
        },
        {
          id: 2,
          name: 'Dr. Adam Cooper',
          type: 'Dermatologist, Cosmetologist',
          university: 'M.B.B.S., F.C.P.S. (Dermatology)',
          rating: 4.8,
          doctorImage: 'https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png',
          location: '1.2 mil - ABC Health Partners - 6746 Charlotte Pike, San Antonio, California ',
          reviews: [
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
    
          ],
          videoVisits: true,
          availability:[],
          features: [
              'New Patient Appointments',
              'Excellent wait time',
              'Highly Recommended',
             
          ]
        },
        
      ]);

      const [currentDate, setCurrentDate] = useState(Date.now());

      
      const handleNext = () => {
          setCurrentDate((prevDate) => prevDate + 14 * 24 * 60 * 60 * 1000);
      };


      const handlePrevious = () => {
          setCurrentDate((prevDate) => {
              const twoWeeksBack = prevDate - 14 * 24 * 60 * 60 * 1000;
              return twoWeeksBack > Date.now() ? twoWeeksBack : prevDate;
          });
      };

      const [viewFilter, setFilter] = useState(false)
      
      const onViewFilter = () => {
          setFilter(true)
      }
      
      const onHideFilter = () => {
          setFilter(false)
      }
      
      const [searchTerm, setSearchTerm] = useState('')
  
      const onSearchTermChange = (e) => {
          setSearchTerm(e.target.value)
      }
      
      const setSearchValue = (speciality) => {
          console.log("TRIGGERED")
          setSearchTerm(speciality)
          onHideFilter()
      }

    return (
       <>
       {searchActive?(
         <div className=' mt-2 overflow-y-auto'>
           
          <div className='w-full h-[1px] rounded-full bg-gray-300 mb-4'></div>
            <div id='searchFilter' className='flex lg:ml-14 space-x-6 '>
              <div className='border-2 border-gray-400 bg-white hover:bg-[#1E232F] hover:text-white cursor-pointer shadow-md  px-4 py-2 rounded-[20px] flex'><span class="material-symbols-outlined mr-1">calendar_today</span>Timeframe</div>
              <div className='border-2 border-gray-400 bg-white hover:bg-[#1E232F] hover:text-white cursor-pointer shadow-md  px-4 py-2 rounded-[20px] flex' >Time of Day</div>
              <div className='border-2 border-gray-400 bg-white hover:bg-[#1E232F] hover:text-white cursor-pointer shadow-md  px-4 py-2 rounded-[20px] flex' >Condition</div>
              <div className='border-2 border-gray-400 bg-white hover:bg-[#1E232F] hover:text-white cursor-pointer shadow-md  px-4 py-2 rounded-[20px] flex' >Specialty</div>
              <div className='border-2 border-gray-400 bg-white hover:bg-[#1E232F] hover:text-white cursor-pointer shadow-md  px-4 py-2 rounded-[20px] flex' >Distance</div>
              <div className='border-2 border-gray-400 bg-white hover:bg-[#1E232F] hover:text-white cursor-pointer shadow-md  px-4 py-2 rounded-[20px] flex' >In person/video</div>
              <div className='border-2 border-gray-400 bg-white hover:bg-[#1E232F] hover:text-white cursor-pointer shadow-md  px-4 py-2 rounded-[20px] flex' >More Filters</div>
            </div>
          <div className='w-full h-[1px] rounded-full bg-gray-300 my-4'></div>
          <div className='hidden mt-2 font-normal lg:flex flex-col lg:flex-row w-[94%] items-center mx-auto'>
                        
                        <div className='flex rounded-l-full px-4 py-3 bg-[#1E232F] w-full'>
                            <div className='flex w-full '>
                                
                                <input type="text" className='bg-transparent text-white placeholder-gray-400 ml-2 border-none outline-none focus:ring-0 caret-white'  placeholder ='Search disease, hospitals'/>
                            </div>
                            <div className='flex text-white'>
                                <span className="material-symbols-outlined mt-1" style={{ fontSize: "24px" }}>
                                    location_on
                                </span>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)} 
                                    placeholder={error || "Fetching location..."}
                                    className='bg-transparent placeholder-gray-400 ml-2 border-none outline-none focus:ring-0 caret-white'
                                />
                            </div>
                        </div>
                        <button className='bg-[#1EBDB8] text-[16px] -ml-8 px-3 py-4 text-white rounded-full' onClick={(e)=> window.location.href = '/signup'} ><span class="material-symbols-outlined mx-2 mt-1">search</span></button>
          </div>
          <div className='w-full h-[1px] rounded-full bg-gray-300 my-4'></div>
          <div className='flex w-[98%] mx-auto justify-between text-[#1E232F] bg-white rounded-[10px] px-4 py-2 shadow-md'>
            <p className='text-2xl font-semibold mt-1 ml-2'>
              {sponsordDoctors?.length} providers
            </p>
            <p className='flex'>
              <button
                    onClick={handlePrevious}
                    className={`${
                        currentDate === Date.now()
                            ? 'hidden'
                            : ''
                    }`}
                    disabled={currentDate === Date.now()} 
                >
                     <span className="material-symbols-outlined mt-1 text-[30px]">chevron_left</span>
                </button>
                <p className='text-lg font-semibold mx-8 mt-1'>
                    {currentDate=== Date.now ? `Today ${new Date(currentDate).toLocaleDateString('en-US', {
                        
                        month: 'short',
                        day: 'numeric',
                    })}`:
                      new Date(currentDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                      }) 
                    }{' '}
                    –{' '}
                    {new Date(currentDate + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(
                        'en-US',
                        {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                        }
                    )}
                </p>
                <button
                    onClick={handleNext}
                    
                >
                     <span className="material-symbols-outlined mt-1 text-[30px]">chevron_right</span>
                </button>

            </p>
            <p>

            </p>
           
          </div>

            <div className='w-[98%] grid grid-cols-1 mx-auto max-h-[65%] overflow-y-auto ' id='doctors'>
              {sponsordDoctors.map((doctor) => (
                  <DoctorCardExplore doctor={doctor} schedule={handleNewAppointmentOpen} fav={false}/>
              ))}
            </div>

           

         </div>
       ):(
        <div className='mt-2 overflow-y-auto'>
           <div className='hidden mt-2 text-sm font-normal lg:flex flex-col lg:flex-row w-[94%] items-center mx-auto relative'>
               {viewFilter&& <SpecialtyDropdown setSearchTerm={setSearchValue} searchTerm = {searchTerm}/>}
                        <div className='flex rounded-l-full px-4 py-3 bg-[#1E232F] w-full'>
                            <div className='flex w-full '>
                                
                               <input type="text" value={searchTerm} onChange={onSearchTermChange} onFocus={onViewFilter} className='bg-transparent w-full text-white placeholder-white ml-2 border-none outline-none focus:ring-0 caret-white'  placeholder ='Search disease, hospitals'/>
                            </div>
                            <div className='flex text-white'>
                                <span className="material-symbols-outlined mt-1" style={{ fontSize: "24px" }}>
                                    location_on
                                </span>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)} 
                                    placeholder={error || "Fetching location..."}
                                    className='bg-transparent placeholder-gray-400 ml-2 border-none outline-none focus:ring-0 caret-white'
                                />
                            </div>
                        </div>
                        <button className='bg-[#1EBDB8] text-[16px] -ml-8 px-3 py-4 text-white rounded-full' onClick={(e)=> setSearchActive(true)} ><span class="material-symbols-outlined mx-2 mt-1">search</span></button>
            </div>
            <p className='redRose lg:ml-14 ml-6 text-[#1EBDB8] font-semibold text-[20px]'>Explore Treatments accross specialties</p>
            <div className='grid lg:grid-cols-5 grid-cols-2 w-[90%] items-center text-[#1EBDB8] mx-auto'>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="/1.png" alt="logo" /></div> <p>Onocology</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="/2.png" alt="logo" /></div> <p>Endocrinology</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="/3.png" alt="logo" /></div> <p>Infertility</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="/4.png" alt="logo" /></div> <p>Mental Health</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="/5.png" alt="logo" /></div> <p>Cardiology</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="/neo.png" alt="logo" /></div> <p>Neurology</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="/rhe.png" alt="logo" /></div> <p>Rheumatology</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="/ps.png" alt="logo" /></div> <p>Plastice Surgery</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="/rds.png" alt="logo" /></div> <p>Rare Diseases</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="/sg.png" alt="logo" /></div> <p>Surrogacy</p></div>

            </div>
            <p className='redRose lg:ml-14 ml-6 text-[#1EBDB8] font-semibold text-[20px]'>Sponsord</p>
            <div className="grid mx-auto lg:grid-cols-3 grid-cols-1 gap-4 w-[90%] overflow-y-autos">
            {sponsordDoctors.map((doctor) => (
                <DoctorCard doctor={doctor} schedule={handleNewAppointmentOpen} fav={false}/>
            ))}
            </div>
        </div>
       )}
       
       </>
    );
}

export default ExplorePage;