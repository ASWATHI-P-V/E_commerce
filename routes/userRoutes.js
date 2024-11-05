const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');

// Route to fetch user data
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); // exclude password
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update user profile route
router.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, phone, creditCard } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, address, phone, creditCard },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
