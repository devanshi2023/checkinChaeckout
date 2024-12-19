// src/components/CheckInCheckOut.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckInCheckOut = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [userId, setUserId] = useState('671f1ee475ee50c7b2fa9a96');

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUserId(JSON.parse(loggedUser).id);
    }
  }, []);

  const handleCheckIn = () => {
    const start = Date.now();  // Record current timestamp
    setStartTime(start);
    setIsCheckedIn(true);

    // Send check-in time to the backend
    axios.post('http://localhost:5000/api/checkin', { userId, checkInTime: start })
      .then(response => {
        console.log('Checked in:', response.data);
      })
      .catch(error => {
        console.error('Error checking in:', error);
      });
  };

  const handleCheckOut = () => {
    const end = Date.now();  // Record current timestamp
    setEndTime(end);
    setIsCheckedIn(false);

    // Send check-out time to the backend
    axios.post('http://localhost:5000/api/checkout', { userId, checkInTime: startTime, checkOutTime: end })
      .then(response => {
        console.log('Checked out:', response.data);
      })
      .catch(error => {
        console.error('Error checking out:', error);
      });
  };

  return (
    <div>
      <h2>Check-In / Check-Out System</h2>
      {isCheckedIn ? (
        <button onClick={handleCheckOut}>Check Out</button>
      ) : (
        <button onClick={handleCheckIn}>Check In</button>
      )}
    </div>
  );
};

export default CheckInCheckOut;
