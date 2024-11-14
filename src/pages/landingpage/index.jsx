import React from 'react';
import Button from '../../common/button';

const LandingPage = () => {

    return (
        <div className='w-screen m-0 p-0 flex flex-col items-center'>
            <div className='bg-[#1EBDB8] absolute top-0 left-0 w-full h-[500px] lg:h-[820px] z-[-1]'></div>
         
                <header className='flex justify-between my-5 w-[80%]'>
                    <div className='lg:ml-20 mt-4 w-[120px]'>
                        <img src="./logo.png" alt="LOGO_IMG" />
                    </div>
                    <div className='hidden lg:flex w-[300px] text-white text-sm mt-8 justify-around'>
                      <a href="#experince">Experience</a>
                      <a href="#global">Global&nbsp;Plans</a>
                      
                      <a href="#consultation">Consultation</a>
                      <a href="/login">Login</a>
                    </div>
                    <div className='lg:mr-20 mt-5 '>
                        <button className='bg-white text-sm px-5 py-2 text-[#1EBDB8] rounded-[20px]' onClick={(e)=> window.location.href = '/signup'}>Book Now</button>
                    </div>
                </header>
                <div className='flex flex-col items-center justify-center text-center text-white lg:h-[500px] w-[90%] lg:w-[50%]' >
                    <h1 className='text-[30px] lg:text-[60px]'>World's Best Advanced <br/>Medical Care</h1>
                    <p className='text-[13px] lg:text-[22px] text-normal'> Find The Best Hospitals and Doctors Across the States</p>
                    <div className='border-black flex flex-col lg:flex-row w-full justify-between items-center h-[60px] mt-[40px]'>
                        
                        <div className='w-full lg:w-[90%] flex rounded-full bg-white bg-opacity-30 px-4 py-3'>
                            <img className='w-[15px] h-[15px] lg:w-[25px] lg:h-[25px] mt-1 ' src="./search.png" alt="search" /> <input type="text" className='bg-transparent placeholder-white ml-2 border-none outline-none focus:ring-0 caret-white'  placeholder ='Search disease, hospitals'/>
                        </div>
                        <button className='bg-white text-[16px] mt-6 lg:mt-0 lg:ml-4 p-3 text-[#1EBDB8] rounded-full' onClick={(e)=> window.location.href = '/signup'} >Explore&nbsp;Premium&nbsp;Care</button>
                    </div>

                </div>
                <div className='flex items-center justify-center mt-20 w-[80%] lg:-mt-[70px]'>
                    <img src="./landingPage.png" alt="landing_page" />
                </div>
                <div className='flex justify-between w-[80%] my-20' id='experince'>
                
                        <p className='poppins text-[#28574E] text-[30px] w-1/2'>Experience Exceptional Healthcare In The USA With Simple USA</p>
                    
                    
                        <p className='text-[#757575] w-1/2 text-justify mt-3 ml-8 text-[18px]'>Discover the pinnacle of healthcare services in the United States, where advancements, quality, cutting edge research, expert doctors and a commitment to patient success, combine to provide an unparalleled medical tourism experience. Omnicure USA is your dedicated partner, guiding you towards improved health and wellness. Connect with us today and embark on a journey of exceptional USA healthcare services.</p>
                  
                </div>
                <div className='flex justify-around w-[80%] relative my-20'>
                    <div className='flex flex-col pb-20 bg-[#F9F9F9] text-center items-center p-5 py-8 mx-6 rounded-[30px] shadow-md w-[33%]'>
                        <img src="./se.png" alt="img-so" />
                        <h1 className='font-medium text-[24px] my-6'>Second Opinion</h1>
                        <p className='text-[#757575]'>When facing a serious, life-changing illness, we understand the critical importance of obtaining expert advices</p>
                        <button className='bg-[#1EBDB8] shadow-md absolute -bottom-6 rounded-[30px] text-white px-5 py-3 text-sm'>Get Started</button>
                    </div>
                    <div className='flex flex-col pb-20 bg-[#F9F9F9] text-center items-center p-5 py-8 mx-6 rounded-[30px] shadow-md w-[33%]'>
                        <img src="./treat.png" alt="img-t" />
                        <h1 className='font-medium text-[24px] my-6'>Treatment</h1>
                        <p className='text-[#757575]'>Get help from the best chosen hospitals and specialists that excel in providing premium healthcare directly from the United States.</p>
                        <button className='bg-[#1EBDB8] shadow-md absolute -bottom-6 rounded-[30px] text-white px-5 py-3 text-sm' onClick={(e)=> window.location.href = '/signup'} >Get Started</button>
                    </div>
                    <div className='flex flex-col pb-20 bg-[#F9F9F9] text-center items-center p-5 py-8 mx-6 rounded-[30px] shadow-md w-[33%]'>
                        <img src="./globe.png" alt="img-globle" />
                        <h1 className='font-medium text-[24px] my-6'>Glolal Plans</h1>
                        <p className='text-[#757575]'>Get help from the best chosen hospitals and specialists that excel in providing premium healthcare directly from the United States.</p>
                        <button className='bg-[#1EBDB8] shadow-md absolute -bottom-6 rounded-[30px] text-white px-5 py-3 text-sm' onClick={(e)=> window.location.href = '/signup'} >Get Started</button>
                    </div>
                </div>

                <div className='flex px-8 py-6 relative justify-between w-[80%] my-20'>
                    <div className='mt-60 ml-20'>
                        <p className='poppins font-medium text-white text-[30px]'>Teleconsult Our<br/>Patient Advisors</p>
                        <button className='bg-white text-[#1E232F] rounded-[30px] mt-6 px-5 py-3' onClick={(e)=> window.location.href = '/signup'} >Book A Call</button>
                    </div>
                    <div className='-mb-6'>
                        <img src="./calldoc.png" alt="doc-img" />
                       
                    </div>
                    <div className='absolute top-[150px] left-0 w-full h-[70%] bg-[#1E232F] rounded-[40px] z-[-1]' id='rectangle'></div>
                </div>
                <div className='flex justify-between w-[80%] my-20'>
                    <div><img src="./tophosp.png" alt="clinics-img" /></div>
                    <div className='mt-60 ml-10 w-1/2'><p className='text-[#28574E] font-medium poppins text-[40px]'>World’s Best USA Hospitals & Research Centers</p></div>
                </div>
                <div className='bg-[#1E232F] w-full p-16 text-white flex flex-col items-center text-center' id='global'>
                        <div>
                            <h1 className='text-[30px] poppins font-medium'>Global Plans</h1>
                            <p>World’s Best USA Healthcare, Now Accessible and Affordable<br/>with MediPocket Global Membership Plan</p>
                        </div>
                        <div className='flex justify-between w-[80%] mt-10'>
                            <div className='bg-white bg-opacity-[5%] rounded-[40px] mx-10 px-6 py-8 text-left w-1/2 '>
                             <h2 className='font-medium text-[22px]'>Global Life</h2>
                             <p className='text-white opacity-40'>Starting At</p>
                             <h1 className='poppins font-medium text-[30px]'>$10 Month</h1>
                             <ul className='list-disc text-sm my-5 ml-5'>
                                <li>Global Health Coverage IN 50L-3Cr</li>

                                <li>USA Health Advisor</li>

                                <li>Discounted USA Medication </li>

                                <li>Visa Assistance</li>

                                <li>Preventative Genetic Screening</li>

                                <li>Global Concierge Service </li>
                             </ul>
                             <button className='bg-white text-[#1E232F] px-5 py-3 rounded-[30px] shadow-md'>Get Started</button>
                             </div>
                            <div className='bg-white bg-opacity-[5%] rounded-[40px] mx-10 px-6 py-8 text-left w-1/2 '>
                             <h2 className='font-medium text-[22px]'>Global Family</h2>
                             <p className='text-white opacity-40'>Starting At</p>
                             <h1 className='poppins font-medium text-[30px]'>$45 Month</h1>
                             <ul className='list-disc text-sm my-5 ml-5'>
                                <li>Global Health Coverage IN 50L-3Cr</li>

                                <li>USA Health Advisor</li>

                                <li>Discounted USA Medication </li>

                                <li>Visa Assistance</li>

                                <li>Preventative Genetic Screening</li>

                                <li>Global Concierge Service </li>
                             </ul>
                             <button className='bg-white text-[#1E232F] px-5 py-3 rounded-[30px] shadow-md' onClick={(e)=> window.location.href = '/signup'} >Get Started</button>
                      
                        </div>
                    </div>

                </div>
                <div className='flex flex-col justify-between w-[80%] my-20'>
                    <p className='poppins font-medium text-[#28574E] text-[40px] w-[380px]' >Explore Treatments<br/> across specialties</p>
                    <div className='grid grid-cols-5'>
                        <div className='flex flex-col bg-[#F9F9F9] py-8 rounded-[30px] items-center text-center m-4'><div><img src="./1.png" alt="logo" /></div> <p>Onocology</p></div>
                        <div className='flex flex-col bg-[#F9F9F9] py-8 rounded-[30px] items-center text-center m-4'><div><img src="./2.png" alt="logo" /></div> <p>Endocrinology</p></div>
                        <div className='flex flex-col bg-[#F9F9F9] py-8 rounded-[30px] items-center text-center m-4'><div><img src="./3.png" alt="logo" /></div> <p>Infertility</p></div>
                        <div className='flex flex-col bg-[#F9F9F9] py-8 rounded-[30px] items-center text-center m-4'><div><img src="./4.png" alt="logo" /></div> <p>Mental Health</p></div>
                        <div className='flex flex-col bg-[#F9F9F9] py-8 rounded-[30px] items-center text-center m-4'><div><img src="./5.png" alt="logo" /></div> <p>Cardiology</p></div>
                        <div className='flex flex-col bg-[#F9F9F9] py-8 rounded-[30px] items-center text-center m-4'><div><img src="./neo.png" alt="logo" /></div> <p>Neurology</p></div>
                        <div className='flex flex-col bg-[#F9F9F9] py-8 rounded-[30px] items-center text-center m-4'><div><img src="./rhe.png" alt="logo" /></div> <p>Rheumatology</p></div>
                        <div className='flex flex-col bg-[#F9F9F9] py-8 rounded-[30px] items-center text-center m-4'><div><img src="./ps.png" alt="logo" /></div> <p>Plastice Surgery</p></div>
                        <div className='flex flex-col bg-[#F9F9F9] py-8 rounded-[30px] items-center text-center m-4'><div><img src="./rds.png" alt="logo" /></div> <p>Rare Diseases</p></div>
                        <div className='flex flex-col bg-[#F9F9F9] py-8 rounded-[30px] items-center text-center m-4'><div><img src="./sg.png" alt="logo" /></div> <p>Surrogacy</p></div>

                    </div>

                </div>
                <div  className='flex flex-col justify-between w-[80%] my-20 items-center text-center'>
                    <p className='poppins font-medium text-[#28574E] text-[40px] my-10'>World’s Top Doctors</p>
                    <img src="./top_drs.png" alt="Doctors" />

                </div>
                <div className='flex relative bg-[#EEEEEC] rounded-[20px] w-[80%] my-20 overflow-hidden' id='consultation'>
                    <div className='flex flex-col w-[45%] p-8'>
                        <h1 className='poppins font-medium text-[#28574E] text-[40px] my-2 ml-10'>Book A Free Consultation</h1>
                        <form action="" className='w-[200%] p-8 top-[90px] -mt-20 z-10 -mb-40'>
                        
                        <div className='flex w-full '>
                            <input type="text" className='px-5 py-3 w-1/2 m-3 rounded-[30px] placeholder-[#969696] bg-white bg-opacity-[74%]' placeholder='First Name' />
                            <input type="text" className='px-5 py-3 w-1/2 m-3 rounded-[30px] placeholder-[#969696] bg-white bg-opacity-[74%]' placeholder='Last Name'/>
                        </div>
                        <div className='flex w-full'>
                            <input type="text" className='px-5 py-3 w-1/2 m-3 rounded-[30px] placeholder-[#969696] bg-white bg-opacity-[74%]' placeholder='Email' />
                            <input type="text" className='px-5 py-3 w-1/2 m-3 rounded-[30px] placeholder-[#969696] bg-white bg-opacity-[74%]' placeholder='Phone Number'/>
                        </div>
                        <div className='flex flex-col w-full'>
                            <input type="text" className='px-5 py-3  m-3 rounded-[30px] placeholder-[#969696] bg-white bg-opacity-[74%]' placeholder='State' />
                            <textarea type="text" rows='7' className='px-5 py-3  m-3 rounded-[30px] placeholder-[#969696] bg-white bg-opacity-[74%]' placeholder='Message'/>
                        </div>
                        <button className='bg-black m-3 text-white px-9 py-3 rounded-[30px] shadow-md'>Submit</button>
                        
                    </form>
                    </div>
                    
                    <div className='w-[80%]'>
                        <img src="./cosult.png" alt="img-form" className=''/>
                    </div>
                </div>
                <footer className='bg-[#28574E] w-full relative text-white flex items-center flex-col'>
                    <div className='flex justify-between w-[90%]'>
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
                    <div className='flex mx-20 my-10 w-[90%]'>
                        <div className='w-1/4 text-sm mr-6'>
                            <p className='font-semibold text-[18px] my-5'>About Simple</p>
                            <p>Simple is a medical care USA platform bridging the gap in speciality care by connecting patients around the states from their homes to the top hospitals and specialists in the USA.</p>
                        </div>
                        <div className='w-1/4 text-sm mx-6 flex flex-col'>
                            <p className='font-semibold text-[18px] my-5' >Useful Links</p>
                            <a href="/login">Login</a>
                            <a href="/signup">Sign Up</a>
                            <a href="#experince">Experience</a>
                            <a href="#global">Global Plans</a>  
                            <a href="#consultation">Consultation</a>
                        </div>
                        <div className='w-1/4 text-sm mx-6'>
                            <p className='font-semibold text-[18px] my-5' >Contact Info</p>
                            <div className='bg-white bg-opacity-10 rounded-[10px] px-4 py-2 flex'>
                                <img src="./Email.png" alt="" />
                                <p className='ml-5'>hello@simple.com</p>
                            </div>

                        </div>
                        <div className='w-1/4 text-sm ml-6 '>
                            <p className='font-semibold text-[18px] my-5' >Legal</p>
                            <p>Privacy Policy</p>
                            <p>Terms Conditions</p>
                            <p>License</p>
                            <p>Resources</p>
                        </div>
                        
                    </div>
                    <div className='w-[90%] h-[2px] rounded-full bg-white'></div>
                    <div className='text-left w-[90%] my-4 text-sm font-thin'><p>©  2024 Simple USA. All Rights Reserved.</p></div>
                </footer>
          
        </div>
    );
}

export default LandingPage;