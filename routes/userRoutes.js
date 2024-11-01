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
//route to update user profle

router.put('/update-profile', authenticateToken, async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    user.name = name;
    user.email = email;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});
module.exports = router;
