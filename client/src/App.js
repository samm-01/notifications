import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage'; // The main component with the bell icon
import NotificationsPage from './Pages/NotificationsPage'; // New page for all notifications

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;



// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import { FaBell } from 'react-icons/fa';

// const socket = io('http://localhost:8080'); // Backend server URL

// function App() {
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [newNotification, setNewNotification] = useState(false);

//   // Fetch existing notifications on mount
//   useEffect(() => {
//     // For getting notifications
//     fetch('http://localhost:8080/api/notifications')
//       .then((res) => res.json())
//       .then((data) => setNotifications(data.notifications || []))
//       .catch((error) => console.error('Error fetching notifications:', error));

//   }, []);

//   // Listen for new notifications
//   useEffect(() => {
//     socket.on('newNotification', (data) => {
//       setNotifications((prev) => [data, ...prev]); // Add new notification
//       setNewNotification(true); // Highlight the bell icon
//     });

//     return () => {
//       socket.off('newNotification');
//     };
//   }, []);

//   const handleBellClick = () => {
//     setShowNotifications(!showNotifications);
//     setNewNotification(false); // Remove highlight
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//       {/* Header */}
//       <header className="w-full max-w-3xl flex items-center justify-between bg-white shadow-md p-4 rounded-lg">
//         <h1 className="text-lg font-semibold text-gray-800">Notification System</h1>
//         <div className="relative" onClick={handleBellClick}>
//           <FaBell
//             className={`text-2xl cursor-pointer ${newNotification ? 'text-red-500' : 'text-gray-600'}`}
//           />
//           {newNotification && (
//             <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
//           )}
//         </div>
//       </header>

//       {/* Notifications Dropdown */}
//       {showNotifications && (
//         <div className="absolute top-16 right-6 w-96 bg-white border border-gray-200 shadow-lg rounded-lg z-10">
//           <h4 className="text-lg font-medium text-gray-700 px-4 py-2 border-b border-gray-100">
//             Notifications
//           </h4>
// <ul className="divide-y divide-gray-100">
//   {notifications.length > 0 ? (
//     notifications.map((notification, index) => (
//       <li
//         key={index}
//         className="px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
//       >
//         <div className="flex items-center gap-4">
//           {/* User Profile Image */}
//           <img
//             src={notification.userProfileImage}
//             alt="User Avatar"
//             className="w-10 h-10 rounded-full object-cover"
//           />
//           <div className="flex-1">
//             <div className="font-semibold text-gray-800">{notification.username}</div>
//             <div className="text-xs text-gray-500">{notification.source}</div>
//             <p className="text-sm text-gray-700">{notification.message}</p>
//           </div>
//         </div>
//       </li>
//     ))
//   ) : (
//     <li className="px-4 py-3 text-center text-sm text-gray-500">No notifications</li>
//   )}
// </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
