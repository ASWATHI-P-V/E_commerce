const express = require('express');
const OrderHistory = require('../models/OrderHistory');
const Product = require('../models/Product');
const router = express.Router();

// Add order
router.post('/order', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (product.stock < quantity) return res.status(400).json({ msg: 'Not enough stock' });

    product.stock -= quantity;
    await product.save();

    const order = new OrderHistory({ userId, productId, quantity });
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
