import React, { useEffect } from 'react';
import { useState } from 'react';
import Sidebar from '../../common/sidebar';
import MainPage from '../../components/mainpage';
import BottomBar from '../../common/bottombar';
import { useNavigate, useParams } from 'react-router-dom';
import LostPage from '../404';

const Dashboard = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate()
    const { selectedPath, more } = useParams()
    const [shifter, setShifter] = useState({
        state: selectedPath,
        key: selectedPath
    })
    const toggleShifter = (type, subtype) => {

        const link = subtype ? `/${type.toLowerCase()}/${subtype.toLowerCase()}` : `/${type.toLowerCase()}`;
      
        navigate(link)
    }
    useEffect(()=>{
        if(selectedPath){
            setShifter({state: selectedPath.toLowerCase(), key: selectedPath.toLowerCase()})
            
        }
        if(more==='providerDetails'){
            setShifter({state: "Provider Details", key: selectedPath.toLowerCase()})
            
        }
    },[selectedPath, more])

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className='flex-1 lg:flex w-full '>
             {!['dashboard', 'chats', 'profile', 'explore', 'appointments', 'history', 'Provider Details'].includes(shifter.state) ? <LostPage /> : <>
                <Sidebar toggleSidebar={toggleSidebar} isExpanded={isExpanded} toggleShifter={toggleShifter} shifter={shifter}/>
                <MainPage isExpanded={isExpanded} type={shifter}/>
                <div >
                    <BottomBar isHorizontal={true} isExpanded={isExpanded} toggleShifter={toggleShifter} shifter={shifter}/>
                </div>
                </>
            }
        </div>
    );
}

export default Dashboard;