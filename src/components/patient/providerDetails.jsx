import React, { useState } from "react";

const ProviderDetails = ({ doctor, visitReasons}) => {
  const [selectedTab, setSelectedTab] = useState("New Patient");
  const [activeTab, setActiveTab] = useState('Highlights')


  return (
    <div className="p-6 bg-teal-50 h-[90%]">
      <div className="mx-auto bg-white rounded-lg h-[100%] shadow-lg grid grid-cols-2 gap-6 p-6">
        {/* Left Column */}
        <div className="col-span-1 border-r border-gray-200 h-[90%] overflow-auto">
          <div className="flex items-center mb-4">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-44 h-44 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <p className="text-sm text-gray-500">{doctor.type}</p>
              <p className="text-sm text-gray-500">{doctor.location}</p>
              <p className="text-sm text-red-500">{doctor.status}</p>
            </div>
          </div>
          <div className="text-gray-600 space-y-2 h-[65%] relative flex-1">
            <div className="flex space-x-4 mr-8 justify-between ">
              <p className= {`${activeTab==='Highlights'&& 'border-b-[3px] text-black border-black '} py-2 cursor-pointer`} onClick={(e)=> setActiveTab('Highlights')}>Highlights</p>
              <p className= {`${activeTab==='About'&& 'border-b-[3px] text-black border-black '} py-2 cursor-pointer`} onClick={(e)=> setActiveTab('About')} >About</p>
              <p className= {`${activeTab==='Location'&& 'border-b-[3px] text-black border-black '} py-2 cursor-pointer`} onClick={(e)=> setActiveTab('Location')} >Location</p>
              <p className= {`${activeTab==='Reviews'&& 'border-b-[3px] text-black border-black '} py-2 cursor-pointer`} onClick={(e)=> setActiveTab('Reviews')} >Reviews</p>
              <p className= {`${activeTab==='FAQs'&& 'border-b-[3px] text-black border-black '} py-2 cursor-pointer`} onClick={(e)=> setActiveTab('FAQs')} >FAQs</p>
            </div>
            <div className= {`${activeTab==='Highlights'? 'block ' : 'hidden '} grid grid-cols-1 text-justify mr-8 h-[85%] text-black overflow-y-auto`} >
               <p className="my-4 text-[#474747]">{doctor.highlight}</p>
               <p className='my-8'>

                {Array.isArray(doctor?.features)
                    ? doctor.features.map((feature, index) => `${feature}. `)
                    : 'No features available'}
                </p>
            </div>
            <div className= {`${activeTab==='About'? 'block ' : 'hidden '} grid grid-cols-1 text-justify mr-8 h-[85%] text-black overflow-y-auto  `} >
               <div className="my-4">
                 <p className="font-semibold">Identity</p>
                 <div className="flex w-full mt-2 justify-between">
                    <p className="flex flex-col ml-2"><span className="font-semibold">Gender</span> <span className="text-[#474747]">{doctor.gender.toUpperCase()}</span></p>
                    <p className="flex flex-col mr-2"><span className="font-semibold">Languages Spoken</span> <span className="text-[#474747]">{doctor?.languagesSpoken.map(langauge => `${langauge}`).join(', ')}</span></p>
                 </div>
               </div>
               <div className="my-4">
                 <p className="font-semibold">Clientele Seen</p>
                 <div className="flex w-full mt-2 justify-between">
                   
                    <p className="flex flex-col mx-2"><span className="text-[#474747]">{doctor?.clientele.map(langauge => `${langauge}`).join(', ')}</span></p>
                 </div>
               </div>
               <div className="my-4">
                  <p className="font-semibold">Getting to know Dr. Adam Cooper, MD</p>
                  <p className="mt-2 text-[#474747]">{doctor.about}</p>
               </div>
               
             
            </div>
            <div className= {`${activeTab==='Location'? 'block ' : 'hidden '} grid grid-cols-1 text-justify mr-8 h-[85%] text-black overflow-y-auto`} >
                <div className="my-4">
                 <p className="font-semibold">Office location</p>
                 <div className="flex-1 w-full mt-2 justify-center text-center">
                   
                    <p className="flex flex-col mx-2 text-center"><span className="text-[#474747]">{doctor?.location}</span></p>
                    <a href="google.com" className="underline">Get Directions</a>
                 </div>
               </div>
            </div>
            <div className= {`${activeTab==='Reviews'? 'block ' : 'hidden '} grid grid-cols-1 text-justify mr-8 h-[85%] text-black overflow-y-auto`} >
               <p className="font-semibold">Provider Reviews</p>
               
                <div className="flex w-full justify-between overflow-y-auto h-[80%]">
                   
                   <p className="flex flex-col w-full ml-2">{doctor?.reviews.map(review => <p className="flex flex-col my-2"><p className="flex justify-between"><span className="font-semibold">{review.name}</span> <span className="font-semibold">⭐{review.rating} </span> </p><span className="text-[#474747]">{review.review}</span> </p>)}</p>
                </div>
               
            </div>
            <div className= {`${activeTab==='FAQs'? 'block ' : 'hidden '} grid grid-cols-1 text-justify mr-8 h-[85%] text-black`} >
                <p className="font-semibold">Frequently Asked Questions</p>
                 <div className="flex w-full justify-between overflow-y-auto">
                   
                    <p className="flex flex-col ml-2">{doctor?.faqs.map(qa => <p className="flex flex-col my-2"><span className="font-semibold">{qa.question}</span> <span className="text-[#474747]">{qa.answer}</span> </p>)}</p>
                 </div>
            </div>
           
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-1 ">
          <h3 className="text-lg font-bold mb-2">Book an appointment on Simple</h3>
          <p className="text-sm text-gray-500 mb-4">
            The office partners with Simple to schedule appointments.
          </p>

          {/* Scheduling Details */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Scheduling details
            </label>
            <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-[#1EBDB8]">
              {visitReasons.map((category, categoryIndex) => (
                <optgroup key={categoryIndex} label={category.label}>
                  {category.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Tab Navigation */}
          <div className="flex mb-4">
            <button
              className={`w-1/2 py-2 text-center ${
                selectedTab === "New Patient"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-700"
              } rounded-l-lg`}
              onClick={() => setSelectedTab("New Patient")}
            >
              New Patient
            </button>
            <button
              className={`w-1/2 py-2 text-center ${
                selectedTab === "Returning Patient"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-700"
              } rounded-r-lg`}
              onClick={() => setSelectedTab("Returning Patient")}
            >
              Returning Patient
            </button>
          </div>
          <div className="text-center justify-center">
            {doctor?.availability?.length> 0 ? 
                  <>
                      <div className='grid grid-cols-7 gap-2 ' id='availibility'>
                          {doctor?.availability?.map((available)=>(
                      
                              <div className={`flex-1  rounded-[10px]  ${available?.availableAppointments?.length>0 ? 'bg-[#1EBDB8] text-white cursor-pointer': 'text-[#707271] bg-[#F6F3F3] cursor-disabled'}`} >
                                  
                                      <p className="my-4">{available?.day.slice(0, 3)}</p> 
                                      <p className='my-4'>
                                          {new Date(available?.date).toLocaleDateString('en-US', {
                                              month: 'short',
                                              day: 'numeric'
                                          })}
                                      </p> 
                                  
                                  {available?.availableAppointments?.length > 0 ? (
                                      <p className="m-2">{available?.availableAppointments?.length}&nbsp;appts</p>
                                  ) : (
                                      <p className="m-2">No&nbsp;appts</p>
                                  )}
                              </div>
                          
                          ))}
                  </div>
                  <button className="mt-4 w-full py-2 bg-teal-500 text-white rounded text-sm hover:bg-teal-600">
                    View more availability
                  </button>
                </>
                  
              : (
                  <div className='text-center' id='no-availibility'>
                      <p className='text-[#707271] text-center my-10'>
                          At this time, the provider has no availability on Simple at this location <br/> for appointments that meet your search criteria.
                      </p>
                  </div>
            )}
            
          </div>
         
          
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;
