import React, { useEffect } from 'react';
import socket from '../../utils/socket';

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

const getStatusIcon = (status) => {
    switch (status) {
        case "sent":
            return <span class="material-symbols-outlined text-gray-400"> check </span>; // One gray tick
        case "delivered":
            return <span class="material-symbols-outlined text-gray-400"> done_all </span>; // Two gray ticks
        case "read":
            return <span class="material-symbols-outlined text-blue-500"> done_all </span>; // Two blue ticks
        default:
            return null;
    }
};
const Message = ({ props, avatar }) => {
    useEffect(() => {
        
        if (props?.type === "incoming" && props?.status !== "read") {
            socket.emit("mark_as_read", { messageId: props?._id, senderEmail: props?.senderEmail });
        }
    }, [props?._id, props?.status]); 
   
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
                    <div className="text-sm flex text-gray-500 mt-1">
                        {formatDate(props?.createdAt)}
                        {props?.type !== 'incoming' && <span className="ml-1">{getStatusIcon(props?.status)}</span>}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Message;
