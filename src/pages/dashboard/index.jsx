import React from 'react';
import { useState } from 'react';
import Sidebar from '../../common/sidebar';
import MainPage from '../../components/mainpage';
import BottomBar from '../../common/bottombar';

const Dashboard = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [shifter, setShifter] = useState({
        state: "Dashboard"
    })
    const toggleShifter = (type) => {
        console.log("TYPE ", type)
        setShifter({state: type})
    }

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className='flex-1 lg:flex w-full '>
            <Sidebar toggleSidebar={toggleSidebar} isExpanded={isExpanded} toggleShifter={toggleShifter} shifter={shifter}/>
            <MainPage isExpanded={isExpanded} type={shifter}/>
            <div >
                <BottomBar isHorizontal={true} isExpanded={isExpanded} toggleShifter={toggleShifter} shifter={shifter}/>
            </div>
        </div>
    );
}

export default Dashboard;