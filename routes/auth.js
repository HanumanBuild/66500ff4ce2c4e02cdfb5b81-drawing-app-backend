const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  try {
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ success: true, data: { userId: newUser._id, email: newUser.email, token } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error! Something went wrong.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser || !(await existingUser.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Wrong details please check at once' });
    }
    const token = jwt.sign({ userId: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, data: { userId: existingUser._id, email: existingUser.email, token } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error! Something went wrong.' });
  }
});

// Exporting the router
module.exports = router;