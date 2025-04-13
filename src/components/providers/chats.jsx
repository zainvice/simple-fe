import React, { useState, useRef, useEffect } from 'react';
import { FaPhoneAlt, FaVideo, FaMicrophone, FaMicrophoneSlash, FaVideoSlash, FaPaperclip, FaRegImages } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import ChatArea from '../../common/chatArea';
import { getMessages } from '../../api/messageCalls';
import { useLocation } from 'react-router-dom';



const ProviderChatPage = ({ appointments }) => {
  const [showCallUI, setShowCallUI] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const { user } = useSelector((state) => state.auth);
  
  const [attachedFile, setAttachedFile] = useState(null);
  const [viewContact, setContact] = useState()
  const [sender, setSender] = useState({avatar: 'https://pngimg.com/d/doctor_PNG15992.png', name: 'Zane', active: true})
  const [attachedImage, setAttachedImage] = useState(null);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const [recentAppointment, setRecentAppointment] = useState(null)
  const videoRef = useRef(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState({});
  const location = useLocation()

  const getMessagesforContact = async(contact) => {
      try {
         const response = await getMessages(user.email, contact.email)
         return response.data
      } catch (error) {
         console.error("error")
         return []
      }
  } 

  const getEmailFromUrl = () => {
    const params = new URLSearchParams(location.search); // Extract query parameters from URL
    return params.get('email'); // Get the 'email' parameter
  };


  useEffect(() => {
    const email = getEmailFromUrl(); 
    if (email && contacts) {
      const foundContact = contacts.find(c => c?.email === decodeURIComponent(email));
      viewMessage(foundContact); 
    }
  }, [location.search, contacts]); 

  

  useEffect(() => {
    const fetchMessages = async () => {
      const updatedMessages = {};
      for (const contact of contacts) { 
        updatedMessages[contact.id] = await getMessagesforContact(contact);
      }
      setMessages(updatedMessages);
    };

    fetchMessages();
  }, [contacts, user]);
  const handleToggleMute = () => setIsMuted(!isMuted);
  const handleToggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    setShowVideoPreview(!showVideoPreview);
  };
  const handleEndCall = () => setShowCallUI(false);



  useEffect(() => {
    if (appointments.length > 0) {
      setContacts((prev) => {
        const existingEmails = new Set(prev.map((contact) => contact.email));
  
        const newContacts = appointments
          .filter((appointment) => 
            appointment.providerDetails && 
            !existingEmails.has(appointment.providerDetails.providerEmail)
          )
          .reduce((acc, appointment) => {
            if (!existingEmails.has(appointment.patientDetails.email)) {
              acc.push({
                id: prev.length + acc.length + 1, 
                avatar: appointment.patientDetails.avatar,
                name: appointment.patientDetails.name,
                email: appointment.patientDetails.email,
              });
              existingEmails.add(appointment.patientDetails.email); // Add email to set dynamically
            }
            return acc;
          }, []);
  
        return [...prev, ...newContacts];
      });
    }
  }, [appointments]);
  
  

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
    // Update the contact state
    setContact(contact);

    const emailParam = encodeURIComponent(contact?.email); 
    if(emailParam && emailParam !== 'undefined'){
      const currentUrl = window.location.origin + window.location.pathname; 
      const newUrl = `${currentUrl}?email=${emailParam}`;

      window.history.pushState({}, '', newUrl);
    }

    const filteredAppointments = appointments.filter(
      (appt) => appt.patientDetails?.email === contact.email
    );
  
    if (filteredAppointments.length > 0) {
      const latestAppointment = filteredAppointments.reduce((latest, current) => {
        return new Date(current.date) > new Date(latest.date) ? current : latest;
      });
      setRecentAppointment(latestAppointment);
    } else {
      setRecentAppointment(null); 
    }
  };
  
  console.log("R", recentAppointment)

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
                <span className={`text-[12px] ${contact?.id === viewContact?.id ? 'text-white' : 'text-[#959595]'} whitespace-nowrap`}>
                    {messages[contact.id]?.length
                      ? (messages[contact.id].at(-1)?.senderEmail === user.email
                          ? `You: ${messages[contact.id].at(-1)?.content}`
                          : messages[contact.id].at(-1)?.content)
                      : "No messages"}
                  </span>

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
        <ChatArea props={viewContact} recentAppointment={recentAppointment}/>
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

export default ProviderChatPage;
