const Applicant = require('../models/Applicant');

exports.createApplicant = async (req, res) => {
  try {
    const applicant = new Applicant(req.body);
    await applicant.save();
    res.json(applicant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};