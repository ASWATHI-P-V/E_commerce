const express = require('express');
const router = express.Router();
const OrderHistory = require('../models/OrderHistory');

// Route to get all order history of the user
router.post('/orderhistory', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const orderHistory = await OrderHistory.find({ userId });
    res.json(orderHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error while retrieving order history' });
  }
});

module.exports = router;
