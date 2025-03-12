import React, { useState, useEffect } from 'react';
import Message from './message';
import axios from 'axios';
import { io } from "socket.io-client";
import { useSelector } from 'react-redux';
const socket = io("http://localhost:3001");

const ChatArea = ({props}) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const receiverEmail = props?.email
    const { user, accessToken } = useSelector((state) => state.auth);

    useEffect(() => {
        const senderEmail = user?.email
        socket.emit("join", senderEmail);
        console.log("USER", user)

        // Fetch chat history
        axios
        .get(`http://localhost:3001/messages/${senderEmail}/${receiverEmail}`)
        .then((res) => setMessages(res.data));

        // Listen for incoming messages
        socket.on("receive_message", (data) => {
            console.log("Data", data)
            setMessages((prev) => [...prev, {...data, type: 'incoming'}]);
        });

        return () => {
        socket.off("receive_message");
        };
    }, [user]);
    useEffect(()=>{
       console.log(message)
    }, [message])

    const sendMessage = () => {
       
        if (message.trim()) {
            const senderEmail = user?.email
            const data = { senderEmail, receiverEmail, content: message, time: Date.now(), status: 'sent', type: 'outgoing' };
            socket.emit("send_message", data);
            setMessages((prev) => [...prev, data]);
            setMessage("");
           
        }
    };
    return (
        <div className="flex-1 flex flex-col shadow-md rounded-[10px]">
            {props?(
                <>
                   <div className="flex items-center justify-between p-4 bg-white shadow">
                   <div className='flex'>
                       <img src={props?.avatar} alt="Contact" className='w-10 h-10 rounded-full'/>
                       <p className="font-semibold text-lg ml-2 text-[#1EBDB8] flex mt-2">{props?.name}{props?.active ? <span class="material-symbols-outlined text-[20px] ml-2 mt-1 text"> radio_button_checked </span>: <span class="material-symbols-outlined text-[20px] ml-2 mt-1 text-gray-400"> radio_button_unchecked </span>}</p>
                   </div>
                    <div className='flex space-x-4 text-gray-600 mt-3 mr-6'>
                        <span class="material-symbols-outlined hover:text-[#1EBDB8] cursor-pointer"> call </span>
                        <span class="material-symbols-outlined hover:text-[#1EBDB8] cursor-pointer"> video_call </span>
                    {/*  <button onClick={handleStartCall} className="p-2 mx-1 rounded-full bg-green-500 text-white"><FaPhoneAlt /></button>
                        <button onClick={handleStartCall} className="p-2 mx-1 rounded-full bg-green-500 text-white"><FaVideo /></button> */}
                    </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto">
                    {messages.map(message => (
                        <Message props={message} avatar={props?.avatar}/>
                    ))}
                    {/* Attachments Preview */}
                    {props?.attachedImage && <img src={props?.attachedImage} alt="Attachment" className="w-1/2 mt-4 rounded-lg" />}
                    {props?.attachedFile && <p className="bg-gray-300 p-3 rounded-lg w-max mt-4">{props?.attachedFile.name}</p>}
                    </div>

                    {/* Input Field */}
                    <div className="flex items-center p-4 bg-[#DCE8FF]">
                        <div className='flex p-3 bg-white rounded-[30px] justify-between w-[95%]'>
                            <input type="text" placeholder="Write something..." value={message} className="focus:outline-none w-[90%]" onChange={(e)=> setMessage(e.target.value)}/>
                            <div className='flex font-thin space-x-2'>
                                <span className='material-symbols-outlined text-[#1EBDB8]'>attachment</span>
                                <span className='material-symbols-outlined text-[#1EBDB8]'>photo_camera</span>
                                <span className='material-symbols-outlined text-[#1EBDB8]'>sentiment_satisfied</span>
                                

                            </div>
                        </div>
                        <button className="p-3 mx-2 rounded-full bg-[#1EBDB8] text-white flex" onClick={sendMessage}><span class="material-symbols-outlined"> send </span></button>
                        
                    </div>
                </>
            ):(
                <div className='grid items-center'>
                    CHOOSE A CONTACT TO START COVERSATION
                </div>
            )}
      </div>
    );
}

export default ChatArea;