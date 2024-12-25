import React, { useEffect, useState } from 'react';

const Sidebar = ({ userType, isExpanded, toggleSidebar, toggleShifter, shifter, showSidebar, showHideSidebar  }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  useEffect(() => {
    if (shifter.state && shifter.state !== activeItem) {
      setActiveItem(shifter.state);
    }
  }, [shifter]);

  return (
    <div 
        className={`h-screen ${
          showSidebar ? "absolute flex w-[50%] translate-x-0 " : "-translate-x-full lg:translate-x-0"
        } lg:flex rounded-r-[40px] bg-[#1E232F] text-white flex-col ${
          isExpanded && !showSidebar ? "w-[15%]" : "w-[5%]"
        } transition-all duration-300 z-50 fixed lg:static top-0 left-0`}
    >

      <div className={`flex items-center justify-between p-4 relative  ${isExpanded ? 'ml-4' : ''}  ${showSidebar && 'ml-4'} transition-all duration-300`}>
        <div className={`flex items-center mt-5 `}>
          <img src="/logo-icon.png" alt="Logo" className="h-8" />
          <span className={`poppins ml-2 text-xl font-bold ${!isExpanded && !showSidebar  && 'hidden'}`}>Simple</span>
        </div>
        {showSidebar ?
           <button onClick={showHideSidebar} className={`text-green absolute cursor-pointer top-6 left-[85%] transition-all duration-300 `}>
               <span className="material-symbols-outlined text-[18px]">close</span> 
            </button>
         :
          <button onClick={toggleSidebar} className={`hidden text-green lg:block absolute cursor-pointer top-6 ${isExpanded ? 'left-[80%]' : 'left-[95%]'} transition-all duration-300 bg-[#1E232F] rounded-r-[10px] px-1 py-2 flex`}>
            {isExpanded ? <span className="material-symbols-outlined mt-2">chevron_left</span> : <span className="material-symbols-outlined mt-2">chevron_right</span>}
          </button>
        }
      </div>

      <div className="flex-1 my-16 text-sm">
          {userType==='patient' ? 
            <>
                <SidebarItem icon={<span className="material-symbols-outlined"> home </span>} text="Dashboard" isExpanded={isExpanded || showSidebar} isActive={activeItem === 'dashboard'} onClick={() => toggleShifter('dashboard')} />
                <SidebarItem icon={<span className="material-symbols-outlined"> book_online </span>} text="Appointments" isExpanded={isExpanded || showSidebar} isActive={activeItem === 'appointments'} onClick={() => toggleShifter('appointments')} />
                <SidebarItem icon={<span className="material-symbols-outlined"> diversity_1 </span>} text="Explore" isExpanded={isExpanded || showSidebar} isActive={activeItem === 'explore'} onClick={() => toggleShifter('explore')} />
                <SidebarItem icon={<span className="material-symbols-outlined"> bookmark_heart </span>} text="Favorites" isExpanded={isExpanded || showSidebar} isActive={activeItem === 'favorites'} onClick={() => toggleShifter('favorites')} />
                <SidebarItem icon={<span className="material-symbols-outlined"> biotech </span>} text="Lab Reports" isExpanded={isExpanded || showSidebar} isActive={activeItem === 'lab reports'} onClick={() => toggleShifter('labreports')} />
                <SidebarItem icon={<span className="material-symbols-outlined"> chat </span>} text="Chats" isExpanded={isExpanded || showSidebar} isActive={activeItem === 'chats'} onClick={() => toggleShifter('chats')} />
            </>
          :
          <>
              <SidebarItem icon={<span className="material-symbols-outlined"> home </span>} text="Dashboard" isExpanded={isExpanded || showSidebar} isActive={activeItem === 'dashboard'} onClick={() => toggleShifter('dashboard')} />

          </>
          }

      
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
