import React, { useState } from "react";

const ProfileManagement = () => {
  const [user, setUser] = useState({
    name: "Zain Ul Hassan",
    email: "zainvoice@gmail.com",
    language: "English",
    country: "United States",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h (am/pm)",
    timeZone: "Central Time - US & Canada",
    profilePic: "https://via.placeholder.com/100", // Replace with actual image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 space-y-6 w-full">
      <h2 className="text-xl font-bold text-blue-600">Profile</h2>
      <div className="bg-gradient-to-r from-cyan-400 to-yellow-200 h-16 rounded-lg"></div>

      <div className="flex flex-col md:flex-row items-center gap-6 mt-4">
        <div className="relative">
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full text-sm shadow-md">
            Update
          </button>
        </div>
        <button className="text-red-500">Remove</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-600">Language</label>
          <select name="language" value={user.language} onChange={handleChange} className="w-full p-2 border rounded-lg">
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600">Date Format</label>
          <select name="dateFormat" value={user.dateFormat} onChange={handleChange} className="w-full p-2 border rounded-lg">
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600">Time Format</label>
          <select name="timeFormat" value={user.timeFormat} onChange={handleChange} className="w-full p-2 border rounded-lg">
            <option>12h (am/pm)</option>
            <option>24h</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600">Time Zone</label>
          <select name="timeZone" value={user.timeZone} onChange={handleChange} className="w-full p-2 border rounded-lg">
            <option>Central Time - US & Canada</option>
            <option>GMT</option>
            <option>PST</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600">Country</label>
          <select name="country" value={user.country} onChange={handleChange} className="w-full p-2 border rounded-lg">
            <option>United States</option>
            <option>Canada</option>
            <option>UK</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow">Save Changes</button>
          <button className="ml-2 border px-4 py-2 rounded-lg">Cancel</button>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow">Delete Account</button>
      </div>
    </div>
  );
};

export default ProfileManagement;
