const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();

// Add hotel to cart
router.post('/add', async (req, res) => {
  const { hotelId } = req.body;

  const existingCartItem = await Cart.findOne({ hotelId });
  if (existingCartItem) {
    existingCartItem.quantity += 1;
    await existingCartItem.save();
  } else {
    const newCartItem = new Cart({ hotelId });
    await newCartItem.save();
  }

  res.status(201).json({ message: 'Hotel added to cart!' });
});

// Get cart items
router.get('/', async (req, res) => {
  const cartItems = await Cart.find().populate('hotelId');
  res.json(cartItems);
});

// Remove hotel from cart
router.delete('/:id', async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: 'Hotel removed from cart!' });
});

module.exports = router;
