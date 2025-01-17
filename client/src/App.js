import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  // const [pushNotification, setPushNotification] = useState([]);
  // useEffect(() => {
  //   if (Notification.permission === 'default' || Notification.permission === 'denied') {
  //     Notification.requestPermission().then((permission) => {
  //       console.log('Current Notification permission:', Notification.permission);
  //       if (permission === 'granted') {
  //         console.log('Permission granted');
  //       } else {
  //         console.log('Permission denied');
  //       }
  //     })
  //   }
  //   socket.on('pushNotification', (data) => {
  //     console.log('Received notification', data);
  //     if (Notification.permission === 'granted') {
  //       new Notification("New notification ",
  //         {
  //           body: data.message,
  //           // icon: 'https://via.placeholder.com/50'
  //         });
  //     }
  //     setPushNotification((prev) => [...prev, data])
  //   })

  //   return () => {
  //     socket.off('pushNotification');
  //   }
  // }, [])

  //   return (
  //     <div>
  //       <h1>Push Notification</h1>
  //       <ul> {pushNotification.map((notifi, index) => (
  //         <li key={index}>{notifi.message}</li>
  //       ))}</ul>
  //     </div>
  //   )
  // }

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Listen for notifications from the server
    socket.on('notification', (data) => {
      setNotification(data);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('notification');
    };
  }, []);

  const handleResponse = (response) => {
    // Emit response back to the server
    socket.emit('response', response);
    alert(`You chose: ${response}`);
    setNotification(null); // Clear the notification after responding
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Interactive Notifications</h1>
      {notification ? (
        <div style={{
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '5px',
          marginTop: '20px',
        }}>
          <p>{notification.message}</p>
          <div>
            {notification.options.map((option) => (
              <button
                key={option}
                onClick={() => handleResponse(option)}
                style={{
                  margin: '5px',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  background: '#48BB78',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p>No notifications at the moment.</p>
      )}
    </div>
  );
};


export default App;
