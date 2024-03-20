import React from 'react';

function Card({ product }) {
  // Extract necessary product information from props
  const { id, name, image, price } = product;

  return (
    <div className="card">
      {/* Render product image, name, price, and other relevant details */}
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price}</p>
      {/* Add additional card content as needed */}
    </div>
  );
}

export default Card;
