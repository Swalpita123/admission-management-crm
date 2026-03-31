const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
  name: String,
  campuses: [String]
});

module.exports = mongoose.model('Institution', institutionSchema);