import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../api/features/auth/patient/authSlice';
import { useNavigate } from 'react-router-dom';

const ProfileOverlay = ({user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
  

    const logoutUser = async(e, state) => {
        e.preventDefault();
      
        try {
            const actionResult = await dispatch(logout());
      
            console.log(actionResult)
            if (logout.fulfilled.match(actionResult)) {
              
              const response = actionResult.payload; 
              console.log('Logged out Successfully', response);
              navigate('/');
            
              
            } else if(logout.rejected.match(actionResult)){
              const response = actionResult.payload; 
              console.log('Sign Up error', response);
            }
          } catch (error) {
           
            console.error('Error during logout:', error);
          }
      
        
    };
    return (
        <div className='absolute flex-1 right-24 shadow-md p-6 top-8 bg-white rounded-[20px] text-lg'>
            <div className='flex mb-4'>
                <img src={user?.avatar} alt="userImg" className='w-16 h-16 bg-white rounded-full'/>
                <div className='ml-4'>
                    <p className='text-[#1E232F] font-semibold '>{user?.role==='provider'&&'Dr. '} {user?.firstName}</p>
                    <p className='text-[#888888] text-sm'>{user?.email}</p>
                </div>
            </div>
            <div className='text-lg text-[#888888]'>
                <p className='p-2  text-sm hover:bg-gray-200 hover:text-gray-500 duration-300 rounded-[10px] cursor-pointer'>Profile</p>
                <p className='p-2  text-sm hover:bg-gray-200 hover:text-gray-500 duration-300 rounded-[10px] cursor-pointer'>Settings</p>
                <p className='p-2  text-sm hover:bg-gray-200 hover:text-gray-500 duration-300 rounded-[10px] cursor-pointer'>Refer A Friend</p>
                <p className='my-4 p-2  text-sm hover:bg-gray-200 hover:text-gray-500 duration-300 rounded-[10px] cursor-pointer' onClick={logoutUser}>Logout</p>

            </div>
        </div>
    );
}

export default ProfileOverlay;