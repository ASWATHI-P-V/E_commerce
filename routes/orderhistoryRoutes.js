// orderhistoryRoutes.js
const express = require('express');
const router = express.Router();
const OrderHistory = require('../models/OrderHistory'); // Assume you have created this model

// POST endpoint to save order history
router.post('/', async (req, res) => {
  try {
    const { items, total, date } = req.body;

    const newOrder = new OrderHistory({ items, total, date });
    await newOrder.save();

    res.status(201).json({ msg: 'Order saved successfully' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ msg: 'Failed to save order' });
  }
});

module.exports = router;
