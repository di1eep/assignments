const fs = require('fs');
const path = require('path');

// Loading Product from JSON file
const productFilePath = path.join(__dirname, 'model.json');
const Product = JSON.parse(fs.readFileSync(productFilePath, 'utf-8'));

const getAllProducts = async (req, res) => {
  try {
    res.status(200).json(Product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addNewProduct = async (req, res) => {
  try {
    const { name, total_qnty, category, price } = req.body;

    // Assuming you want to add the new product to the existing JSON data
    Product.push({ name, total_qnty, category, price });

    // Save the updated JSON data back to the file
    fs.writeFileSync(productFilePath, JSON.stringify(Product, null, 2));

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = Product.find(item => item.id === productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = Product.filter(item => item.category === category);

    if (products.length === 0) {
      return res.status(404).json({ error: 'Products not found in the specified category' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductDetails = (req, res) => {
  try {
    const filePath = path.join(__dirname, 'products.json');
    const productDetails = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    res.status(200).json(productDetails);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllProducts, addNewProduct, getProductById, getProductByCategory, getProductDetails };
