import React, { useState, useEffect } from 'react';

function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/notifications')
            .then((res) => res.json())
            .then((data) => setNotifications(data.notifications || []))
            .catch((error) => console.error('Error fetching notifications:', error));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <header className="w-full max-w-3xl bg-white shadow-md p-4 rounded-lg">
                <h1 className="text-lg font-semibold text-gray-800">All Notifications</h1>
            </header>

            <div className="w-full max-w-3xl bg-white mt-4 shadow-md p-4 rounded-lg">
                {notifications.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                        {notifications.map((notification, index) => (
                            <li key={index} className="px-4 py-3 text-sm text-gray-600">
                                <p className="text-gray-800 font-medium">{notification.message}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No notifications</p>
                )}
            </div>
        </div>
    );
}

export default NotificationsPage;
