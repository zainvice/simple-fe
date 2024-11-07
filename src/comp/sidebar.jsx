import React, { useEffect, useState } from 'react';
import { FaHome, FaUser, FaCog, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
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
    <div className={`h-screen rounded-r-[40px] bg-[#1E232F] text-white flex flex-col ${isExpanded ? 'w-[15%]' : 'w-[5%]'} transition-all duration-300`}>
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between p-4 relative">
        <div className={`flex items-center mt-5 ${isExpanded ? 'ml-4' : ''} transition-all duration-300`}>
          <img src="./logo-icon.png" alt="Logo" className="h-8" />
          <span className={`poppins ml-2 text-xl font-bold ${!isExpanded && 'hidden'}`}>Simple</span>
        </div>
        <button onClick={toggleSidebar} className={`text-green absolute top-6 ${isExpanded ? 'left-40' : 'left-14'} transition-all duration-300 bg-[#1E232F] rounded-r-[10px] px-1 py-2 flex`}>
          {isExpanded ? <span className="material-symbols-outlined">chevron_left</span> : <span className="material-symbols-outlined">chevron_right</span>}
        </button>
      </div>

      {/* Sidebar Items */}
      <div className="flex-1 my-16 text-sm">
        <SidebarItem icon={<FaHome />} text="Dashboard" isExpanded={isExpanded} isActive={activeItem === 'Dashboard'} onClick={() => toggleShifter('Dashboard')} />
        <SidebarItem icon={<MdOutlinePhonelinkRing />} text="Appointments" isExpanded={isExpanded} isActive={activeItem === 'Appointments'} onClick={() => toggleShifter('Appointments')} />
        <SidebarItem icon={<FaChartBar />} text="Reports" isExpanded={isExpanded} isActive={activeItem === 'Reports'} onClick={() => toggleShifter('Reports')} />
        <SidebarItem icon={<BsChatSquareText />} text="Chats" isExpanded={isExpanded} isActive={activeItem === 'Chats'} onClick={() => toggleShifter('Chats')} />
        <SidebarItem icon={<FaUser />} text="Profile" isExpanded={isExpanded} isActive={activeItem === 'Profile'} onClick={() => toggleShifter('Profile')} />
        <SidebarItem icon={<FaCog />} text="Settings" isExpanded={isExpanded} isActive={activeItem === 'Settings'} onClick={() => toggleShifter('Settings')} />
        <SidebarItem icon={<FaSignOutAlt />} text="Logout" isExpanded={isExpanded} isActive={activeItem === 'Logout'} onClick={() => toggleShifter('Logout')} />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, isExpanded, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex w-[90%] rounded-r-[30px] items-center p-5 hover:bg-gray-700 cursor-pointer h-12 my-4 ${isActive ? 'bg-[#00D97E]' : ''} transition-all duration-300`}
    >
      <div className={`text-lg ${isExpanded ? 'ml-4' : ''} transition-all duration-300`}>{icon}</div>
      {isExpanded && <span className="ml-4 transition-all duration-300">{text}</span>}
    </div>
  );
};

export default Sidebar;
