const express = require('express');
const router = express.Router();
const { createProgram } = require('../controllers/masterController');

router.post('/program', createProgram);

module.exports = router;