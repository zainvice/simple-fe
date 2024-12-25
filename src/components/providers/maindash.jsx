import React, { useState } from 'react';
import AvailabilityCalendar from './availabilityCalender';

const ProviderMainDash = ({appointments}) => {

  return (
    <div className="p-6 mt-8 mx-2 border4 lg:mx-8 bg-white shadow-md rounded-[10px] max-h-[84%] overflow-y-auto">
     
      <div className="mb-4">
        <AvailabilityCalendar appointments={appointments}/>
      </div>
    </div>
  );
};

export default ProviderMainDash;
