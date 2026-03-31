const Program = require('../models/Program');
const Applicant = require('../models/Applicant');
const Admission = require('../models/Admission');

const allocateSeat = async (req, res) => {
  try {
    const { applicantId, programId, quota } = req.body;

    const program = await Program.findById(programId);
    if (!program) return res.status(404).json({ error: 'Program not found' });

    const applicant = await Applicant.findById(applicantId);
    if (!applicant) return res.status(404).json({ error: 'Applicant not found' });

    if (!program.quotas[quota]) {
      return res.status(400).json({ error: 'Invalid quota type' });
    }

    program.filledSeats = program.filledSeats || {};
    if ((program.filledSeats[quota] || 0) >= program.quotas[quota]) {
      return res.status(400).json({ error: 'No seats available in this quota' });
    }

    program.filledSeats[quota] = (program.filledSeats[quota] || 0) + 1;
    await program.save();

    const admissionNumber = 'ADM' + Date.now();
    const admission = new Admission({
      applicantId,
      programId,
      quota,
      admissionNumber,
      status: 'Allocated'
    });
    await admission.save();

    res.json({ admissionNumber, message: 'Seat allocated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const confirmAdmission = async (req, res) => {
//   try {
//     const { admissionId } = req.body;
//     const admission = await Admission.findOne({ admissionNumber: admissionId });
//     if (!admission) return res.status(404).json({ error: 'Admission not found' });

//     const applicant = await Applicant.findById(admission.applicantId);
//     if (applicant.feeStatus !== 'Paid') {
//       return res.status(400).json({ error: 'Fee not paid' });
//     }

//     admission.status = 'Confirmed';
//     admission.confirmed = true;
//     await admission.save();

//     res.json({ message: 'Admission confirmed successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const confirmAdmission = async (req, res) => {
  try {
    const { admissionId } = req.body; // should be admissionNumber string
    const admission = await Admission.findOne({ admissionNumber: admissionId });
    if (!admission) {
      return res.status(404).json({ error: 'Admission not found' });
    }

    const applicant = await Applicant.findById(admission.applicantId);
    if (!applicant || applicant.feeStatus !== 'Paid') {
       return res.status(400).json({ error: 'Fee not paid' });
    }

    admission.status = 'Confirmed';
    admission.confirmed = true;
    await admission.save();

    // res.json({ message: 'Admission confirmed successfully' });
    res.json({ 
  confirmed: true, 
  admissionNumber: admission.admissionNumber, 
  message: 'Admission confirmed successfully' 
});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find() // remove filter
      .populate('applicantId', 'name feeStatus')
      .populate('programId', 'name');
    res.json(admissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { allocateSeat, confirmAdmission, listAdmissions };