const Cart = require('../models/Cart');
const Book = require('../models/Book');

exports.addToCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    // Retrieve the user's cart from the database
    let cart = await Cart.findOne({ userId: req.userId });

    // If the user doesn't have a cart, create a new one
    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [] });
    }

    // Check if the book is already in the cart
    const existingItem = cart.items.find(item => item.bookId.toString() === bookId);

    // If the book is in the cart, update the quantity
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      // If the book is not in the cart, add a new item
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ success: false, message: 'Book not found.' });
      }

      const newItem = { bookId, quantity, title: book.title, price: book.price };
      cart.items.push(newItem);
    }

    // Update or create the cart in the database
    await cart.save();

    res.json({ success: true, message: 'Book added to cart.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getCartContents = async (req, res) => {
  try {
    // Retrieve the user's cart from the database
    const cart = await Cart.findOne({ userId: req.userId });

    // If the user doesn't have a cart, return an empty cart
    if (!cart) {
      return res.json({ success: true, cart: { items: [], total: 0 } });
    }

    // Calculate the total price for the items in the cart
    const total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    res.json({ success: true, cart: { items: cart.items, total } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { bookId } = req.params;

    // Retrieve the user's cart from the database
    const cart = await Cart.findOne({ userId: req.userId });

    // If the user doesn't have a cart or the item is not in the cart, return an error
    if (!cart || !cart.items.find(item => item.bookId.toString() === bookId)) {
      return res.status(404).json({ success: false, message: 'Item not found in the cart.' });
    }

    // Update the quantity of the specified item
    cart.items.find(item => item.bookId.toString() === bookId).quantity = quantity;

    // Update the cart in the database
    await cart.save();

    res.json({ success: true, message: 'Cart updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const { bookId } = req.params;

    // Retrieve the user's cart from the database
    const cart = await Cart.findOne({ userId: req.userId });

    // If the user doesn't have a cart or the item is not in the cart, return an error
    if (!cart || !cart.items.find(item => item.bookId.toString() === bookId)) {
      return res.status(404).json({ success: false, message: 'Item not found in the cart.' });
    }

    // Remove the specified item from the cart
    cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);

    // Update the cart in the database
    await cart.save();

    res.json({ success: true, message: 'Book removed from cart.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
