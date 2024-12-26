import React, { useState } from 'react';
import AvailabilityCalendar from './availabilityCalender';

const ProviderMainDash = ({appointments}) => {

  return (
    <div className="p-6 mt-8 mx-2 border4 lg:mx-8 bg-white shadow-md rounded-[10px] h-[82%] overflow-y-auto">

        <AvailabilityCalendar appointments={appointments}/>
     
    </div>
  );
};

export default ProviderMainDash;
