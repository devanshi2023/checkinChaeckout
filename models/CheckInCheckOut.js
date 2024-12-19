const mongoose = require('mongoose');

const checkInCheckOutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    checkInTime: { type: Date, required: true },
    checkOutTime: { type: Date },
    duration: { type: String }, // Store duration as a string with the unit
});

module.exports = mongoose.model('CheckInCheckOut', checkInCheckOutSchema);

