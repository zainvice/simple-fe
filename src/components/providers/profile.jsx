import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserByEmail } from '../../api/userCalls';

import zipcodes from 'us-zips'; // Validates US ZIP codes
import moment from 'moment-timezone'; // Fetches time zones

const genders = ['Male', 'Female', 'Non-Binary', 'Prefer not to say'];
const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];
const usStates = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
  { code: "DC", name: "District of Columbia" }, 
  { code: "PR", name: "Puerto Rico" },
  { code: "GU", name: "Guam" },
  { code: "AS", name: "American Samoa" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "VI", name: "U.S. Virgin Islands" }
];
const usStatesTimezones = {
  "AL": "America/Chicago", "AK": "America/Anchorage", "AZ": "America/Phoenix", "AR": "America/Chicago", "CA": "America/Los_Angeles",
  "CO": "America/Denver", "CT": "America/New_York", "DE": "America/New_York", "FL": "America/New_York", "GA": "America/New_York",
  "HI": "Pacific/Honolulu", "ID": "America/Boise", "IL": "America/Chicago", "IN": "America/Indiana/Indianapolis", "IA": "America/Chicago",
  "KS": "America/Chicago", "KY": "America/New_York", "LA": "America/Chicago", "ME": "America/New_York", "MD": "America/New_York",
  "MA": "America/New_York", "MI": "America/Detroit", "MN": "America/Chicago", "MS": "America/Chicago", "MO": "America/Chicago",
  "MT": "America/Denver", "NE": "America/Chicago", "NV": "America/Los_Angeles", "NH": "America/New_York", "NJ": "America/New_York",
  "NM": "America/Denver", "NY": "America/New_York", "NC": "America/New_York", "ND": "America/Chicago", "OH": "America/New_York",
  "OK": "America/Chicago", "OR": "America/Los_Angeles", "PA": "America/New_York", "RI": "America/New_York", "SC": "America/New_York",
  "SD": "America/Chicago", "TN": "America/Chicago", "TX": "America/Chicago", "UT": "America/Denver", "VT": "America/New_York",
  "VA": "America/New_York", "WA": "America/Los_Angeles", "WV": "America/New_York", "WI": "America/Chicago", "WY": "America/Denver"
};


const ProfilePageProv = () => {

  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({});
  const [timezones, setTimezones] = useState([]);
  useEffect(()=> {
    const fetchUser = async( user ) => {
        try {
            const response = await getUserByEmail(user.email)
            setProfile(response)
        } catch (error) {
            console.error("Error", error)
        }
    }
    if(user){
       fetchUser(user)
    }
    setTimezones(moment.tz.names());
  }, [user])

  const validateZip = (e) => {
    const zip = e.target.value;
    if (!zipcodes[zip]) {
      alert('Invalid ZIP Code!');
    } else {
      setProfile((prev) => ({ ...prev, zipCode: zip }));
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedProfile = { ...profile, [name]: value };
    
    if (name === "state" && usStatesTimezones[value]) {
      updatedProfile = { ...updatedProfile, timezone: usStatesTimezones[value] };
    }
    
    setProfile(updatedProfile);
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile((prev) => ({ ...prev, avatar: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const onSave = () => {

  }

  return (
    <div className="p-6 bg-white shadow-md rounded-[10px] mt-8 mx-8 overflow-y-auto max-h-[84%]">
      {/* Banner */}
      <div className="h-24 w-full bg-gradient-to-r from-[#1EBDB8] to-[#FAF6E0] rounded-t-lg"></div>

      {/* Profile Details */}
      <div className="flex items-center mb-4 mt-2">
         {/* Avatar with Hover Upload */}
         <div className="relative w-36 h-36">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-36 h-36 rounded-full border-4 border-white object-cover"
          />
          {/* Hover Effect */}
          <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
            <span className="text-white text-sm"><span class="material-symbols-outlined"> photo_camera </span></span>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
        </div>

        <div className="ml-4">
          <h2 className="text-2xl font-semibold flex">{profile.firstName} {profile.lastName} {profile.verified ? <p className='text-sm flex text-[#1E232F] font-normal ml-4'> <span className="material-symbols-outlined my-auto mr-2"> user_verified </span>Profile Verified</p> : <p className='text-sm flex text-[#1E232F] font-normal ml-4'> <span className="material-symbols-outlined my-auto text-[#EC5252] mr-2"> block </span><span className='my-auto text-xs'>Profile Not Verified</span></p>}</h2>
          <p className="text-gray-500">{profile.practiceName}</p> 
        </div>
        <div className='ml-auto flex space-x-4'>
        <button
          onClick={() => onSave()}
          className=" mr-2 px-4 flex py-4 bg-[#1EBDB8] text-white rounded-full"
          title='Start Verification'
        >
         Start Verification
        </button>
        <button
          onClick={() => onSave()}
          className=" mr-2 px-4 flex py-4 bg-[#1EBDB8] text-white rounded-full"
          title='Save'
        >
         <span class="material-symbols-outlined my-auto"> save </span>
        </button>

        </div>
        
      </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={profile.gender || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Gender</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">US State</label>
          <select
            name="state"
            value={profile.state || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select State</option>
            {Object.keys(usStatesTimezones).map((stateCode) => (
              <option key={stateCode} value={stateCode}>{stateCode}</option>
            ))}

          </select>
        </div>
        <div>
          <label className="block text-gray-700">ZIP Code</label>
          <input
            type="text"
            name="zipCode"
            value={profile.zipCode || ''}
            onBlur={validateZip}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            maxLength={5}
          />
        </div>
        <div>
          <label className="block text-gray-700">Language</label>
          <select
            name="language"
            value={profile.language || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Time Zone</label>
          <select
            name="timeZone"
            value={profile.timeZone || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Time Zone</option>
            {timezones.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>


        </div>
     
    
    </div>
  );
};

export default ProfilePageProv;
