import React from 'react';

const formatDate = (timestamp) => {
    const messageDate = new Date(timestamp);
    const now = new Date();
    
    const isSameDay = now.toDateString() === messageDate.toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = yesterday.toDateString() === messageDate.toDateString();

    const options = { hour: '2-digit', minute: '2-digit', hour12: true };

    if (isSameDay) {
        return messageDate.toLocaleTimeString('en-US', options);
    } else if (isYesterday) {
        return `Yesterday, ${messageDate.toLocaleTimeString('en-US', options)}`;
    } else if (now.getFullYear() === messageDate.getFullYear()) {
        return messageDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }) + 
               `, ${messageDate.toLocaleTimeString('en-US', options)}`;
    } else {
        return messageDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) + 
               `, ${messageDate.toLocaleTimeString('en-US', options)}`;
    }
};

const Message = ({ props, avatar }) => {
    return (
        <div className="flex flex-col w-full">
         
            <div className={`flex mb-4 ${props?.type === 'incoming' ? '' : 'justify-end w-full'}`}>
                <img
                    src={avatar}
                    alt="Contact"
                    className={`w-6 h-6 rounded-full mt-5 ${props?.type === 'incoming' ? 'mr-2' : 'order-last ml-2'}`}
                />
                <div className={`${props?.type !== 'incoming' ? 'ml-auto text-white' : 'text-white'}`}>
                    <div
                        className={`p-3 rounded-lg w-max ${
                            props?.type !== 'incoming' ? 'bg-[#1EBDB8] ml-auto text-white' : 'bg-[#1E232F] text-white'
                        }`}
                    >
                        {props?.content}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                        {formatDate(props?.createdAt)}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Message;
