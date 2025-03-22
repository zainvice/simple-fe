import React, { useState, useEffect } from 'react';
import ProfileOverlay from '../overlays/patient/profileoverlay';
import NotificationsOverlay from '../overlays/patient/notificationsoverlay';
import { useSelector } from 'react-redux';
import { getUserByEmail } from '../api/userCalls';


const notifications = [
    { message: 'Your appointment with Dr. Smith has been booked for Jan 10, 2025 at 10:00 AM.', time: '2 hours ago' },
    { message: 'Password changed successfully.', time: '4 hours ago' },
    { message: 'Your lab results are now available.', time: '1 day ago' },
    { message: 'Reminder: Your follow-up appointment with Dr. Adams is tomorrow at 3:00 PM.', time: '2 days ago' },
    { message: 'New health article: 10 Tips for Better Sleep.', time: '3 days ago' },
  ];

const Header = ({props, showSideBar}) => {
    
    const [showNotifications, setShowNotifications] = useState(false)
    const { user } = useSelector((state) => state.auth);
    const [userTime, setUserTime] = useState("");
    const [timezone, setTimezone] = useState("");

    useEffect(() => {
        // Fetch IP-based timezone
        const fetchTimezone = async () => {
            try {
                const response = await fetch("https://ipapi.co/json/");
                const data = await response.json();
                setTimezone(data.timezone);
            } catch (error) {
                console.error("Error fetching timezone:", error);
                setTimezone("UTC"); // Fallback timezone
            }
        };

        fetchTimezone();
    }, []);

    useEffect(() => {
        if (!timezone) return;

        // Function to update time
        const updateClock = () => {
            const now = new Date();
            const options = { timeZone: timezone, hour: "2-digit", minute: "2-digit", second: "2-digit" };
            setUserTime(new Intl.DateTimeFormat("en-US", options).format(now));
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);

        return () => clearInterval(interval);
    }, [timezone]);


    const toggleNotifications = () =>{
        setShowNotifications(!showNotifications)
    }
    
    const [showProfile, setShowProfile] = useState(false)

    const toggleProfile = () =>{
        setShowProfile(!showProfile)
    }


    return (
        <div className='flex w-full lg:mt-8 mt-4 justify-between z-20 relative'>
            
            <div className='w-[65%] flex'> 
                 <span className="material-symbols-outlined lg:hidden lg:ml-8 ml-4 mr-2 mt-1" onClick={showSideBar}> sort </span>
                <p className='redRose lg:ml-12 ml-2 text-[#1EBDB8] font-semibold text-[20px]'>
                  {props?.state && props?.state?.toUpperCase()}
                </p> 
            </div>
            
            <div className='lg:flex poppins text-sm mt-2 mr-14 hidden'>
                <p className="mx-4 text-[#1EBDB8] font-bold text-md">
                    {userTime ? `${userTime} (${timezone})` : "Loading time..."}
                </p>
                <p className='mx-4 text-[#1E232F]'>{user?.role==='provider'&&'Dr. '}{user ? user?.firstName +' '+ user?.lastName : 'username'}</p>
                <span className="material-symbols-outlined text-[#888888] mx-2 cursor-pointer" onClick={toggleProfile}>keyboard_arrow_down</span>
                <span className="material-symbols-outlined text-[#888888] mx-2 cursor-pointer" onClick={toggleNotifications}>notifications</span>

            </div>

            {showNotifications && <NotificationsOverlay notifications={notifications}/>}
            {showProfile && <ProfileOverlay user={user}/>}
            
        </div>
    );
}

export default Header;