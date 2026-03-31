const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  name: String,
  department: String,
  intake: Number,
  quotas: {
    KCET: Number,
    COMEDK: Number,
    Management: Number
  },
  filledSeats: {
    KCET: { type: Number, default: 0 },
    COMEDK: { type: Number, default: 0 },
    Management: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Program', programSchema);