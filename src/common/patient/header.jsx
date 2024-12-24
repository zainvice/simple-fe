import React, { useState } from 'react';
import ProfileOverlay from '../../overlays/patient/profileoverlay';
import NotificationsOverlay from '../../overlays/patient/notificationsoverlay';

const Header = ({props, showSideBar}) => {
    
    const [showNotifications, setShowNotifications] = useState(false)
    
    const toggleNotifications = () =>{
        setShowNotifications(!showNotifications)
    }
    
    const [showProfile, setShowProfile] = useState(false)

    const toggleProfile = () =>{
        setShowProfile(!showProfile)
    }
    const user = {
        avatar: 'https://zaneone.pages.dev/img/aboutme.png',
        firstName: 'Zain',
        lastName: 'Ul Hassan',
        email: 'zainvicee@gmail.com'

    }

    return (
        <div className='flex w-full mt-8 justify-between z-0 relative'>
            
            <div className='w-[65%] flex'> 
                 <span class="material-symbols-outlined lg:hidden ml-8 mr-2 mt-1" onClick={showSideBar}> sort </span>
                <p className='redRose lg:ml-12 ml-2 text-[#1EBDB8] font-semibold text-[20px]'>
                  {props?.state && props?.state?.toUpperCase()}
                </p> 
            </div>
            
            <div className='lg:flex poppins text-sm mt-2 mr-14 hidden'>
                <p className='mx-4 text-[#1E232F]'>{props?.username ? props?.username : 'username'}</p>
                <span class="material-symbols-outlined text-[#888888] mx-2 cursor-pointer" onClick={toggleProfile}>keyboard_arrow_down</span>
                <span class="material-symbols-outlined text-[#888888] mx-2 cursor-pointer" onClick={toggleNotifications}>notifications</span>

            </div>

            {showNotifications && <NotificationsOverlay/>}
            {showProfile && <ProfileOverlay user={user}/>}
            
        </div>
    );
}

export default Header;