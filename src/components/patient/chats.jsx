import React, { useState, useRef } from 'react';
import { FaPhoneAlt, FaVideo, FaMicrophone, FaMicrophoneSlash, FaVideoSlash, FaPaperclip, FaRegImages } from 'react-icons/fa';

import ChatArea from '../../common/patient/chatArea';

const messages = [
  {type: 'incoming', content: `Hey, how is it going!`, time: '11:37AM', status: 'read'},
  {type: 'outgoing', content: `Hey, i'm good thanks for asking!`, time: '11:37AM', status: 'delivered'},
  {type: 'incoming', content: `How's everything else!`, time: '11:37AM', status: 'unread'}
]
const contacts = [
  { id: 1, avatar: 'https://pngimg.com/d/doctor_PNG15992.png', name: 'Dr. Lisa Roy',  email: 'zainvicei@gmail.com',  counter: '1', active: false },
  { id: 2, avatar: 'https://pngimg.com/d/doctor_PNG15992.png', name: 'Dr. Jamie Taylor', email: 'zainvicei@gmail.com', active: true  },
  { id: 3, avatar: 'https://pngimg.com/d/doctor_PNG15992.png', name: 'Dr. Jason Roy', email: 'zainvicei@gmail.com', active: false,  counter: '10'},

];

const ChatPage = () => {
  const [showCallUI, setShowCallUI] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  
  const [attachedFile, setAttachedFile] = useState(null);
  const [viewContact, setContact] = useState()
  const [sender, setSender] = useState({avatar: 'https://pngimg.com/d/doctor_PNG15992.png', name: 'Zane', active: true})
  const [attachedImage, setAttachedImage] = useState(null);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const videoRef = useRef(null);

  const handleToggleMute = () => setIsMuted(!isMuted);
  const handleToggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    setShowVideoPreview(!showVideoPreview);
  };
  const handleEndCall = () => setShowCallUI(false);

  const handleFileAttach = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes('image')) {
      setAttachedImage(URL.createObjectURL(file));
    } else {
      setAttachedFile(file);
    }
  };

  const handleStartCall = () => {
    setShowCallUI(true);
    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Error accessing webcam: ", err));
    }
  };

  const viewMessage = (contact) => {

      setContact(contact)
  }

  return (
    <div className="flex h-[85%] mx-2 lg:mx-8 mt-8 rounded-[10px] shadow-md bg-white p-6 ">
      {/* Sidebar */}
      <div className="w-1/4 p-4 shadow-md rounded-[10px] mr-2 ">
        <div className='w-full p-2 mt-4 rounded-full bg-white flex border shadow-md'>
          <span class="material-symbols-outlined text-[#1EBDB8] mx-2">search</span>
          <input type="text" placeholder="Search Here..." className="focus:outline-none placholder-[#CDCDCD] w-[80%]" />
        </div>
       
        <div className="mt-4 overflow-y-auto h-[80%] ">
          {contacts.map((contact, index) => (
            <div key={index} className={`flex items-center p-2 my-2 rounded-lg border  ${contact?.id === viewContact?.id ? 'bg-[#1EBDB8] text-white' : 'hover:shadow hover:bg-gray-100 transition-all duration-300'} cursor-pointer relative`} onClick={(e)=> viewMessage(contact)}>
              <img src={contact.avatar} alt="Sender" className="w-14 h-14 bg-white rounded-full"/>
              <div className='flex flex-col ml-2'>
                <span className={`font-semibold ${contact?.id === viewContact?.id ? 'text-white' : 'text-[#1EBDB8]'} `}>{contact.name}</span>
                <span className={`text-[12px]  ${contact?.id === viewContact?.id ? 'text-white' : 'text-[#959595]'} whitespace-nowrap`}> {contact?.messages?.[contact.messages.length - 1]?.content || "No messages"}</span>
              </div>
              <div className='absolute flex flex-col right-1 top-3'>
                <span className=" text-[#BABABA] text-[12px] whitespace-nowrap">{contact.time}</span>
                <span className="text-[12px] text-white text-center rounded-full bg-[#1E232F] w-5 absolute top-6 right-2 ">{contact.counter}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
        <ChatArea props={viewContact}/>
      {/* Audio/Video Call UI */}
      {showCallUI && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl font-bold mb-6">In Call with Dr. Dianne Johnson</h2>
          <div className="flex space-x-6">
            <button onClick={handleToggleMute} className="p-4 rounded-full bg-gray-700 hover:bg-gray-600">
              {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
            </button>
            <button onClick={handleToggleVideo} className="p-4 rounded-full bg-gray-700 hover:bg-gray-600">
              {isVideoOn ? <FaVideo size={24} /> : <FaVideoSlash size={24} />}
            </button>
            <button onClick={handleEndCall} className="p-4 rounded-full bg-red-500 hover:bg-red-400">
              End Call
            </button>
          </div>
          
          {/* Video Preview */}
          {showVideoPreview && (
            <video ref={videoRef} autoPlay muted className="mt-6 w-1/2 h-1/2 rounded-lg bg-gray-800"></video>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatPage;
