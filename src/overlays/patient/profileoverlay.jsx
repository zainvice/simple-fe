import React from 'react';

const ProfileOverlay = ({user}) => {
    return (
        <div className='absolute flex-1 right-24 shadow-md p-6 top-8 bg-white rounded-[20px] text-2xl'>
            <div className='flex mb-4'>
                <img src={user?.avatar} alt="userImg" className='w-16 h-16 bg-white rounded-full'/>
                <div className='ml-4'>
                    <p className='text-[#1E232F] font-semibold '>{user?.firstName} {' '} {user.lastName}</p>
                    <p className='text-[#888888] text-xl'>{user?.email}</p>
                </div>
            </div>
            <div className='text-xl text-[#888888]'>
                <p className='p-2 hover:bg-gray-200 hover:text-gray-500 duration-300 rounded-[10px] cursor-pointer'>Profile</p>
                <p className='p-2 hover:bg-gray-200 hover:text-gray-500 duration-300 rounded-[10px] cursor-pointer'>Settings</p>
                <p className='p-2 hover:bg-gray-200 hover:text-gray-500 duration-300 rounded-[10px] cursor-pointer'>Refer A Friend</p>
                <p className='my-4 p-2 hover:bg-gray-200 hover:text-gray-500 duration-300 rounded-[10px] cursor-pointer'>Logout</p>

            </div>
        </div>
    );
}

export default ProfileOverlay;