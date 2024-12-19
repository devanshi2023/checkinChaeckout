const express = require('express');
const CheckInCheckOut = require('../models/CheckInCheckOut');

const router = express.Router();

// Route to handle check-in
router.post('/checkin', (req, res) => {
    const { userId, checkInTime } = req.body;

    const newCheckIn = new CheckInCheckOut({
        userId,
        checkInTime: new Date(checkInTime),
    });

    newCheckIn.save()
        .then(checkIn => res.status(201).json(checkIn))
        .catch(err => res.status(500).json({ message: 'Error checking in', error: err }));
});

// Route to handle check-out
router.post('/checkout', (req, res) => {
    const { userId, checkInTime, checkOutTime } = req.body;

    CheckInCheckOut.findOne({ userId, checkInTime: new Date(checkInTime) })
        .then(checkIn => {
            if (!checkIn) {
                return res.status(404).json({ message: 'Check-in not found' });
            }

            // Convert check-out time to Date
            checkIn.checkOutTime = new Date(checkOutTime);

            // Calculate the duration between check-in and check-out in milliseconds
            const durationInMillis = checkIn.checkOutTime - checkIn.checkInTime;

            // Convert to seconds, minutes, or hours as appropriate
            let duration;
            if (durationInMillis < 60000) { // Less than 1 minute
                duration = `${Math.floor(durationInMillis / 1000)} seconds`; // Duration in seconds
            } else if (durationInMillis < 3600000) { // Less than 1 hour
                duration = `${Math.floor(durationInMillis / (1000 * 60))} minutes`; // Duration in minutes
            } else { // 1 hour or more
                duration = `${Math.floor(durationInMillis / (1000 * 60 * 60))} hours`; // Duration in hours
            }

            // Store the duration in the document
            checkIn.duration = duration;

            checkIn.save()
                .then(updatedCheckIn => res.status(200).json(updatedCheckIn))
                .catch(err => res.status(500).json({ message: 'Error checking out', error: err }));
        })
        .catch(err => res.status(500).json({ message: 'Error retrieving check-in', error: err }));
});

module.exports = router;
