const express = require('express');
const OrderHistory = require('../models/OrderHistory');
const Product = require('../models/Product');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();
const User = require('../models/User');

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


// checkout

// router.post('/checkout',  async (req, res) => {
//   const { items, total, date , userId} = req.body;
//   try {
//     const order = new OrderHistory({ items, total, date, userId });
//     await order.save();
//     res.json(order);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// checkout route


router.post('/checkout', async (req, res) => {
  const { items, total, date, userId } = req.body;
  
  try {
    // Check if user has provided credit card details
    const user = await User.findById(userId);
    if (!user || !user.creditCard) {
      return res.status(400).json({ error: 'Credit card details required' });
    }
    
    const order = new OrderHistory({ items, total, date, userId });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


// Route to update user credit card details
router.put('/users/:userId/update-card', async (req, res) => {
  const { userId } = req.params;
  const { creditCard } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { creditCard }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'Credit card details updated successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});


module.exports = router;
