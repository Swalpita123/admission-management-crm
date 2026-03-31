// const Program = require("../models/Program");
// const Applicant = require("../models/Applicant");
// const Admission = require("../models/Admission");
// const express = require('express');
// const router = express.Router();
// const { allocateSeat, confirmAdmission } = require('../controllers/admissionController');

// // Define routes
// router.post('/allocate', allocateSeat);
// router.post('/confirm', confirmAdmission);

// module.exports = router;

// function generateAdmissionNumber(inst, year, courseType, branch, quota, seq) {
//   return `${inst}/${year}/${courseType}/${branch}/${quota}/${String(seq).padStart(4, "0")}`;
// }

// const allocateSeat = async (req, res) => {
//   try {
//     const { applicantId, programId, quota } = req.body;

//     const program = await Program.findById(programId);
//     if (!program) return res.status(404).json({ error: "Program not found" });

//     const applicant = await Applicant.findById(applicantId);
//     if (!applicant)
//       return res.status(404).json({ error: "Applicant not found" });

//     if (!program.quotas[quota]) {
//       return res.status(400).json({ error: "Invalid quota type" });
//     }

//     program.filledSeats = program.filledSeats || {};
//     if ((program.filledSeats[quota] || 0) >= program.quotas[quota]) {
//       return res
//         .status(400)
//         .json({ error: "No seats available in this quota" });
//     }

//     program.filledSeats[quota] = (program.filledSeats[quota] || 0) + 1;
//     await program.save();

//     const admissionNumber = "ADM" + Date.now();
//     const admission = new Admission({
//       applicantId,
//       programId,
//       quota,
//       admissionNumber,
//       status: "Allocated",
//     });
//     await admission.save();

//     res.json({ admissionNumber, message: "Seat allocated successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const confirmAdmission = async (req, res) => {
//   try {
//     const { admissionId } = req.body;
//     const admission = await Admission.findById(admissionId);
//     if (!admission)
//       return res.status(404).json({ error: "Admission not found" });

//     const applicant = await Applicant.findById(admission.applicantId);
//     if (applicant.feeStatus !== "Paid") {
//       return res.status(400).json({ error: "Fee not paid" });
//     }

//     admission.status = "Confirmed";
//     await admission.save();

//     res.json({ message: "Admission confirmed successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // module.exports = { allocateSeat, confirmAdmission };

const express = require('express');
const router = express.Router();
const { allocateSeat, confirmAdmission, listAdmissions } = require('../controllers/admissionController');

router.post('/allocate', allocateSeat);
router.post('/confirm', confirmAdmission);
router.get('/list', listAdmissions);

module.exports = router;