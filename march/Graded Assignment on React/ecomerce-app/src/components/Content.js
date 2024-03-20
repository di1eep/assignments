import React from 'react';
import Product from './Product';

const products = [
  // Shirts
  {
    id: 1,
    category: 'Shirt',
    subCategory: 'Men',
    name: 'Blue Casual Shirt',
    image: 'https://via.placeholder.com/150x150.png?text=Shirt',
    price: Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500, // Range: ₹1500 - ₹2000
  },
  {
    id: 2,
    category: 'Shirt',
    subCategory: 'Men',
    name: 'White Dress Shirt',
    image: 'https://via.placeholder.com/150x150.png?text=Dress+Shirt',
    price: Math.floor(Math.random() * (2500 - 2000 + 1)) + 2000, // Range: ₹2000 - ₹2500
  },
  {
    id: 3,
    category: 'Shirt',
    subCategory: 'Men',
    name: 'Checked Flannel Shirt',
    image: 'https://via.placeholder.com/150x150.png?text=Flannel+Shirt',
    price: Math.floor(Math.random() * (3000 - 2500 + 1)) + 2500, // Range: ₹2500 - ₹3000
  },

  // Pants
  {
    id: 4,
    category: 'Pants',
    subCategory: 'Men',
    name: 'Blue Denim Jeans',
    image: 'https://via.placeholder.com/150x150.png?text=Jeans',
    price: Math.floor(Math.random() * (4000 - 3500 + 1)) + 3500, // Range: ₹3500 - ₹4000
  },
  {
    id: 5,
    category: 'Pants',
    subCategory: 'Men',
    name: 'Khaki Chinos',
    image: 'https://via.placeholder.com/150x150.png?text=Chinos',
    price: Math.floor(Math.random() * (2500 - 2000 + 1)) + 2000, // Range: ₹2000 - ₹2500
  },
  {
    id: 6,
    category: 'Pants',
    subCategory: 'Men',
    name: 'Black Dress Pants',
    image: 'https://via.placeholder.com/150x150.png?text=Dress+Pants',
    price: Math.floor(Math.random() * (3500 - 3000 + 1)) + 3000, // Range: ₹3000 - ₹3500
  },

  // Trousers
  {
    id: 7,
    category: 'Trousers',
    subCategory: 'Men',
    name: 'Gray Formal Trousers',
    image: 'https://via.placeholder.com/150x150.png?text=Trousers',
    price: Math.floor(Math.random() * (5000 - 4500 + 1)) + 4500, // Range: ₹4500 - ₹5000
  },
  {
    id: 8,
    category: 'Trousers',
    subCategory: 'Men',
    name: 'Navy Blue Formal Trousers',
    image: 'https://via.placeholder.com/150x150.png?text=Trousers+Navy',
    price: Math.floor(Math.random() * (5500 - 5000 + 1)) + 5000, // Range: ₹5000 - ₹5500
  },

  // T-shirts
  {
    id: 9,
    category: 'T-Shirt',
    subCategory: 'Men',
    name: 'White Crewneck T-Shirt',
    image: 'https://via.placeholder.com/150x150.png?text=T-Shirt',
    price: Math.floor(Math.random() * (1000 - 500 + 1)) + 500, // Range: ₹500 - ₹1000
  }
];



function Content() {
  return (
    <div className="content">
      <h2>Products</h2>
      <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: 0 }}>
        {products.map((product) => (
          <li key={product.id} style={{ margin: '10px' }}>
            <Product product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Content;
