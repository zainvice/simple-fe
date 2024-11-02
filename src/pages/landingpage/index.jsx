import React from 'react';

const LandingPage = (props) => {
    return (
        <div className='w-screen m-0 p-0'>
            <div className='bg-[#00874E] absolute top-0 left-0 w-full h-[920px] z-[-1]'></div>
         
                <header className='flex justify-between my-5 mx-[100px]'>
                    <div className='ml-20 mt-4 w-[120px]'>
                        <img src="./logo.png" alt="LOGO_IMG" />
                    </div>
                    <div className='flex w-[300px] text-white text-sm mt-8 justify-around'>
                      <a href="#experince">Experience</a>
                      <a href="#">Global&nbsp;Plans</a>
                      
                      <a href="#">Consultation</a>
                      <a href="#">Login</a>
                    </div>
                    <div className='mr-20 mt-5 '>
                        <button className='bg-white text-sm px-5 py-2 text-[#00874E] rounded-[20px]'>Book Now</button>
                    </div>
                </header>
                <div className='flex flex-col items-center justify-center text-center text-white h-[500px]' >
                    <h1 className='text-[60px]'>World's Best Advanced <br/>Medical Care</h1>
                    <p className='text-[22px] text-normal'> Find The Best Hospitals and Doctors Across the States</p>
                    <div className='border-black flex w-[600px] h-[60px] mt-[40px]'>
                        
                        <div className='w-[80%] flex rounded-full bg-white bg-opacity-30 px-4 py-2'>
                            <img className='w-[25px] h-[25px] mt-2' src="./search.png" alt="search" /> <input type="text" className='bg-transparent placeholder-white ml-2 border-none outline-none focus:ring-0 caret-white'  placeholder ='Search disease, hospitals'/>
                            </div>
                        <button className='bg-white text-[16px] ml-4 px-4 py-4 text-[#00874E] rounded-full'>Explore&nbsp;Premium&nbsp;Care &nbsp;</button>
                    </div>

                </div>
                <div className='flex items-center justify-center -mt-[70px]'>
                    <img src="./landingPage.png" alt="landing_page" />
                </div>
                <div className='flex justify-between mx-[300px] my-20' id='experince'>
                
                        <p className='poppins text-[#28574E]'>Experience Exceptional Healthcare In The USA With Simple USA</p>
                    
                    
                        <p className='text-[#757575]'>Discover the pinnacle of healthcare services in the United States, where advancements, quality, cutting edge research, expert doctors and a commitment to patient success, combine to provide an unparalleled medical tourism experience. Omnicure USA is your dedicated partner, guiding you towards improved health and wellness. Connect with us today and embark on a journey of exceptional USA healthcare services.</p>
                  
                </div>
                <div className='flex justify-around mx-[300px] my-20'>
                    <div className='flex flex-col bg-[#F9F9F9] text-center items-center p-5 mx-6'>
                        <img src="" alt="img-so" />
                        <h1>Second Opinion</h1>
                        <p>When facing a serious, life-changing illness, we understand the critical importance of obtaining expert advices</p>
                        <button>Get Started</button>
                    </div>
                    <div className='flex flex-col bg-[#F9F9F9] text-center items-center p-5 mx-6'>
                        <img src="" alt="img-t" />
                        <h1>Treatment</h1>
                        <p>Get help from the best chosen hospitals and specialists that excel in providing premium healthcare directly from the United States.</p>
                        <button>Get Started</button>
                    </div>
                    <div className='flex flex-col bg-[#F9F9F9] text-center items-center p-5 mx-6'>
                        <img src="" alt="img-globle" />
                        <h1>Treatment</h1>
                        <p>Get help from the best chosen hospitals and specialists that excel in providing premium healthcare directly from the United States.</p>
                        <button>Get Started</button>
                    </div>
                </div>

                <div className='flex justify-between mx-[300px] my-20'>
                    <div>
                        <p>Teleconsult Our Patient Advisors</p>
                        <button>Get Started</button>
                    </div>
                    <div>
                        <img src="" alt="doc-img" />
                        <img src="" alt="phone-img" />
                    </div>
                    <div className='absolute'></div>
                </div>
                <div className='flex justify-between mx-[300px] my-20'>
                    <div><img src="" alt="clinics-img" /></div>
                    <div><p>World’s Best USA Hospitals & Research Centers</p></div>
                </div>
                <div className='bg-[#1E232F] text-white flex flex-col items-center text-center'>
                        <div>
                            <h1>Global Plans</h1>
                            <p>World’s Best USA Healthcare, Now Accessible and Affordable  with MediPocket Global Membership Plan</p>
                        </div>
                        <div className='flex justify-between'>
                            <div className='bg-[#FFFFF] bg-opacity-30'>
                             <h2>Global Life</h2>
                             <p>Starting At</p>
                             <h1>$10 Month</h1>
                             <ul>
                                <li>Global Health Coverage IN 50L-3Cr</li>

                                <li>USA Health Advisor</li>

                                <li>Discounted USA Medication </li>

                                <li>Visa Assistance</li>

                                <li>Preventative Genetic Screening</li>

                                <li>Global Concierge Service </li>
                             </ul>
                             <button>Get Started</button>
                             </div>
                            <div className='bg-[#FFFFF] bg-opacity-30'>
                             <h2>Global Life</h2>
                             <p>Starting At</p>
                             <h1>$10 Month</h1>
                             <ul>
                                <li>Global Health Coverage IN 50L-3Cr</li>

                                <li>USA Health Advisor</li>

                                <li>Discounted USA Medication </li>

                                <li>Visa Assistance</li>

                                <li>Preventative Genetic Screening</li>

                                <li>Global Concierge Service </li>
                             </ul>
                             <button>Get Started</button>
                      
                        </div>
                    </div>

                </div>
                <div className='flex flex-col justify-between mx-[300px] my-20'>
                    <p>Explore Treatments across specialties</p>
                    <div className='grid grid-cols-5'>
                        <div className='flex flex-col'><img src="" alt="logo" /> <p>Onocology</p></div>
                        <div className='flex flex-col'><img src="" alt="logo" /> <p>Onocology</p></div>
                        <div className='flex flex-col'><img src="" alt="logo" /> <p>Onocology</p></div>
                        <div className='flex flex-col'><img src="" alt="logo" /> <p>Onocology</p></div>
                        <div className='flex flex-col'><img src="" alt="logo" /> <p>Onocology</p></div>
                        <div className='flex flex-col'><img src="" alt="logo" /> <p>Onocology</p></div>
                        <div className='flex flex-col'><img src="" alt="logo" /> <p>Onocology</p></div>
                        <div className='flex flex-col'><img src="" alt="logo" /> <p>Onocology</p></div>
                        <div className='flex flex-col'><img src="" alt="logo" /> <p>Onocology</p></div>
                        <div className='flex flex-col'><img src="" alt="logo" /> <p>Onocology</p></div>

                    </div>

                </div>
                <div  className='flex flex-col justify-between mx-[300px] my-20 items-center text-center'>
                    <p>World’s Top Doctors</p>
                    <img src="" alt="Doctors" />

                </div>
                <div className='flex bg-[#E8E7E3] rounded-[20px] mx-[300px] my-20'>
                    <form action="">
                        <h1>Book A Free Consultation</h1>
                    </form>
                    <img src="" alt="" />
                </div>
                <footer className='bg-[#28574E] text-white'>
                    <div className='flex justify-between mx-20'>
                        <div className='w-[160px] my-10'>
                            <img src="./logo.png" alt="logo" />
                        </div>
                        <div className='flex my-10'>
                            <img src="" alt="social" />
                            <img src="" alt="social" />
                            <img src="" alt="social" />
                            <img src="" alt="social" />
                            <img src="" alt="social" />
                        </div>
                    </div>
                    <img src="" alt="line" />
                    <div className='flex mx-20'>
                        <div>
                            <p>About Simple</p>
                            <p>Simple is a medical care USA platform bridging the gap in speciality care by connecting patients around the states from their homes to the top hospitals and specialists in the USA.</p>
                        </div>
                        <div>
                            <p>Useful Links</p>
                            <a href="">Link</a>
                            <a href="">Link</a>
                            <a href="">Link</a>
                            <a href="">Link</a>
                            <a href="">Link</a>
                        </div>
                        <div>
                            <p>Contact Info</p>

                        </div>
                        <div>
                            <p>Legal</p>
                            <p>Privacy Policy</p>
                            <p>Terms Conditions</p>
                            <p>License</p>
                            <p>Resources</p>
                        </div>
                        
                    </div>
                    <img src="" alt="line" />
                    <p>©  2024 Simple USA. All Rights Reserved.</p>
                </footer>
          
        </div>
    );
}

export default LandingPage;