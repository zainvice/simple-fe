import React from 'react';

const LoginDropdown = ({toggleLoginOverlay}) => {
    return (
        <div className='absolute flex-1 right-48 shadow-md p-2 px-4 top-14 bg-white rounded-[10px] text-2xl'>
           
            <div className='text-lg text-gray-600 flex flex-col'>
                <a onClick={toggleLoginOverlay} className='p-2 my-2 hover:bg-gray-200 hover:text-gray-800 duration-300 rounded-[10px] cursor-pointer'>Patient</a>
                <div className='w-[90%] h-[2px] rounded-full bg-gray-400'></div>
                <a href="auth/provider/login"  className='my-2 p-2 hover:bg-gray-200 hover:text-gray-800 duration-300 rounded-[10px] cursor-pointer'>Provider</a>

            </div>
        </div>
    );
}

export default LoginDropdown;