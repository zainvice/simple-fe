import React from 'react';

const NotificationsOverlay = ({ notifications }) => {
  return (
    <div className="absolute top-12 right-6 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-40">
      <div className="bg-[#1EBDB8] p-4 text-lg text-white font-semibold border-b">Notifications</div>
      <ul className="max-h-60 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li
              key={index}
              className="px-4 py-3 border-b last:border-none hover:bg-gray-100 cursor-pointer"
            >
              <p className="text-sm text-gray-700">{notification.message}</p>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </li>
          ))
        ) : (
          <div className="p-4 text-sm text-gray-500">No notifications</div>
        )}
      </ul>
    </div>
  );
};

export default NotificationsOverlay;

// Example usage


