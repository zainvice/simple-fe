import React, {useState} from 'react';
import DoctorCard from '../common/doctorcard';
const ExplorePage = ({handleNewAppointmentOpen, handleViewAppointmentOpen}) => {
    const [sponsordDoctors, setSponsordDoctors] = useState([
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
    return (
        <div className='mt-2 overflow-y-auto'>
            <p className='redRose lg:ml-14 ml-6 text-[#1EBDB8] font-semibold text-[20px]'>Explore Treatments accross specialties</p>
            <div className='grid lg:grid-cols-5 grid-cols-2 w-[90%] items-center text-[#1EBDB8] mx-auto'>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="./1.png" alt="logo" /></div> <p>Onocology</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="./2.png" alt="logo" /></div> <p>Endocrinology</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="./3.png" alt="logo" /></div> <p>Infertility</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="./4.png" alt="logo" /></div> <p>Mental Health</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="./5.png" alt="logo" /></div> <p>Cardiology</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="./neo.png" alt="logo" /></div> <p>Neurology</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="./rhe.png" alt="logo" /></div> <p>Rheumatology</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="./ps.png" alt="logo" /></div> <p>Plastice Surgery</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="./rds.png" alt="logo" /></div> <p>Rare Diseases</p></div>
                        <div className='flex flex-col bg-[#FFFFFF] cursor-pointer hover:bg-[#EAEAEA] duration-300 shadow-md py-4 rounded-[30px] items-center text-center m-4'><div><img src="./sg.png" alt="logo" /></div> <p>Surrogacy</p></div>

            </div>
            <p className='redRose lg:ml-14 ml-6 text-[#1EBDB8] font-semibold text-[20px]'>Sponsord</p>
            <div className="grid mx-auto lg:grid-cols-3 grid-cols-1 gap-4 w-[90%]">
            {sponsordDoctors.map((doctor) => (
                <DoctorCard doctor={doctor} schedule={handleNewAppointmentOpen} fav={true}/>
            ))}
            </div>
        </div>
    );
}

export default ExplorePage;