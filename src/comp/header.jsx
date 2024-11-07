import React from 'react';

const Header = ({props}) => {
    return (
        <div className='flex w-full mt-8  justify-between'>
            <div> <p className='redRose ml-12 text-[#00D97E] font-semibold text-[20px]'>{props?.state ? props?.state : 'CompName'}</p> </div>
            
            <div className='flex poppins text-sm mt-2 mr-14'>
                <p className='mx-4 text-[#1E232F]'>{props?.username ? props?.username : 'username'}</p>
                <span class="material-symbols-outlined text-[#888888] mx-2">keyboard_arrow_down</span>
                <span class="material-symbols-outlined text-[#888888] mx-2">notifications</span>

            </div>
            
        </div>
    );
}

export default Header;