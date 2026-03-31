const mongoose = require('mongoose');
const Program = require('./models/Program');
const Applicant = require('./models/Applicant');

mongoose.connect('mongodb://localhost:27017/admissionCRM');

async function seed() {
  await Program.deleteMany({});
  await Applicant.deleteMany({});

  const program = await Program.create({
    name: 'Computer Science',
    department: 'Engineering',
    intake: 60,
    quotas: { KCET: 30, COMEDK: 20, Management: 10 }
  });

  const applicant = await Applicant.create({
    name: 'Rahul Kumar',
    category: 'GM',
    entryType: 'Regular',
    quotaType: 'KCET',
    marks: 85,
    documents: 'Submitted',
    feeStatus: 'Paid'
  });

  console.log('Seeded Program:', program._id);
  console.log('Seeded Applicant:', applicant._id);

  mongoose.disconnect();
}

seed();