import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserByEmail } from '../../api/userCalls';

const ProfilePage = () => {

  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({
    fullName: 'Zane Ul Hassan',
    nickName: '',
    gender: '',
    country: '',
    language: '',
    timeZone: '',
    email: 'zainvicee@gmail.com',
    avatar: 'https://via.placeholder.com/100', // Placeholder avatar
    emails: [{ email: 'zainvicee@gmail.com', addedAt: '1 month ago' }],
  });
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
  }, [user])

  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmail = () => {
    if (newEmail) {
      setProfile((prev) => ({
        ...prev,
        emails: [...prev.emails, { email: newEmail, addedAt: 'Just now' }],
      }));
      setNewEmail('');
    }
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
        <div className="relative w-24 h-24">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
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
          <h2 className="text-2xl font-semibold">{profile.firstName} {profile.lastName}</h2>
          <p className="text-gray-500">{profile.email}</p>
        </div>
        <button
          onClick={() => onSave()}
          className="ml-auto mr-2 px-4 flex py-4 bg-[#1EBDB8] text-white rounded-full"
          title='Save'
        >
         <span class="material-symbols-outlined my-auto"> save </span>
        </button>
        
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
            <input
              type="text"
              name="gender"
              value={profile.gender}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={profile.country}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Language</label>
            <input
              type="text"
              name="language"
              value={profile.language}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Time Zone</label>
            <input
              type="text"
              name="timeZone"
              value={profile.timeZone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

         
        </div>
      
    
    </div>
  );
};

export default ProfilePage;
