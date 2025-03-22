import React, { useState, useEffect, useRef } from 'react';
import Message from './message';
import axios from 'axios';
import { getMessages } from '../../api/messageCalls';
import { getUserActiveStatus } from '../../api/userCalls';
import { useSelector } from 'react-redux';
import socket from '../../utils/socket';
import VideoCall from '../videoCall';

const ChatArea = ({props}) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const receiverEmail = props?.email
    const { user } = useSelector((state) => state.auth);
    const [active, setActive] = useState(false)

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = useRef(null);
    const [incomingCall, setIncomingCall] = useState()
    const [videoCallOn, setVideoCall] = useState(false)
    const [isRinging, setIsRinging] = useState(false);

    useEffect(() => {

        socket.on("receive_message", (data) => {
            console.log("Data", data)
            setMessages((prev) => [...prev, {...data, type: 'incoming'}]);
        });

        return () => {
           socket.off("receive_message");
        };
    }, [user]);
    useEffect(() => {
        const fetchUserStatus = async () => {
            try {
                const response = await getUserActiveStatus(props.email);
                console.log(response);
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

    const sendMessage = async() => {
       
        if (message.trim()) {
            const senderEmail = user?.email
            console.log("trying to send message")
            const data = { senderEmail, receiverEmail, content: message, createdAt: Date.now(), status: 'sent', type: 'outgoing' };
            const response = await socket.emit("send_message", data);
            console.log("Response", response)
            setMessages((prev) => [...prev, data]);
            setMessage("");
           
        }
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
    
    return (
        <div className="flex-1 flex flex-col shadow-md rounded-[10px]">
            {videoCallOn && <VideoCall onEndCall={handleEndCall} peerConnection={peerConnection} localVideoRef={localVideoRef} remoteVideoRef={remoteVideoRef}/>}

            {incomingCall && !incomingCallAccepted && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                            <p className="text-lg font-semibold">{incomingCall.from.caller} is calling...</p>
                            <div className="mt-4 flex justify-center space-x-4">
                                <button onClick={acceptCall} className="bg-green-500 text-white px-4 py-2 rounded">Accept</button>
                                <button onClick={rejectCall} className="bg-red-500 text-white px-4 py-2 rounded">Reject</button>
                            </div>
                        </div>
                    </div>
                )}
            {isRinging && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                            <p className="text-lg font-semibold">Ringing Please Hold...</p>
                            <div className="mt-4 flex justify-center space-x-4">
                               
                                <button onClick={handleEndCall} className="bg-red-500 text-white px-4 py-2 rounded">End</button>
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

                    <div className="flex-1 p-4 overflow-y-auto">
                    {messages.map(message => (
                        <Message props={message} avatar={message?.type === 'incoming' ? props?.avatar : user?.avatar}/>
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
                <div className='w-full h-full flex justify-center text-[#1EBDB8] font-semibold text-center items-center'>
                    CHOOSE A CONTACT TO START COVERSATION
                </div>
            )}
      </div>
    );
}

export default ChatArea;