const Program = require('../models/Program');

exports.createProgram = async (req, res) => {
  try {
    const program = new Program(req.body);
    await program.save();
    res.json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};