const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant' },
  programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
  quota: String,
  admissionNumber: String,
  confirmed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Admission', admissionSchema);