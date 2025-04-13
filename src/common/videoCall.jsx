import React, { useEffect, useRef, useState } from "react";

const VideoCall = ({ onEndCall, remoteVideoRef, peerConnection, localVideoRef, callInfo, isRinging}) => {


    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [screenSharing, setScreenSharing] = useState(false);
    const screenTrackRef = useRef(null);

   

    const toggleMute = () => {
        //const audioTracks = localVideoRef.current.srcObject.getAudioTracks();
        //audioTracks.forEach((track) => (track.enabled = !track.enabled));
        setIsMuted(!isMuted);
    };

    const toggleVideo = () => {
        const videoTracks = localVideoRef.current.srcObject.getVideoTracks();
        videoTracks.forEach((track) => (track.enabled = !track.enabled));
        setIsVideoOff(!isVideoOff);
    };

    const shareScreen = async () => {
        if (!screenSharing) {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            screenTrackRef.current = screenStream.getTracks()[0];
            peerConnection.current.getSenders().find(sender => sender.track.kind === "video").replaceTrack(screenTrackRef.current);
            setScreenSharing(true);

            screenTrackRef.current.onended = () => {
                stopScreenShare();
            };
        }
    };

    const stopScreenShare = () => {
        if (screenTrackRef.current) {
            screenTrackRef.current.stop();
            const videoTracks = localVideoRef.current.srcObject.getVideoTracks();
            peerConnection.current.getSenders().find(sender => sender.track.kind === "video").replaceTrack(videoTracks[0]);
            setScreenSharing(false);
        }
    };

    return (
        <div className="absolute inset-0 m-2 flex justify-center p-8 rounded-[30px] items-center bg-black bg-opacity-40 z-40">
            
            <div className="relative w-full h-full bg-gray-800 rounded">
                {/* Remote Video Fullscreen */}
                <div className="text-white bg-gray-800 bg-opacity-20 w-[20%] p-2 flex rounded m-2">  <img src="/logo-icon.png" alt="Logo" className="h-6 ml-2" /> <p className="ml-2">Appointment with Dr. Zain</p></div>
                <video ref={remoteVideoRef} autoPlay className="w-full h-full object-cover"></video>
                {isRinging && (
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse text-[#1EBDB8] font-bold text-2xl">
                        RINGING...
                    </div>
                    )}

                {/* Local Video in Bottom Right */}
                <div className="absolute bottom-4 right-4 w-36 h-36 bg-gray-800 border border-gray-400 rounded-lg overflow-hidden">
                    <video ref={localVideoRef} autoPlay muted className={`w-full h-full object-cover ${isVideoOff ? "opacity-20" : ""}`}></video>
                </div>

                {/* Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 p-3 bg-opacity-80 rounded-full">
                    <button onClick={toggleMute} className="bg-gray-700 w-12 h-12 bg-opacity-60 hover:bg-gray-600 text-white p-3 rounded-full">
                        {isMuted ? <span className="material-symbols-outlined"> mic </span> : <span className="material-symbols-outlined"> mic_off </span>}
                    </button>
                    <button onClick={toggleVideo} className="bg-gray-700 w-12 h-12 bg-opacity-60 hover:bg-gray-600 text-white p-3 rounded-full">
                        {isVideoOff ? <span className="material-symbols-outlined"> videocam </span> : <span className="material-symbols-outlined"> videocam_off </span>}
                    </button>
                    <button onClick={onEndCall} className="bg-red-600 w-16 h-12 hover:bg-red-500 text-white p-3 rounded-full">
                        <span className="material-symbols-outlined"> call_end </span>
                    </button>
                    <button onClick={screenSharing ? stopScreenShare : shareScreen} className="bg-gray-700 w-12 h-12 bg-opacity-60 hover:bg-gray-600 text-white p-3 rounded-full">
                        {screenSharing ? <span className="material-symbols-outlined "> stop_screen_share </span> : <span className="material-symbols-outlined "> screen_share </span>}
                    </button>
                    <button onClick={screenSharing ? stopScreenShare : shareScreen} className="bg-gray-700 w-12 h-12 bg-opacity-60 hover:bg-gray-600 text-white p-3 rounded-full">
                        <span className="material-symbols-outlined "> settings </span>
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default VideoCall;
