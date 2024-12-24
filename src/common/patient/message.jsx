import React from 'react';

const Message = ({props, avatar}) => {
    return (
        <div className={`flex mb-4 ${props?.type==='incoming'? '': 'text-right'}`}>
            <img src={avatar} alt="Contact" className={`w-6 h-6 rounded-full mt-5 ${props?.type==='incoming'? 'mr-2': 'order-last ml-2'}`}/>
            <div className={`${props?.type != 'incoming' ? 'ml-auto text-white' : 'text-white' }`}>
                <div className={` p-3 rounded-lg w-max ${props?.type != 'incoming' ? 'bg-[#1EBDB8] ml-auto text-white' : 'bg-[#1E232F] text-white' }`}>{props?.content}</div>
                <div className="text-sm text-gray-500 mt-1">{props?.time}</div>
            </div>
        </div>
    );
}

export default Message;