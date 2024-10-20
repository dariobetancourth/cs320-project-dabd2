import React from 'react';
import './ProductList.css';

const ProductList = () => {
    const products = [
        { id: 1, name: 'Product 1', price: '$19.99', description: 'Description for Product 1', imgSrc: 'product1.jpg' },
        { id: 2, name: 'Product 2', price: '$29.99', description: 'Description for Product 2', imgSrc: 'product2.jpg' },
        { id: 3, name: 'Product 3', price: '$39.99', description: 'Description for Product 3', imgSrc: 'product3.jpg' },
        // Add more products as needed
    ];

    return (
        <div className="product-list">
            <h1>Our Products</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <img src={product.imgSrc} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
