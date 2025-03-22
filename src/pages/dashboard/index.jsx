import React, { useEffect } from 'react';
import { useState } from 'react';
import Sidebar from '../../common/sidebar';
import MainPage from '../../components/mainpage';
import { useNavigate, useParams } from 'react-router-dom';
import LostPage from '../404';
import { useSelector } from 'react-redux';
import socket from '../../utils/socket';

const Dashboard = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate()
    const { selectedPath, more, userType } = useParams()
    const [showSideBar, setShowSideBar] = useState ()
    const { user, accessToken } = useSelector((state) => state.auth);

    useEffect(()=>{
        console.log("Connecting to server", user)
        if(!user||!accessToken){
            navigate(`/auth/${userType}/signup`)
        }
        if (user?.email) {
            socket.connect();
            socket.emit("join", user.email); 
      
            return () => {
              socket.disconnect();
            };
          }
    },[user])

    const showHideSidebar = () => {
      setShowSideBar(!showSideBar)
    }

    const [shifter, setShifter] = useState({
        state: selectedPath,
        key: selectedPath
    })
    const toggleShifter = (type, subtype) => {

        const link = subtype ? `/${userType}/${type.toLowerCase()}/${subtype.toLowerCase()}` : `/${userType}/${type.toLowerCase()}`;
      
        navigate(link)
    }
    useEffect(()=>{
        if(selectedPath){
            setShifter({state: selectedPath.toLowerCase(), key: selectedPath.toLowerCase()})
            
        }
        if(more==='providerDetails'){
            setShifter({state: "provider details", key: selectedPath.toLowerCase()})
            
        }
        if(selectedPath==='labreports'){
            setShifter({state: "lab reports", key: selectedPath.toLowerCase()})
            
        }
        if(selectedPath==='book'){
            setShifter({state: "review and book", key: selectedPath.toLowerCase()})
            
        }
    },[selectedPath, more])

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className='flex-1 lg:flex w-full '>
             {userType==='patient'||'provider' ?
                !['dashboard', 'chats', 'profile', 'explore', 'appointments', 'history', 'provider details', 'lab reports', 'favorites', 'review and book'].includes(shifter.state) ? <LostPage /> : <>
                    <Sidebar toggleSidebar={toggleSidebar} userType={userType} isExpanded={isExpanded} toggleShifter={toggleShifter} shifter={shifter} showSidebar={showSideBar} showHideSidebar={showHideSidebar}/>
                    <MainPage isExpanded={isExpanded} type={shifter} userType={userType} showHideSidebar={showHideSidebar}/>
                   
                </>
                :
                <LostPage />
             }
        </div>
    );
}

export default Dashboard;