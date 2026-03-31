const Program = require('../models/Program');
const Applicant = require('../models/Applicant');

exports.getDashboard = async (req, res) => {
  try {
    const programs = await Program.find();
    const applicants = await Applicant.find();

    const totalIntake = programs.reduce((sum, p) => sum + p.intake, 0);
    const admitted = programs.reduce((sum, p) => sum + p.filledSeats.KCET + p.filledSeats.COMEDK + p.filledSeats.Management, 0);
    const remaining = totalIntake - admitted;

    const pendingDocs = applicants.filter(a => a.documents !== 'Verified').length;
    const pendingFees = applicants.filter(a => a.feeStatus !== 'Paid').length;

    res.json({ totalIntake, admitted, remaining, pendingDocs, pendingFees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};