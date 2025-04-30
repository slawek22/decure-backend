const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).send('Email already exists');

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  try {
    await user.save();
    res.send('User registered');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Email not found');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).send('Invalid password');

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
