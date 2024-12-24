import React from 'react';
import Message from './message';

const ChatArea = ({props}) => {
    return (
        <div className="flex-1 flex flex-col shadow-md rounded-[10px]">
            {props?(
                <>
                   <div className="flex items-center justify-between p-4 bg-white shadow">
                   <div className='flex'>
                       <img src={props?.avatar} alt="Contact" className='w-10 h-10 rounded-full'/>
                       <p className="font-semibold text-lg ml-2 text-[#1EBDB8] flex mt-2">{props?.name}{props?.active ? <span class="material-symbols-outlined text-[20px] ml-2 mt-1 text"> radio_button_checked </span>: <span class="material-symbols-outlined text-[20px] ml-2 mt-1 text-gray-400"> radio_button_unchecked </span>}</p>
                   </div>
                    <div className='flex space-x-2 text-[#BABABA] mt-3'>
                        <span class="material-symbols-outlined"> search </span>
                        <span class="material-symbols-outlined"> favorite </span>
                        <span class="material-symbols-outlined"> notifications </span>
                    {/*  <button onClick={handleStartCall} className="p-2 mx-1 rounded-full bg-green-500 text-white"><FaPhoneAlt /></button>
                        <button onClick={handleStartCall} className="p-2 mx-1 rounded-full bg-green-500 text-white"><FaVideo /></button> */}
                    </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto">
                    {props?.messages.map(message => (
                        <Message props={message} avatar={props?.avatar}/>
                    ))}
                    {/* Attachments Preview */}
                    {props?.attachedImage && <img src={props?.attachedImage} alt="Attachment" className="w-1/2 mt-4 rounded-lg" />}
                    {props?.attachedFile && <p className="bg-gray-300 p-3 rounded-lg w-max mt-4">{props?.attachedFile.name}</p>}
                    </div>

                    {/* Input Field */}
                    <div className="flex items-center p-4 bg-[#DCE8FF]">
                        <div className='flex p-3 bg-white rounded-[30px] justify-between w-[95%]'>
                            <input type="text" placeholder="Write something..." className="focus:outline-none w-[90%]" />
                            <div className='flex font-thin space-x-2'>
                                <span className='material-symbols-outlined text-[#1EBDB8]'>attachment</span>
                                <span className='material-symbols-outlined text-[#1EBDB8]'>photo_camera</span>
                                <span className='material-symbols-outlined text-[#1EBDB8]'>sentiment_satisfied</span>
                                

                            </div>
                        </div>
                        <button className="p-3 mx-2 rounded-full bg-[#1EBDB8] text-white flex"><span class="material-symbols-outlined"> send </span></button>
                        
                    </div>
                </>
            ):(
                <>
                </>
            )}
      </div>
    );
}

export default ChatArea;