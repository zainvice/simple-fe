import React from 'react';

const Button = ({icon, text, onClick, bgColor, textColor}) => {
    return (
        <button className={"px-3 text-sm text-white bg-[#1EBDB8] border border-[#1EBDB8] hover:bg-transparent hover:text-[#1EBDB8] transition-all duration-300 rounded-[20px] text-[12px] font-semibold lg:px-4 lg:py-2 p-2 flex"} onClick={onClick}>
                {icon&&<span class="material-symbols-outlined lg:mr-3 text-[20px]"> {icon} </span>} <span className='hidden lg:block'>{text}</span>
        </button>
    );
}

export default Button;