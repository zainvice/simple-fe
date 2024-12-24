import React, { useState } from 'react';

const ProfilePage = () => {
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

  return (
    <div className="px-6 mx-auto bg-white rounded-lg shadow-md">
      {/* Banner */}
      <div className="h-20 w-full bg-gradient-to-r from-green-200 to-yellow-200 rounded-t-lg"></div>

      {/* Profile Details */}
      <div className="flex items-center mt-[-50px] mb-4">
        <img
          src={profile.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-white object-cover"
        />
        <div className="ml-4">
          <h2 className="text-2xl font-semibold">{profile.fullName}</h2>
          <p className="text-gray-500">{profile.email}</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Form Fields */}
      {isEditing ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Nick Name</label>
            <input
              type="text"
              name="nickName"
              value={profile.nickName}
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

          {/* Avatar Upload */}
          <div className="col-span-2">
            <label className="block text-gray-700">Change Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <label>Full Name</label>
            <p className="border p-2 rounded-lg">{profile.fullName}</p>
          </div>
          <div>
            <label>Nick Name</label>
            <p className="border p-2 rounded-lg">{profile.nickName}</p>
          </div>
          <div>
            <label>Gender</label>
            <p className="border p-2 rounded-lg">{profile.gender}</p>
          </div>
          <div>
            <label>Country</label>
            <p className="border p-2 rounded-lg">{profile.country}</p>
          </div>
          <div>
            <label>Language</label>
            <p className="border p-2 rounded-lg">{profile.language}</p>
          </div>
          <div>
            <label>Time Zone</label>
            <p className="border p-2 rounded-lg">{profile.timeZone}</p>
          </div>
        </div>
      )}

      {/* Email List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">My Email Address</h3>
        <ul className="mt-2">
          {profile.emails.map((email, index) => (
            <li key={index} className="flex items-center mb-2">
              <span className="text-gray-700">{email.email}</span>
              <span className="ml-2 text-sm text-gray-500">{email.addedAt}</span>
            </li>
          ))}
        </ul>
        {isEditing && (
          <div className="flex items-center mt-4">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Add Email Address"
              className="flex-1 p-2 border rounded-lg mr-2"
            />
            <button
              onClick={handleAddEmail}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              + Add Email Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
