import React, { useEffect, useRef, useState } from "react";

const VideoCall = ({ onEndCall, remoteVideoRef, peerConnection, localVideoRef}) => {


    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [screenSharing, setScreenSharing] = useState(false);
    const screenTrackRef = useRef(null);

   

    const toggleMute = () => {
        const audioTracks = localVideoRef.current.srcObject.getAudioTracks();
        audioTracks.forEach((track) => (track.enabled = !track.enabled));
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
        <div className="relative w-full h-screen bg-black">
            {/* Remote Video Fullscreen */}
            <video ref={remoteVideoRef} autoPlay className="w-full h-full object-cover"></video>

            {/* Local Video in Bottom Right */}
            <div className="absolute bottom-4 right-4 w-36 h-36 bg-gray-800 border border-gray-400 rounded-lg overflow-hidden">
                <video ref={localVideoRef} autoPlay muted className={`w-full h-full object-cover ${isVideoOff ? "opacity-20" : ""}`}></video>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 p-3 bg-gray-900 bg-opacity-80 rounded-full">
                <button onClick={toggleMute} className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full">
                    {isMuted ? "🔇 Unmute" : "🎤 Mute"}
                </button>
                <button onClick={toggleVideo} className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full">
                    {isVideoOff ? "📹 Turn On" : "📷 Turn Off"}
                </button>
                <button onClick={screenSharing ? stopScreenShare : shareScreen} className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full">
                    {screenSharing ? "🛑 Stop Sharing" : "🖥 Share Screen"}
                </button>
                <button onClick={onEndCall} className="bg-red-600 hover:bg-red-500 text-white p-3 rounded-full">
                    📞 End Call
                </button>
            </div>
        </div>
    );
};

export default VideoCall;
