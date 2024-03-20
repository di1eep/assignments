import React from 'react';

function Product({ product }) {
  const { id, name, image, price } = product;

  return (
    <div className="product-card" style={{ width: '250px', border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
      <img src={image} alt={name} style={{ width: '100%' }} />
      <h3>{name}</h3>
      <p>{price}</p>
    </div>
  );
}

export default Product;
