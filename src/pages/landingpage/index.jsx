import React from 'react';

const LandingPage = (props) => {
    return (
        <div className='w-screen m-0 p-0'>
            <div className='bg-[#00874E] absolute top-0 left-0 w-full h-[880px] z-[-1]'></div>
            <div className='w-full flex-col'>
                <div className='w-full flex justify-between'>
                    <div className='ml-20 mt-4 w-[100px]'>
                        <img src="./logo.png" alt="LOGO_IMG" />
                    </div>
                    <div className='flex w-60 text-white text-sm mt-8 justify-around'>
                      <a href="#">Login</a>
                      <a href="#">Login</a>
                      <a href="#">Login</a>
                      <a href="#">Login</a>
                      <a href="#">Login</a>
                    </div>
                    <div className='mr-20 mt-5 '>
                        <button className='bg-white text-sm px-5 py-2 text-[#00874E] rounded-[20px]'>Book Now</button>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center text-center text-white h-[500px]'>
                    <h1 className='text-[60px]'>World's Best Advanced <br/>Medical Care</h1>
                    <h2 className='text-[22px] text-normal'> Find The Best Hospitals and Doctors Across the States</h2>
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
                
            </div>
            
        </div>
    );
}

export default LandingPage;