import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  const [pushNotification, setPushNotification] = useState([]);
  useEffect(() => {
    if (Notification.permission === 'default' || Notification.permission === 'denied') {
      Notification.requestPermission().then((permission) => {
        console.log('Current Notification permission:', Notification.permission);
        if (permission === 'granted') {
          console.log('Permission granted');
        } else {
          console.log('Permission denied');
        }
      })
    }
    socket.on('pushNotification', (data) => {
      console.log('Received notification', data);
      if (Notification.permission === 'granted') {
        new Notification("New notification ",
          {
            body: data.message,
            // icon: 'https://via.placeholder.com/50'
          });
      }
      setPushNotification((prev) => [...prev, data])
    })


    // socket.on('pushNotification', (data) => {
    //   try {
    //     const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    //     console.log('Parsed notification:', parsedData);
    //     if (parsedData.message) {
    //       new Notification('New notification', {
    //         body: parsedData.message,
    //         icon: 'https://via.placeholder.com/50',
    //       });
    //       setPushNotification((prev) => [...prev, parsedData]);
    //     }
    //   } catch (error) {
    //     console.error('Failed to parse notification data:', error);
    //   }
    // });
    return () => {
      socket.off('pushNotification');
    }
  }, [])
  return (
    <div>
      <h1>Push Notification</h1>
      <ul> {pushNotification.map((notifi, index) => (
        <li key={index}>{notifi.message}</li>
      ))}</ul>
    </div>
  )
}

export default App;
