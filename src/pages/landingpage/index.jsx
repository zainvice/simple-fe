import React, { useState, useEffect } from 'react';
import SpecialtyDropdown from '../../dropdowns/patient/specialtySelector';
import DoctorCard from '../../common/patient/doctorcard';
import LoginDropdown from '../../dropdowns/loginDropdown';
import Loginoverlay from '../../overlays/patient/loginoverlay';

const LandingPage = () => {

    const [topDoctors, setTopDoctors] = useState([
        {
          id: 1,
          name: 'Dr. Adam Cooper',
          qualification: 'Dermatologist, Cosmetologist',
          university: 'M.B.B.S., F.C.P.S. (Dermatology)',
          rating: 4.8,
          doctorImage: 'https://via.placeholder.com/100', 
          reviews: [
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
    
          ],
          features: 'New Patient Appointments . Excellent wait time . Highly Recommended'
        },
        {
          id: 2,
          name: 'Dr. Adam Cooper',
          qualification: 'Dermatologist, Cosmetologist',
          university: 'M.B.B.S., F.C.P.S. (Dermatology)',
          rating: 4.8,
          doctorImage: 'https://via.placeholder.com/100',
          reviews: [
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
    
          ],
          features: 'New Patient Appointments . Excellent wait time . Highly Recommended'
        },
        {
            id: 1,
            name: 'Dr. Adam Cooper',
            qualification: 'Dermatologist, Cosmetologist',
            university: 'M.B.B.S., F.C.P.S. (Dermatology)',
            rating: 4.8,
            doctorImage: 'https://via.placeholder.com/100', 
            reviews: [
              {name: '', review: ''},
              {name: '', review: ''},
              {name: '', review: ''},
              {name: '', review: ''},
              {name: '', review: ''},
      
            ],
            features: 'New Patient Appointments . Excellent wait time . Highly Recommended'
          },
          {
            id: 2,
            name: 'Dr. Adam Cooper',
            qualification: 'Dermatologist, Cosmetologist',
            university: 'M.B.B.S., F.C.P.S. (Dermatology)',
            rating: 4.8,
            doctorImage: 'https://via.placeholder.com/100',
            reviews: [
              {name: '', review: ''},
              {name: '', review: ''},
              {name: '', review: ''},
              {name: '', review: ''},
              {name: '', review: ''},
      
            ],
            features: 'New Patient Appointments . Excellent wait time . Highly Recommended'
          },
          {
            id: 1,
            name: 'Dr. Adam Cooper',
            qualification: 'Dermatologist, Cosmetologist',
            university: 'M.B.B.S., F.C.P.S. (Dermatology)',
            rating: 4.8,
            doctorImage: 'https://via.placeholder.com/100', 
            reviews: [
              {name: '', review: ''},
              {name: '', review: ''},
              {name: '', review: ''},
              {name: '', review: ''},
              {name: '', review: ''},
      
            ],
            features: 'New Patient Appointments . Excellent wait time . Highly Recommended'
          },
          {
            id: 2,
            name: 'Dr. Adam Cooper',
            qualification: 'Dermatologist, Cosmetologist',
            university: 'M.B.B.S., F.C.P.S. (Dermatology)',
            rating: 4.8,
            doctorImage: 'https://via.placeholder.com/100',
            reviews: [
              {name: '', review: ''},
              {name: '', review: ''},
              {name: '', review: ''},
              {name: '', review: ''},
              {name: '', review: ''},
      
            ],
            features: 'New Patient Appointments . Excellent wait time . Highly Recommended'
          },
      ]);
    const [isLoginDropdownOpen, setLoginDropdownOpen] = useState(false)

    const toggleLoginDropdown = () => {
        setLoginDropdownOpen(!isLoginDropdownOpen)
    }
    const [isLoginOverlayOpen, setLoginOverlayOpen] = useState(false)

    const toggleLoginOverlay = () => {
        setLoginOverlayOpen(!isLoginOverlayOpen)
    }
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
        <div className='w-screen m-0 p-0 flex flex-col items-center '>
            <div className='bg-[#1E232F] absolute top-0 left-0 w-full lg:h-[600px] h-[500px] z-[-1]'></div>
         
                <header className='flex justify-between my-5 w-[80%] relative'>
                    <div className='lg:ml-20 mt-4 w-[120px]'>
                        <img src="./logo.png" alt="LOGO_IMG" />
                    </div>
                    <div className='hidden lg:flex w-[300px] text-white text-sm mt-8 justify-around'>
                      <a href="#experince">Experience</a>
                      <a href="#global">Global&nbsp;Plans</a>
                      
                      <a href="#consultation">Consultation</a>
                     
                    </div>
                    <div className='lg:mr-20 mt-5 space-x-6 hidden lg:flex'>
                        <div className='flex cursor-pointer' onClick={toggleLoginDropdown}>
                            <a className='mt-2 text-white'>Login</a>
                            <span class="material-symbols-outlined mt-2 text-white mx-2 cursor-pointer" >keyboard_arrow_down</span>
                        </div>
                        <button className='bg-white text-sm px-5 py-2 text-[#1E232F] rounded-[20px]' onClick={(e)=> window.location.href = 'auth/patient/signup'}>Book Now</button>
                    </div>
                    {isLoginDropdownOpen&&<LoginDropdown toggleLoginOverlay={toggleLoginOverlay}/>}
                   
                </header>
                {isLoginOverlayOpen&&<Loginoverlay onClose={toggleLoginOverlay}/>}
                <div className='flex flex-col items-center justify-center text-center text-white lg:h-[500px] w-[90%] lg:w-[50%]' >
                    <h1 className='text-[30px] lg:text-[60px]'>Find World's Best <br/>Medical Care</h1>
                    <p className='text-[13px] lg:text-[20px] my-4 mt-8 text-normal'> Find The Best Hospitals and Doctors Near You!</p>
                    <div className='hidden border-black lg:flex flex-col lg:flex-row w-full justify-between items-center h-[60px] mt-[40px]'>
                        
                        <div className='w-full lg:w-[90%] flex rounded-l-full bg-white bg-opacity-30 px-4 py-4 relative'>
                            {viewFilter&& <SpecialtyDropdown setSearchTerm={setSearchValue} searchTerm = {searchTerm}/>}
                            <div className='flex lg:w-[90%]'>
                                
                                <input type="text" value={searchTerm} onChange={onSearchTermChange} onFocus={onViewFilter} className='bg-transparent placeholder-white ml-2 border-none outline-none focus:ring-0 caret-white'  placeholder ='Search disease, hospitals'/>
                            </div>
                            <div className='flex'>
                                <span className="material-symbols-outlined mt-1" style={{ fontSize: "24px" }}>
                                    location_on
                                </span>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)} // Allow manual editing if needed
                                    placeholder={error || "Fetching location..."}
                                    className='bg-transparent placeholder-white ml-2 border-none outline-none focus:ring-0 caret-white'
                                />
                            </div>
                        </div>
                        <button className='bg-white text-[16px] mt-6 lg:mt-0 -ml-8 p-5 text-[#1E232F] rounded-full' onClick={(e)=> window.location.href = 'auth/patient/signup'} >Explore&nbsp;Premium&nbsp;Care</button>
                    </div>
                    <div className='lg:hidden flex-col'>
                        <div className='flex flex-col mx-auto'>
                                <div className='flex w-full'>
                                    
                                    <input type="text" className='w-full bg-white rounded-full p-4 placeholder-gray-400 border-none outline-none focus:ring-0 caret-gray-400'  placeholder ='Search disease, hospitals'/>
                                </div>
                                <div className='flex bg-white p-4 my-2 rounded-full text-[#1E232F] '>
                                    <span className="material-symbols-outlined mt-1" style={{ fontSize: "24px" }}>
                                        location_on
                                    </span>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)} // Allow manual editing if needed
                                        placeholder={error || "Fetching location..."}
                                        className='bg-transparent placeholder-gray-400 ml-2 border-none outline-none focus:ring-0 caret-gray-400'
                                    />
                                </div>
                            </div>
                            <button className='bg-white text-[16px] my-2 lg:mt-0 p-4 text-[#1E232F] rounded-full' onClick={(e)=> window.location.href = '/signup'} >Explore&nbsp;Premium&nbsp;Care</button>
                    </div>

                </div>
               
                <div className='flex flex-col lg:flex-row text-center lg:text-left justify-between w-[80%] my-20 -z-10' id='experience'>
                    <p className='poppins text-[#28574E] text-[30px] lg:w-1/2 '>
                        Simplify Your Healthcare <br/>Journey with Simple
                    </p>
                    <p className='text-[#757575] lg:w-1/2 text-justify lg:ml-8 text-[18px]'>
                        At Simple, we transform the way you access healthcare in the United States. With seamless navigation through top-tier medical facilities, access to expert professionals, and tailored solutions, our platform ensures a smooth and stress-free healthcare experience. Whether it’s personalized care plans, 24/7 virtual consultations, or streamlined medical tourism services, we’re here to guide you every step of the way. Let Simple be your trusted partner in achieving optimal health and wellness. Connect with us today and take the first step towards exceptional care.
                    </p>
                </div>

                <div className='flex flex-col lg:flex-row justify-around w-[80%] relative my-20'>
                    <div className='flex relative flex-col pb-20 bg-white text-center items-center p-5 py-8 mx-6 rounded-[30px] shadow-md my-4 lg:w-[33%]'>
                        <span className="material-symbols-outlined text-[#1EBDB8] text-[56px]"> calendar_add_on </span>
                        <h1 className='font-medium text-[24px] my-6'>Appointment Scheduling</h1>
                        <p className='text-[#757575]'> Explore an intuitive platform to schedule, manage, and track healthcare appointments with ease.</p>
                        <button className='bg-[#1EBDB8] shadow-md absolute -bottom-6 rounded-[30px] text-white px-5 py-3 text-sm'>Get Started</button>
                    </div>
                    <div className='flex relative flex-col pb-20 bg-white text-center items-center p-5 py-8 mx-6 rounded-[30px] shadow-md my-4 lg:w-[33%]'>
                        <span className="material-symbols-outlined text-[#1EBDB8] text-[56px]"> settings_accessibility </span>
                        <h1 className='font-medium text-[24px] my-6'>Personalized Care</h1>
                        <p className='text-[#757575]'>Tailored experience based on patient history, and preferences for a truly unique experience.</p>
                        <button className='bg-[#1EBDB8] shadow-md absolute -bottom-6 rounded-[30px] text-white px-5 py-3 text-sm' onClick={(e)=> window.location.href = '/signup'}>Get Started</button>
                    </div>
                    <div className='flex relative flex-col pb-20 bg-white text-center items-center p-5 py-8 mx-6 rounded-[30px] shadow-md my-4 lg:w-[33%]'>
                        <span className="material-symbols-outlined text-[#1EBDB8] text-[56px]"> videocam </span>
                        <h1 className='font-medium text-[24px] my-6'>24/7 Virtual Connect</h1>
                        <p className='text-[#757575]'>Seamlessly connect with healthcare professionals anytime, anywhere, through our HIPPA Approved video consultation platform.</p>
                        <button className='bg-[#1EBDB8] shadow-md absolute -bottom-6 rounded-[30px] text-white px-5 py-3 text-sm' onClick={(e)=> window.location.href = '/signup'}>Get Started</button>
                    </div>
                </div>


                <div className='flex px-8 py-6 relative justify-between w-[80%] my-20 lg:bg-transparent bg-[#1E232F] text-center lg:text-left rounded-[20px]'>
                    <div className='lg:mt-52 lg:ml-20 mx-auto'>
                        <p className='poppins font-medium text-white text-[30px]'>Thousands of providers.
                        <br/>One app.</p>
                        <p className='poppins text-white text-sm'>The Zocdoc app is the quickest, easiest way to <br/> book and keep track of your appointments.</p>
                        <button className='bg-white text-[#1E232F] rounded-[30px] mt-6 px-5 lg:py-3 py-2' onClick={(e)=> window.location.href = '/signup'} >Book Now</button>
                    </div>
                    <div className='-mb-6 lg:block hidden'>
                        <img src="./calldoc.png" alt="doc-img" />
                       
                    </div>
                    <div className='hidden lg:block absolute top-[150px] left-0 w-full h-[70%] bg-[#1E232F] rounded-[40px] z-[-1]' id='rectangle'></div>
                </div>
                <div  className='flex flex-col justify-between w-[80%] my-20 items-center text-center'>
                    <p className='poppins font-medium text-[#28574E] text-[40px] my-10'>Our Top Providers</p>
                    <div className="grid mx-auto lg:grid-cols-3 grid-cols-1 gap-4 w-full">
                        {topDoctors.map((doctor) => (
                            <DoctorCard doctor={doctor} schedule={(e)=> window.location.href = '/signup'} fav={false}/>
                        ))}
                    </div>

                </div>
                <div className='flex flex-col justify-between w-[80%] my-20'>
                    <p className='poppins font-medium text-[#28574E] lg:text-[40px] text-[25px] text-center lg:text-left lg:w-[380px]' >Explore Treatments<br/> across specialties</p>
                    <div className='grid lg:grid-cols-5 grid-cols-2'>
                        <div className='flex flex-col bg-white shadow-md cursor-pointer py-8 rounded-[30px] items-center text-center m-4'><div><img src="./1.png" alt="logo" /></div> <p>Onocology</p></div>
                        <div className='flex flex-col bg-white shadow-md cursor-pointer py-8 rounded-[30px] items-center text-center m-4'><div><img src="./2.png" alt="logo" /></div> <p>Endocrinology</p></div>
                        <div className='flex flex-col bg-white shadow-md cursor-pointer py-8 rounded-[30px] items-center text-center m-4'><div><img src="./3.png" alt="logo" /></div> <p>Infertility</p></div>
                        <div className='flex flex-col bg-white shadow-md cursor-pointer py-8 rounded-[30px] items-center text-center m-4'><div><img src="./4.png" alt="logo" /></div> <p>Mental Health</p></div>
                        <div className='flex flex-col bg-white shadow-md cursor-pointer py-8 rounded-[30px] items-center text-center m-4'><div><img src="./5.png" alt="logo" /></div> <p>Cardiology</p></div>
                        <div className='flex flex-col bg-white shadow-md cursor-pointer py-8 rounded-[30px] items-center text-center m-4'><div><img src="./neo.png" alt="logo" /></div> <p>Neurology</p></div>
                        <div className='flex flex-col bg-white shadow-md cursor-pointer py-8 rounded-[30px] items-center text-center m-4'><div><img src="./rhe.png" alt="logo" /></div> <p>Rheumatology</p></div>
                        <div className='flex flex-col bg-white shadow-md cursor-pointer py-8 rounded-[30px] items-center text-center m-4'><div><img src="./ps.png" alt="logo" /></div> <p>Plastice Surgery</p></div>
                        <div className='flex flex-col bg-white shadow-md cursor-pointer py-8 rounded-[30px] items-center text-center m-4'><div><img src="./rds.png" alt="logo" /></div> <p>Rare Diseases</p></div>
                        <div className='flex flex-col bg-white shadow-md cursor-pointer py-8 rounded-[30px] items-center text-center m-4'><div><img src="./sg.png" alt="logo" /></div> <p>Surrogacy</p></div>

                    </div>

                </div>
                <div className='flex flex-col lg:flex-row justify-between w-[80%] lg:my-20 my-5'>
                    <div><img src="./tophosp.png" alt="clinics-img" /></div>
                    <div className='lg:mt-60 mt-5 lg:ml-10 lg:w-1/2'><p className='text-[#28574E] lg:font-medium font-semibold poppins lg:text-[40px] text-[12px] text-center'>World’s Best USA Hospitals & Research Centers</p></div>
                </div>
               
              
                
                
                <footer className='bg-[#1E232F] w-full relative text-white flex items-center flex-col'>
                    <div className='flex flex-col lg:flex-row justify-between w-[90%]'>
                        <div className='w-[160px] my-10'>
                            <img src="./logo.png" alt="logo" />
                        </div>
                        <div className='flex my-10 mr-6 h-10'>
                            <img src="./sfb.png" alt="social" className='mx-2'/>
                            <img src="./sig.png" alt="social" className='mx-2'/>
                            <img src="./sin.png" alt="social" className='mx-2'/>
                            <img src="./syt.png" alt="social" className='mx-2'/>
                            <img src="./spin.png" alt="social" className='mx-2'/>
                        </div>
                    </div>
                    <div className='w-[90%] h-[2px] rounded-full bg-white'></div>
                    <div className='flex flex-col lg:flex-row mx-20 my-10 w-[90%] text-center lg:text-left'>
                        <div className='lg:w-1/4 text-sm mr-6'>
                            <p className='font-semibold text-[18px] my-5'>About Simple</p>
                            <p>Simple is a medical care USA platform bridging the gap in speciality care by connecting patients around the states from their homes to the top hospitals and specialists in the USA.</p>
                        </div>
                        <div className='lg:w-1/4 text-sm mx-6 flex flex-col'>
                            <p className='font-semibold text-[18px] my-5' >Useful Links</p>
                            <a href="/login">Login</a>
                            <a href="/signup">Sign Up</a>
                            <a href="#experince">Experience</a>
                            <a href="#global">Global Plans</a>  
                            <a href="#consultation">Consultation</a>
                        </div>
                        <div className='lg:w-1/4 text-sm mx-6'>
                            <p className='font-semibold text-[18px] my-5' >Contact Info</p>
                            <div className='bg-white bg-opacity-10 rounded-[10px] px-4 py-2 flex'>
                                <img src="./Email.png" alt="" />
                                <p className='ml-5'>hello@simple.com</p>
                            </div>

                        </div>
                        <div className='lg:w-1/4 text-sm lg:ml-6 '>
                            <p className='font-semibold text-[18px] my-5' >Legal</p>
                            <p>Privacy Policy</p>
                            <p>Terms Conditions</p>
                            <p>License</p>
                            <p>Resources</p>
                        </div>
                        
                    </div>
                    <div className='w-[90%] h-[2px] rounded-full bg-white'></div>
                    <div className='text-left w-[90%] my-4 text-sm font-thin'><p>©  2024 Simple. All Rights Reserved.</p></div>
                </footer>
          
        </div>
    );
}

export default LandingPage;