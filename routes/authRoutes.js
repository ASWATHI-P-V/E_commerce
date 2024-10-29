const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Request body:', req.body); // Log the request body

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid email' });

    console.log('User found:', user); // Log the user object
    console.log('Password:', password.toString()); // Log the password

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // Log the result of the password comparison

    if (!isMatch) return res.status(400).json({ msg: 'Invalid password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (err) {
    console.error('Error:', err); // Log the error
    res.status(500).send('Server error');
  }
});

// Register Route
// register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Request body:', req.body); // Log the request body

  // Validate request body
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please provide name, email, and password' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password });
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (err) {
    console.error('Error:', err); // Log the error
    res.status(500).send('Server error');
  }
});

module.exports = router;