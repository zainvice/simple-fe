import React, {useEffect, useState} from 'react';
import DoctorCard from '../../common/patient/doctorcard.jsx';
import DoctorCardExplore from '../../common/patient/doctorcardexplore.jsx';
import SpecialtyDropdown from '../../dropdowns/patient/specialtySelector.jsx';
import TimeframeSelector from '../../dropdowns/patient/timeframeSelector.jsx';
import TimeOfDaySelector from '../../dropdowns/patient/timeOfDaySelector.jsx';
import VisitReasonDropdown from '../../dropdowns/patient/visitReasonSelector.jsx';
import DistanceSelector from '../../dropdowns/patient/distanceSelector.jsx';
import VisitTypeSelector from '../../dropdowns/patient/perferredASelector.jsx';
import { useLocation } from 'react-router-dom';

const ExplorePage = ({handleNewAppointmentOpen, providers, user, location, setLocation, error}) => {
 
    const [searchActive, setSearchActive] = useState(false)
    
      const [currentDate, setCurrentDate] = useState(Date.now());

      const [searchTerm, setSearchTerm] = useState('')


      const [searchFilters, setFilters] = useState({
        timeframe: 'flexible',
        specialty: searchTerm,
        timeOfDay: '',
        condition: '',
        speciality: '',
        distance: '',
        visitType: '',

      })
     
      const [timeframeOverlay, setTimeframeOverlay] = useState(false);
      const [timeOfDayOverlay, setTimeOfDayOverlay] = useState(false);
      const [conditionOverlay, setConditionOverlay] = useState(false);
      const [distanceOverlay, setDistanceOverlay] = useState(false);
      const [visitTypeOverlay, setVisitTypeOverlay] = useState(false);

      const getFilterFromUrl = () => {
        const params = new URLSearchParams(location.search); // Extract query parameters from URL
        return params.get('specialty'); // Get the 'specialty' parameter
      };

      const searchLocation = useLocation(); // ← alias it instead of overwriting

      useEffect(() => {
        const params = new URLSearchParams(searchLocation.search);
        const specialty = params.get('specialty');
      
        if (specialty) {
          console.log("found specialty", specialty);
          setSearchActive(true);
          setSearchTerm(specialty);
        } else {
          setSearchActive(false);
          setSearchTerm('');
        }
      }, [searchLocation.search]); // ← depend on just the changing part

      const closeAllOverlays = () => {
        setTimeframeOverlay(false);
        setTimeOfDayOverlay(false);
        setConditionOverlay(false);
        setDistanceOverlay(false);
        setVisitTypeOverlay(false);
      };

      
      const toggleTimeframeOverlay = () => {
        closeAllOverlays();
        setTimeframeOverlay(!timeframeOverlay);
      };

      const toggleTimeOfDayOverlay = () => {
        closeAllOverlays();
        setTimeOfDayOverlay(!timeOfDayOverlay);
      };

      const toggleConditionOverlay = () => {
        closeAllOverlays();
        setConditionOverlay(!conditionOverlay);
      };

      const toggleDistanceOverlay = () => {
        closeAllOverlays();
        setDistanceOverlay(!distanceOverlay);
      };

      const toggleVisitTypeOverlay = () => {
        closeAllOverlays();
        setVisitTypeOverlay(!visitTypeOverlay);
      };

      const handleFilterChange = (filterType, value) => {
        setFilters({
          ...searchFilters,
          [filterType]: value,
        });
      };

      
      const handleNext = () => {
          setCurrentDate((prevDate) => prevDate + 14 * 24 * 60 * 60 * 1000);
      };

      useEffect(()=>{
        if(searchFilters.speciality){

        }

      },[searchFilters])

      const handlePrevious = () => {
        setCurrentDate((prevDate) => {
          const twoWeeksBack = prevDate - 14 * 24 * 60 * 60 * 1000;
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Normalize to start of day
      
          return twoWeeksBack >= today.getTime() ? twoWeeksBack : today.getTime();
        });
      };
      

      const [viewFilter, setFilter] = useState(false)
      
      const onViewFilter = () => {
          setFilter(true)
      }
      
      const onHideFilter = () => {
          setFilter(false)
      }
      

  
      const onSearchTermChange = (e) => {
          setSearchTerm(e.target.value)
      }
      
      const setSearchValue = (speciality) => {
          setSearchTerm(speciality)
          onHideFilter()
      }
      const handleSearch = () => {
        const searchTermParam = encodeURIComponent(searchTerm); 
        const locationParam = encodeURIComponent(location); 
        const currentUrl = window.location.origin + window.location.pathname; 
        let newUrl = `${currentUrl}?specialty=${searchTermParam}&location=${locationParam}`;
  
        window.history.pushState({}, '', newUrl);
        setSearchActive(true)
      }

    return (
       <>
       {searchActive?(
         <div className=' mt-2 overflow-y-auto'>
           
          <div className='w-full h-[1px] rounded-full bg-gray-300 mb-4'></div>
            <div id='searchFilter' className='flex lg:ml-14 space-x-6 relative z-20'>
              <div className='border-2 border-gray-400 bg-white hover:bg-[#1E232F] hover:text-white cursor-pointer shadow-md  px-4 py-2 rounded-[20px] flex w-32' onClick={toggleTimeframeOverlay}><span class="material-symbols-outlined mr-1" >calendar_today</span>{searchFilters.timeframe.toUpperCase()}</div> {/* {searchFilters.timeframe.charAt(0).toUpperCase() + searchFilters.timeframe.slice(1)} */}
              {timeframeOverlay&&<TimeframeSelector timeframe={searchFilters.timeframe} handleTimeframeChange={handleFilterChange}/>}
              <div className='border-2 border-gray-400 bg-white hover:bg-[#1E232F] hover:text-white cursor-pointer shadow-md  px-4 py-2 rounded-[20px] flex' onClick={toggleTimeOfDayOverlay} >Time of Day</div>
              {timeOfDayOverlay&&<TimeOfDaySelector/>}
              <div className='border-2 border-gray-400 bg-white hover:bg-[#1E232F] hover:text-white cursor-pointer shadow-md  px-4 py-2 rounded-[20px] flex' onClick={toggleConditionOverlay} >Condition</div>
              {conditionOverlay&&<VisitReasonDropdown/>}
              
              <div className='border-2 border-gray-400 bg-white hover:bg-[#1E232F] hover:text-white cursor-pointer shadow-md  px-4 py-2 rounded-[20px] flex' onClick={toggleDistanceOverlay} >Distance</div>
              {distanceOverlay&&<DistanceSelector/>}
              <div className='border-2 border-gray-400 bg-white hover:bg-[#1E232F] hover:text-white cursor-pointer shadow-md  px-4 py-2 rounded-[20px] flex' onClick={toggleVisitTypeOverlay} >In person/video</div>
              {visitTypeOverlay&&<VisitTypeSelector/>}
            </div>
          <div className='w-full h-[1px] rounded-full bg-gray-300 my-4'></div>
          <div className='hidden mt-2 font-normal lg:flex flex-col lg:flex-row w-[94%] items-center mx-auto z-10 relative'>
                    {viewFilter&& <SpecialtyDropdown setSearchTerm={setSearchValue} searchTerm = {searchTerm}/>}
                        <div className='flex rounded-l-full px-4 py-3 bg-[#1E232F] w-full'>
                            <div className='flex w-full '>
                                
                                <input type="text" value={searchTerm} onChange={onSearchTermChange} onFocus={onViewFilter} className='bg-transparent text-white placeholder-gray-400 ml-2 border-none outline-none focus:ring-0 caret-white'  placeholder ='Browse Specialties'/>
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
              {providers?.length} providers
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
              {providers?.map((doctor) => (
                  <DoctorCardExplore doctor={doctor} schedule={handleNewAppointmentOpen} fav={false}/>
              ))}
            </div>

           

         </div>
       ):(
        <div className='mt-2 overflow-y-auto'>
           <div className='hidden mt-2 text-sm font-normal lg:flex flex-col lg:flex-row w-[94%] items-center mx-auto relative z-10'>
               {viewFilter&& <SpecialtyDropdown setSearchTerm={setSearchValue} searchTerm = {searchTerm}/>}
                        <div className='flex rounded-l-full px-4 py-3 bg-[#1E232F] w-full'>
                            <div className='flex w-full '>
                                
                               <input type="text" value={searchTerm} onChange={onSearchTermChange} onFocus={onViewFilter} className='bg-transparent w-full text-white placeholder-white ml-2 border-none outline-none focus:ring-0 caret-white'  placeholder ='Browse Specialties'/>
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
                        <button className='bg-[#1EBDB8] text-[16px] -ml-8 px-3 py-4 text-white rounded-full' onClick={(e)=> handleSearch()} ><span class="material-symbols-outlined mx-2 mt-1">search</span></button>
            </div>
           
            
            <p className='redRose lg:ml-14 ml-6 text-[#1EBDB8] font-semibold text-[20px] mb-4 mt-6'>Sponsored</p>
            <div className="grid mx-auto lg:grid-cols-3 grid-cols-1 gap-4 w-[90%] overflow-y-autos">
            {providers?.map((doctor) => (
                <DoctorCard doctor={doctor} schedule={handleNewAppointmentOpen} user={user} fav={false}/>
            ))}
            </div>
            <p className='redRose lg:ml-14 ml-6 mt-4 text-[#1EBDB8] font-semibold text-[20px]'>Explore Treatments accross specialties</p>
            <div className='grid lg:grid-cols-4 grid-cols-2 w-[90%] items-center text-[#1EBDB8] mx-auto mb-12'>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#1EBDB8] hover:text-white hover:bg-opacity-70 duration-300 shadow-md py-4 h-32 rounded-[30px] items-center text-center m-4' onClick={(e)=> {setSearchTerm('Primary Care'); setSearchActive(true)}}><div><img src="/1.png" alt="logo" className='w-14 h-14 mb-4'/></div> <p>Primary Care </p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#1EBDB8] hover:text-white hover:bg-opacity-70 duration-300 shadow-md py-4 h-32 rounded-[30px] items-center text-center m-4' onClick={(e)=> {setSearchTerm('Dermatologist'); setSearchActive(true)}}><div><img src="/ps.png" alt="logo" className='w-14 h-14 mb-4' /></div> <p>Dermatologist</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#1EBDB8] hover:text-white hover:bg-opacity-70 duration-300 shadow-md py-4 h-32 rounded-[30px] items-center text-center m-4' onClick={(e)=> {setSearchTerm('Dentist'); setSearchActive(true)}}><div><img src="/neo.png" alt="logo" className='w-14 h-14 mb-4' /></div> <p>Dentist</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#1EBDB8] hover:text-white hover:bg-opacity-70 duration-300 shadow-md py-4 h-32 rounded-[30px] items-center text-center m-4' onClick={(e)=> {setSearchTerm('Cardiologist'); setSearchActive(true)}}><div><img src="/5.png" alt="logo" className='w-14 h-14 mb-4' /></div> <p>Cardiologist</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#1EBDB8] hover:text-white hover:bg-opacity-70 duration-300 shadow-md py-4 h-32 rounded-[30px] items-center text-center m-4' onClick={(e)=> {setSearchTerm('Orthopedist'); setSearchActive(true)}}><div><img src="/rhe.png" alt="logo" className='w-14 h-14 mb-4' /></div> <p>Orthopedist</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#1EBDB8] hover:text-white hover:bg-opacity-70 duration-300 shadow-md py-4 h-32 rounded-[30px] items-center text-center m-4' onClick={(e)=> {setSearchTerm('Psychiatrist'); setSearchActive(true)}}><div><img src="/4.png" alt="logo" className='w-14 h-14 mb-4' /></div> <p>Psychiatrist</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#1EBDB8] hover:text-white hover:bg-opacity-70 duration-300 shadow-md py-4 h-32 rounded-[30px] items-center text-center m-4' onClick={(e)=> {setSearchTerm('Pediatrician'); setSearchActive(true)}}><div><img src="/rds.png" alt="logo" className='w-14 h-14 mb-4' /></div> <p>Pediatrician</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#1EBDB8] hover:text-white hover:bg-opacity-70 duration-300 shadow-md py-4 h-32 rounded-[30px] items-center text-center m-4' onClick={(e)=> {setSearchTerm('Gynecologist'); setSearchActive(true)}}><div><img src="/3.png" alt="logo" className='w-14 h-14 mb-4' /></div> <p>Gynecologist</p></div>
                      

            </div>
        </div>
       )}
       
       </>
    );
}

export default ExplorePage;