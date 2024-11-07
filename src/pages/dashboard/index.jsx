import React from 'react';
import { useState } from 'react';
import Sidebar from '../../comp/sidebar';
import MainPage from '../../comp/mainpage';

const Dashboard = () => {
    const [isExpanded, setIsExpanded] = useState(true);
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
        <div className='flex w-full'>
            <Sidebar toggleSidebar={toggleSidebar} isExpanded={isExpanded} toggleShifter={toggleShifter} shifter={shifter}/>
            <MainPage isExpanded={isExpanded} type={shifter}/>
        </div>
    );
}

export default Dashboard;