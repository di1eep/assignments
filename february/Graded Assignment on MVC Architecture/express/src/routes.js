const express = require('express');
const authController = require('./authController');
const productController = require('./productController');
const productDetailsController = require('./productController');

const router = express.Router();

// Authentication APIs
router.post('/auth/signup', authController.signUp);
router.post('/auth/login', authController.login);

// Product APIs
router.get('/products/products', productController.getAllProducts);
router.post('/products/new', productController.addNewProduct);
router.get('/products/:id', productController.getProductById);
router.get('/products/:category', productController.getProductByCategory);

// New API for fetching product details
router.get('/product-details', productDetailsController.getProductDetails);

module.exports = router;
