import React, { useEffect, useState } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt} from 'react-icons/fa';
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlinePhonelinkRing } from "react-icons/md";
import { BsChatSquareText } from "react-icons/bs";

const Sidebar = ({ isExpanded, toggleSidebar, toggleShifter, shifter }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  useEffect(() => {
    console.log("SHIFTER STATE", shifter)
    if (shifter.state && shifter.state !== activeItem) {
      setActiveItem(shifter.state);
    }
  }, [shifter]);

  return (
    <div className={`h-screen hidden lg:flex rounded-r-[40px] bg-[#1E232F] text-white flex flex-col ${isExpanded ? 'w-[15%]' : 'w-[5%]'} transition-all duration-300 z-50`}>
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between p-4 relative">
        <div className={`flex items-center mt-5 ${isExpanded ? 'ml-4' : ''} transition-all duration-300`}>
          <img src="./logo-icon.png" alt="Logo" className="h-8" />
          <span className={`poppins ml-2 text-xl font-bold ${!isExpanded && 'hidden'}`}>Simple</span>
        </div>
        <button onClick={toggleSidebar} className={`text-green absolute cursor-pointer top-6 ${isExpanded ? 'left-[80%]' : 'left-[95%]'} transition-all duration-300 bg-[#1E232F] rounded-r-[10px] px-1 py-2 flex`}>
          {isExpanded ? <span className="material-symbols-outlined">chevron_left</span> : <span className="material-symbols-outlined">chevron_right</span>}
        </button>
      </div>

      {/* Sidebar Items */}
      <div className="flex-1 my-16 text-sm">
        <SidebarItem icon={<span class="material-symbols-outlined"> home </span>} text="Dashboard" isExpanded={isExpanded} isActive={activeItem === 'dashboard'} onClick={() => toggleShifter('dashboard')} />
        <SidebarItem icon={<span class="material-symbols-outlined"> book_online </span>} text="Appointments" isExpanded={isExpanded} isActive={activeItem === 'appointments'} onClick={() => toggleShifter('appointments')} />
        <SidebarItem icon={<span class="material-symbols-outlined"> diversity_1 </span>} text="Explore" isExpanded={isExpanded} isActive={activeItem === 'explore'} onClick={() => toggleShifter('explore')} />
        <SidebarItem icon={<span class="material-symbols-outlined"> bookmark_heart </span>} text="Favorites" isExpanded={isExpanded} isActive={activeItem === 'favorites'} onClick={() => toggleShifter('favorites')} />
        <SidebarItem icon={<span class="material-symbols-outlined"> history </span>} text="History" isExpanded={isExpanded} isActive={activeItem === 'history'} onClick={() => toggleShifter('history')} />
        <SidebarItem icon={<span class="material-symbols-outlined"> chat </span>} text="Chats" isExpanded={isExpanded} isActive={activeItem === 'chats'} onClick={() => toggleShifter('chats')} />

      
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, isExpanded, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex w-[90%] rounded-r-[30px] items-center p-5 hover:bg-gray-700 cursor-pointer h-12 my-4 ${isActive ? 'bg-[#1EBDB8]' : ''} transition-all duration-300`}
    >
      <div className={`text-xl mt-2 ${isExpanded ? 'ml-4' : ''} transition-all duration-300`}>{icon}</div>
      {isExpanded && <span className="ml-4 transition-all duration-300">{text}</span>}
    </div>
  );
};

export default Sidebar;
