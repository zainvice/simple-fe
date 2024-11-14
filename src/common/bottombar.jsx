import React, { useEffect, useState } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlinePhonelinkRing } from "react-icons/md";
import { BsChatSquareText } from "react-icons/bs";

const BottomBar = ({ isExpanded, isHorizontal, toggleShifter, shifter }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  useEffect(() => {
    if (shifter.state && shifter.state !== activeItem) {
      setActiveItem(shifter.state);
    }
  }, [shifter]);

  const items = [
    { icon: <FaHome />, text: 'Dashboard' },
    { icon: <MdOutlinePhonelinkRing />, text: 'Appointments' },
    { icon: <FaUserDoctor />, text: 'Doctors' },
    { icon: <BsChatSquareText />, text: 'Chats' },
    { icon: <FaUser />, text: 'Profile' },
    { icon: <FaCog />, text: 'Settings' },
    { icon: <FaSignOutAlt />, text: 'Logout' },
  ];

  const activeIndex = items.findIndex(item => item.text === activeItem);
  const offset = `calc(50% - ${(activeIndex + 0.5) * (100 / items.length)}%)`;

  return (
    <div
      className={`bg-[#1E232F] lg:hidden fixed bottom-0 rounded-t-[30px] text-white flex ${isHorizontal ? 'w-full h-[10%]' : `h-screen ${isExpanded ? 'w-[15%]' : 'w-[5%]'}`} transition-all duration-300`}
    >
     
      <div
        className={`flex-1 flex w-full justify-between transition-all duration-300`}
       
      >
        {items.map((item, index) => (
          <BottomBarItem
            key={index}
            icon={item.icon}
            text={item.text}
            isExpanded={isExpanded || isHorizontal}
            isHorizontal={isHorizontal}
            isActive={activeItem === item.text}
            onClick={() => {
              toggleShifter(item.text);
              setActiveItem(item.text);
            }}
          />
        ))}
      </div>
    </div>
  );
};

const BottomBarItem = ({ icon, text, isExpanded, isHorizontal, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center flex-col mx-5 ${isActive ? 'bg-[#00D97E]' : ''} ${isHorizontal ? 'py-4 px-2' : 'p-5'} rounded-t-[30px] hover:bg-gray-700 cursor-pointer mt-2 w-[100px] transition-all duration-300`}
    >
      <div className={`text-lg transition-all duration-300`}>{icon}</div>
      {(isExpanded || isHorizontal) && <span className="transition-all duration-300 text-sm font-thin">{text}</span>}
    </div>
  );
};

export default BottomBar;
