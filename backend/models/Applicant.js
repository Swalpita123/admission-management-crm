const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  name: String,
  category: String,
  entryType: String,
  quotaType: String,
  marks: Number,
  documents: { type: String, enum: ['Pending', 'Submitted', 'Verified'], default: 'Pending' },
  feeStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }
});

module.exports = mongoose.model('Applicant', applicantSchema);