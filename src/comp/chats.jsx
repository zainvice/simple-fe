import React, { useState, useRef } from 'react';
import { FaPhoneAlt, FaVideo, FaMicrophone, FaMicrophoneSlash, FaVideoSlash, FaPaperclip, FaRegImages } from 'react-icons/fa';

const contacts = [
  { name: 'Lisa Roy', message: 'Are you available tomorrow?', time: '10:32 AM' },
  { name: 'Jamie Taylor', message: 'Meeting Reminder', time: '10:35 AM' },
  { name: 'Jason Roy', message: 'Shared two files with you', time: '10:34 AM' },
  { name: 'Amy Frost', message: 'Hello', time: '10:30 AM' },
  { name: 'Paul Wilson', message: 'Important meeting update', time: '10:25 AM' },
  { name: 'Ana Williams', message: '??', time: '10:20 AM' },
];

const ChatPage = () => {
  const [showCallUI, setShowCallUI] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [attachedFile, setAttachedFile] = useState(null);
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

  return (
    <div className="flex h-[90%] bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 p-4 bg-gray-200">
        <input type="text" placeholder="Search Here..." className="w-full p-2 mt-4 rounded-lg focus:outline-none" />
        <div className="mt-4">
          {contacts.map((contact, index) => (
            <div key={index} className="flex justify-between items-center p-2 my-2 bg-white rounded-lg shadow hover:bg-gray-300 cursor-pointer">
              <span className="font-semibold">{contact.name}</span>
              <span className="text-sm text-gray-500">{contact.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 bg-white shadow">
          <h3 className="font-semibold text-lg">Dr. Dianne Johnson</h3>
          <div>
            <button onClick={handleStartCall} className="p-2 mx-1 rounded-full bg-green-500 text-white"><FaPhoneAlt /></button>
            <button onClick={handleStartCall} className="p-2 mx-1 rounded-full bg-green-500 text-white"><FaVideo /></button>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {/* Sample Messages */}
          <div className="mb-4">
            <div className="bg-gray-300 p-3 rounded-lg w-max">Hi David, have you got the project report pdf?</div>
            <div className="text-green-500 text-sm mt-1">11:45 AM</div>
          </div>
          <div className="mb-4 text-right">
            <div className="bg-green-500 text-white p-3 rounded-lg w-max ml-auto">No, I did not get it.</div>
            <div className="text-sm text-gray-500 mt-1">11:46 AM</div>
          </div>

          {/* Attachments Preview */}
          {attachedImage && <img src={attachedImage} alt="Attachment" className="w-1/2 mt-4 rounded-lg" />}
          {attachedFile && <p className="bg-gray-300 p-3 rounded-lg w-max mt-4">{attachedFile.name}</p>}
        </div>

        {/* Input Field */}
        <div className="flex items-center p-4 bg-gray-200">
          <input type="text" placeholder="Write something..." className="flex-1 p-3 rounded-lg focus:outline-none" />
          <button className="p-3 mx-2 rounded-full bg-green-500 text-white">Send</button>
          <label className="p-3 mx-2 rounded-full bg-gray-300 cursor-pointer">
            <FaPaperclip />
            <input type="file" className="hidden" onChange={handleFileAttach} />
          </label>
        </div>
      </div>

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
