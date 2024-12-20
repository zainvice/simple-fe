import React, { useState } from 'react';
import Header from '../common/header';
import ChatPage from './chats';
import ProfilePage from './profile';
import MainDash from './maincontent';
import Appointments from './appointments';
import NewAppointmentOverlay from "./newappointmentoverlay";
import ViewAppointmentOverlay from "./viewappointmentoverlay";
import ExplorePage from './explore';


const doctors = [
    {
        name: "Dr. Adam Cooper",
        profession: "Cardiologist",
        avatar: "https://via.placeholder.com/50",
        rating: 4.8,
        reviews: [
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},

        ]
    },
    {
        name: "Dr. Shelly Christian",
        profession: "Therapist",
        avatar: "https://via.placeholder.com/50",
        rating: 4.9,
        reviews: [
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},

        ]
    },
    {
        name: "Dr. John Doe",
        profession: "Dentist",
        avatar: "https://via.placeholder.com/50",
        rating: 4.7,
        reviews: [
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},

        ]
    },
    {
        name: "Dr. Rachel Smith",
        profession: "Psychologist",
        avatar: "https://via.placeholder.com/50",
        rating: 4.6,
        reviews: [
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},

        ]
    },
];

const appointments = Array.from({ length: 6 }, () => {
    const doctors = [
        {
            name: "Dr. Adam Cooper",
            profession: "Cardiologist",
            avatar: "https://via.placeholder.com/50",
            rating: 4.8,
            reviews: [
                {name: '', review: ''},
                {name: '', review: ''},
                {name: '', review: ''},
                {name: '', review: ''},
                {name: '', review: ''},

            ]
        },
        {
            name: "Dr. Shelly Christian",
            profession: "Therapist",
            avatar: "https://via.placeholder.com/50",
            rating: 4.9,
            reviews: [
                {name: '', review: ''},
                {name: '', review: ''},
                {name: '', review: ''},
                {name: '', review: ''},
                {name: '', review: ''},

            ]
        },
        {
            name: "Dr. John Doe",
            profession: "Dentist",
            avatar: "https://via.placeholder.com/50",
            rating: 4.7,
            reviews: [
                {name: '', review: ''},
                {name: '', review: ''},
                {name: '', review: ''},
                {name: '', review: ''},
                {name: '', review: ''},

            ]
        },
        {
            name: "Dr. Rachel Smith",
            profession: "Psychologist",
            avatar: "https://via.placeholder.com/50",
            rating: 4.6,
            reviews: [
                {name: '', review: ''},
                {name: '', review: ''},
                {name: '', review: ''},
                {name: '', review: ''},
                {name: '', review: ''},

            ]
        },
    ];

    const statuses = ["Booked", "Payment Failed", "Pending", "Cancelled"];
    const times = [
        "9 AM - 10 AM",
        "10 AM - 11 AM",
        "11 AM - 12 PM",
        "12 PM - 1 PM",
        "1 PM - 2 PM",
        "2 PM - 3 PM",
    ];

    const dates = [
        "Wednesday, 20th October",
        "Thursday, 21st October",
        "Friday, 22nd October",
        "Saturday, 23rd October",
        "Sunday, 24th October",
    ];

    const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomTime = times[Math.floor(Math.random() * times.length)];
    const randomDate = dates[Math.floor(Math.random() * dates.length)];

    return {
        date: randomDate,
        time: randomTime,
        type: "Online Appointment",
        doctor: randomDoctor,
        status: randomStatus,
    };
});

const MainPage = ({type, isExpanded}) => {

    const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
    const [isViewAppointmentOpen, setIsViewAppointmentOpen] = useState(false);
    const [currentView, setCurrentView] = useState()

  
    const handleNewAppointmentOpen = () => setIsNewAppointmentOpen(true);
    const handleViewAppointmentOpen = (appointment) => {
        setCurrentView(appointment)
        setIsViewAppointmentOpen(true)
    }


    const handleCloseOverlay = () => {
        setIsNewAppointmentOpen(false);
        setIsViewAppointmentOpen(false);
    };
    return (
        <div className={`${isExpanded ? 'w-[85%]': 'lg:w-[95%] w-full'} transition-all duration-300 h-screen flex flex-col relative `}>

            <Header props ={type}/>
            {type.state === 'dashboard' && <MainDash handleNewAppointmentOpen= {handleNewAppointmentOpen} handleViewAppointmentOpen= {handleViewAppointmentOpen} appointments={appointments}/>}
            {type.state === 'chats' && <ChatPage/>}
            {type.state === 'profile' && <ProfilePage/>}
            {type.state === 'explore' && <ExplorePage handleNewAppointmentOpen= {handleNewAppointmentOpen} handleViewAppointmentOpen= {handleViewAppointmentOpen}/>}
            {type.state === 'appointments' && <Appointments handleNewAppointmentOpen= {handleNewAppointmentOpen} handleViewAppointmentOpen= {handleViewAppointmentOpen} appointments={appointments}/>}
           
            {isNewAppointmentOpen && <NewAppointmentOverlay onClose={handleCloseOverlay} doctor={doctors[0]}/>}

            {isViewAppointmentOpen && <ViewAppointmentOverlay onClose={handleCloseOverlay} appointment={currentView}/>}
        </div>
    );
}

export default MainPage;