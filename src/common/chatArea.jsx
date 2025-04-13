import React, { useState, useEffect, useRef } from 'react';
import Message from './patient/message';
import { getMessages } from '../api/messageCalls';
import { getUserActiveStatus, getUserByEmail } from '../api/userCalls';

import { useSelector } from 'react-redux';
import socket from '../utils/socket';
import VideoCall from './videoCall';
import EmojiPicker from "emoji-picker-react";
const callInfo = {

}

const ChatArea = ({props, recentAppointment}) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const receiverEmail = props?.email
    const { user } = useSelector((state) => state.auth);
    const [active, setActive] = useState(false)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = useRef(null);
    const [incomingCall, setIncomingCall] = useState()
    const [videoCallOn, setVideoCall] = useState(false)
    const [isRinging, setIsRinging] = useState(false);

    const messagesEndRef = useRef(null);
    const containerRef = useRef(null); 
    const [isUserScrolling, setIsUserScrolling] = useState(false);

    useEffect(() => {
    const container = containerRef.current;
    
    if (!container) return;

    const handleScroll = () => {
        // Check if user scrolled up
        if (container.scrollHeight - container.scrollTop > container.clientHeight + 10) {
            setIsUserScrolling(true);
            } else {
            setIsUserScrolling(false);
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    /* useEffect(() => {
        if (!isUserScrolling) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]); */
    useEffect(() => {

        const getOldMessages = async() => {
            try {
                const response = await getMessages(user?.email, props?.email)
                const assignedMessages = response?.data?.map((message) => {
                    return {
                        ...message,
                        type: message.senderEmail === user?.email ? 'outgoing' : 'incoming'
                    };
                });
                
                setMessages(assignedMessages);
            } catch (error) {
                console.error("An error occured")
            }
        }
        if(user && props?.email){
            getOldMessages()
        }
        socket.on("receive_message", (data) => {
            console.log("Data", data)
            setMessages((prev) => [...prev, {...data, type: 'incoming'}]);
        });
        socket.on("message_status_updated", (data) => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg._id === data.messageId ? { ...msg, status: data.status } : msg
                )
            );
        });        

        return () => {
           socket.off("receive_message");
        };
    }, [user, props, messages]);
    useEffect(() => {
        const fetchUserStatus = async () => {
            socket.on("message_status_updated", (data) => {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg._id === data.messageId ? { ...msg, status: data.status } : msg
                    )
                );
            });        
    
            try {
                const response = await getUserActiveStatus(props.email);
                
                setActive(response.status);
            } catch (error) {
                console.error("ERROR", error);
            }
        };
    
        if (props?.email) {
            fetchUserStatus(); 
    

            const intervalId = setInterval(fetchUserStatus, 2000);
    
           
            return () => clearInterval(intervalId);
        }
    }, [props]);
    useEffect(() => {
        socket.on("incoming_call", ({ from, offer }) => {
            setIncomingCall({ from, offer }); 
        });

        socket.on("call_answered", async ({ answer }) => {
            console.log("CALL WAS ANSWERED")
            setIsRinging(false)
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socket.on("ice_candidate", (candidate) => {
            peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        });
        socket.on("call_rejected", () => {
            setIsRinging(false)
            alert("Call was rejected.");
            handleEndCall()
        });
        socket.on("call_ended", () => {
            handleEndCall();
        });
    }, []);

    const startCall = async () => {
        peerConnection.current = new RTCPeerConnection();
        setVideoCall(true);
        setIsRinging(true)
    
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;
    
        stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
    
        peerConnection.current.ontrack = (event) => {
            remoteVideoRef.current.srcObject = event.streams[0];
        };
    
        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("ice_candidate", { to: receiverEmail,  candidate: event.candidate });
            }
        };
    
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
    
        socket.emit("call_user", { to: receiverEmail, from: user?.email, offer });
    };
    
    
    useEffect(()=>{
       console.log(message)
    }, [message])

    const sendMessage = async () => {
        if (message.trim()) {
            const senderEmail = user?.email;
            console.log("Trying to send message");
    
            const data = {
                senderEmail,
                receiverEmail,
                content: message,
                createdAt: Date.now(),
                status: "sent",
                type: "outgoing",
            };
    
            // Send message and wait for response
            socket.emit("send_message", data, (response) => {
                if (response?.error) {
                    console.error("Error sending message:", response.error);
                    return;
                }
    
                // Update message with the actual ID from the server
                setMessages((prev) => [...prev, { ...data, _id: response._id }]);
            });
    
            setMessage(""); // Clear input field
        }
    };
    
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      };
    
    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log("File attached:", file);
        // Handle file upload logic here
      }
    };

    const handleEmojiSelect = (emoji) => {
      setMessage((prev) => prev + emoji.emoji);
      setShowEmojiPicker(false);
    };

    const [incomingCallAccepted, setIncomingCallAccepted] = useState(false)
    const acceptCall = async () => {
        if (!incomingCall) return;
    
        setVideoCall(true)
        setIncomingCallAccepted(true)
        console.log("TRYING TO ANSWER CALL")
        peerConnection.current = new RTCPeerConnection();
    
        peerConnection.current.ontrack = (event) => {
            remoteVideoRef.current.srcObject = event.streams[0];
        };
    
        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("ice_candidate", { to: incomingCall.from.id, candidate: event.candidate });
            }
        };
    
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    
        stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
        localVideoRef.current.srcObject = stream;
    
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
    
        socket.emit("answer_call", { to: incomingCall.from.id, answer });
        console.log("Call answered!")
    
        setIncomingCall(null); // Hide popup
    };
    
    const rejectCall = () => {
        if (!incomingCall) return;
        socket.emit("call_rejected", { to: incomingCall.from.caller.id }); // Notify caller
        setIncomingCall(null); // Hide popup
    };
    const handleEndCall = () => {

        setIsRinging(false)
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
    
        if (localVideoRef.current?.srcObject) {
            localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
            localVideoRef.current.srcObject = null;
        }
    
        if (remoteVideoRef.current?.srcObject) {
            remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
            remoteVideoRef.current.srcObject = null;
        }
    
        socket.emit("end_call", { to: receiverEmail });
        setVideoCall(false)
    
        setIncomingCall(null); // Hide incoming call UI
    };
    const [incomingCaller, setIncomingCaller] = useState()
    useEffect(() => {

        const getIncomingCallerDetails = async() => {
            try {
                const response = await getUserByEmail(incomingCall?.from?.caller)
                setIncomingCaller(response)
            } catch (error) {
                console.error("ERROR", error)
            }
        }
        if(incomingCall?.from?.caller){
            getIncomingCallerDetails()
}
    }, [incomingCall])
    
    return (
        <div className="flex-1 flex flex-col shadow-md rounded-[10px]">
            {videoCallOn && <VideoCall onEndCall={handleEndCall} callInfo={callInfo} isRinging={isRinging} peerConnection={peerConnection} localVideoRef={localVideoRef} remoteVideoRef={remoteVideoRef}/>}

            {incomingCall && !incomingCallAccepted && incomingCaller && (
                   <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50 animate-fade-in">
                   <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                     <p className="text-2xl font-semibold ">
                       INCOMING CALL
                     </p>
                     <div className='flex flex-col w-full p-2 items-center justify-center animate-pulse'>
                            <img src={`${incomingCaller?.avatar}`} alt="" className='h-24 w-24'/>
                            <p className='font-bold mt-4'>{incomingCaller?.role === 'user' ? 'Mr. ' : 'Dr. '}{incomingCaller?.lastName}</p>
                     </div>
                     <div className="mt-4 flex justify-center space-x-6">
                       {/* Accept Button */}
                       <button
                         onClick={acceptCall}
                         className="bg-green-500 text-white px-5 py-2 rounded-full flex items-center space-x-2 shadow-md hover:bg-green-600 "
                       >
                         <span className="material-symbols-outlined">call</span>
                         <span>Accept</span>
                       </button>
                       {/* Reject Button */}
                       <button
                         onClick={rejectCall}
                         className="bg-red-500 text-white px-5 py-2 rounded-full flex items-center space-x-2 shadow-md hover:bg-red-600 animate-shake"
                       >
                         <span className="material-symbols-outlined">call_end</span>
                         <span>Reject</span>
                       </button>
                     </div>
                   </div>
                 </div>
                )}


            {props?(
                <>
                   <div className="flex items-center justify-between p-4 bg-white shadow">
                   <div className='flex'>
                       <img src={props?.avatar} alt="Contact" className='w-10 h-10 rounded-full'/>
                       <p className="font-semibold text-lg ml-2 flex text-[#1EBDB8] flex mt-2">
                        {props?.name}
                        {active ? (
                            <span
                                className="relative flex h-4 w-4 ml-2 mt-1.5"
                                title="Online"
                            >
                                <span className="absolute inline-flex h-full w-full rounded-full bg-[#1EBDB8] opacity-75 animate-ping"></span>
                                 <span className="relative inline-flex h-4 w-4 rounded-full bg-[#1EBDB8]"></span>
                            </span>
                        ) : (
                            <span
                                className="material-symbols-outlined text-[20px] ml-2   mt-1.5 text-gray-400"
                                title="Offline"
                            >
                                radio_button_unchecked
                            </span>
                        )}
                        </p>

                   </div>
                   
                    <div className='flex space-x-4 text-gray-600 mt-3 mr-6'>
                        <span class="material-symbols-outlined hover:text-[#1EBDB8] cursor-pointer"> call </span>
                        <span class="material-symbols-outlined hover:text-[#1EBDB8] cursor-pointer" onClick={startCall}> video_call </span>
                    {/*  <button onClick={handleStartCall} className="p-2 mx-1 rounded-full bg-green-500 text-white"><FaPhoneAlt /></button>
                        <button onClick={handleStartCall} className="p-2 mx-1 rounded-full bg-green-500 text-white"><FaVideo /></button> */}
                    </div>
                    </div>
                    {recentAppointment && (
                       <div className="relative mt-2  mx-4 border-box-glow">
                       <div className="p-2 rounded-full  px-4 bg-white text-white relative z-10">
                         <h2 className="text-center text-lg font-semibold text-[#1EBDB8]">
                           {recentAppointment.type} Upcoming with {props?.name}
                         </h2>
                         <h2 className="text-center text-sm font-semibold text-[#1EBDB8]">
                           {recentAppointment.date &&
                             new Date(recentAppointment.date).toLocaleDateString('en-US', {
                               weekday: 'short',
                               month: 'short',
                               day: 'numeric',
                               year: 'numeric',
                             })}{' '}
                           {recentAppointment.time}
                         </h2>
                       </div>
                     </div>
                     
                   )}

                    <div className="flex-1 p-4 overflow-y-auto" ref={containerRef}>
                        {messages.map(message => (
                            <Message props={message} avatar={message?.type === 'incoming' ? props?.avatar : user?.avatar}/>
                        ))}
                        <div ref={messagesEndRef} />
                        {/* Attachments Preview */}
                        {props?.attachedImage && <img src={props?.attachedImage} alt="Attachment" className="w-1/2 mt-4 rounded-lg" />}
                        {props?.attachedFile && <p className="bg-gray-300 p-3 rounded-lg w-max mt-4">{props?.attachedFile.name}</p>}
                    </div>

                    {/* Input Field */}
                    <div className="flex items-center p-4 bg-[#DCE8FF]">
                        <div className="flex p-3 bg-white rounded-[30px] justify-between w-[95%] relative">
                            <input
                                type="text"
                                name="messageInput" // make sure this isn't a common name like 'message' or 'text'
                                placeholder="Write something..."
                                value={message}
                                className="focus:outline-none w-[90%]"
                                style={{
                                    fontFamily:
                                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI Emoji', 'Noto Color Emoji', 'Android Emoji', sans-serif",
                                }}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyPress}
                                autoComplete="new-password" // 👈 this is the hacky workaround!
                                spellCheck="true"
                                autoCorrect="off"
                            />

                            <div className="flex font-thin space-x-2 justify-center items-center">
                                <label className="flex flex-col items-center cursor-pointer">
                                    <input type="file" className="hidden" onChange={handleFileUpload} />
                                    <span className="material-symbols-outlined text-[#1EBDB8]">
                                        attachment
                                    </span>
                                </label>
                                <label className="flex flex-col items-center cursor-pointer">
                                    <input type="file" accept="image/*" capture="camera" className="hidden" onChange={handleFileUpload} />
                                    <span className="material-symbols-outlined text-[#1EBDB8]">
                                        photo_camera
                                    </span>
                                </label>
                                <span
                                    className={`material-symbols-outlined flex items-center justify-center ${showEmojiPicker ? 'text-white bg-[#1EBDB8] rounded-full' : 'text-[#1EBDB8]'} cursor-pointer`}
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                >
                                    sentiment_satisfied
                                </span>
                            </div>

                            {showEmojiPicker && (
                            <div className="absolute bottom-12 right-4 z-50 bg-white shadow-lg rounded-lg">
                                <EmojiPicker onEmojiClick={handleEmojiSelect} />
                            </div>
                            )}
                        </div>
                        <button
                            className="p-3 mx-2 rounded-full bg-[#1EBDB8] text-white flex"
                            onClick={sendMessage}
                        >
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </div>
                   

                </>
            ):(
                <div className='w-full h-full flex justify-center text-[#1EBDB8] font-semibold text-center items-center'>
                    CHOOSE A CONTACT TO START COVERSATION
                </div>
            )}
      </div>
    );
}

export default ChatArea;