import React from 'react';
import Header from './header';
import ChatPage from './chats';
import ProfilePage from './profile';
import MainDash from './maincontent';

const MainPage = ({type, isExpanded}) => {
    return (
        <div className={`${isExpanded ? 'w-[85%]': 'w-[95%]'} transition-all duration-300`}>

            <Header props ={type}/>
            {type.state === 'Dashboard' && <MainDash/>}
            {type.state === 'Chats' && <ChatPage/>}
            {type.state === 'Profile' && <ProfilePage/>}
            
        </div>
    );
}

export default MainPage;