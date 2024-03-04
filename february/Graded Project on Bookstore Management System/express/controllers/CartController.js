const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    // Retrieve the user's cart from the database
    let cart = await Cart.findOne({ userId: req.userId });

    // If the user doesn't have a cart, create a new one
    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [] });
    }

    // Check if the book
