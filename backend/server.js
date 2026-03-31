const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// const masterRoutes = require('./routes/masterRoutes');
// const applicantRoutes = require('./routes/applicantRoutes');
// const admissionRoutes = require('./routes/admissionRoutes');
// const dashboardRoutes = require('./routes/dashboardRoutes');

const masterRoutes = require('./routes/masterRoutes');
console.log('masterRoutes:', masterRoutes);

const applicantRoutes = require('./routes/applicantRoutes');
console.log('applicantRoutes:', applicantRoutes);

const admissionRoutes = require('./routes/admissionRoutes');
console.log('admissionRoutes:', admissionRoutes);

const dashboardRoutes = require('./routes/dashboardRoutes');
console.log('dashboardRoutes:', dashboardRoutes);

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/admissionCRM');

app.use('/api/master', masterRoutes);
app.use('/api/applicant', applicantRoutes);
app.use('/api/admission', admissionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/admission', require('./routes/admissionRoutes'));

app.listen(5000, () => console.log('Server running on port 5000'));