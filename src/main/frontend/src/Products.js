import React, { useEffect, useState } from 'react';
import './Products.css'; // Make sure to create a CSS file for styles

function Products() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState({}); // Store selected products and quantities

    // Fetch products from the backend
    useEffect(() => {
        fetch('/api/products') // Replace with your backend product endpoint
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    // Handle quantity selection
    const handleQuantityChange = (productId, quantity) => {
        setSelectedProducts(prev => ({
            ...prev,
            [productId]: quantity
        }));
    };

    // Handle adding products to the cart
    const addToCart = (product) => {
        const quantity = selectedProducts[product.id] || 1; // Default quantity to 1 if not selected
        const cartItem = {
            productName: product.productName,
            quantity,
            price: product.price,
        };

        fetch('/cart', { // Update with the correct endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItem),
        })
            .then(response => response.text())
            .then(message => alert(message));
    };

    return (
        <div>
            <h1>Products</h1>
            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={product.imgSrc} alt={product.productName} className="product-image" />
                        <h2>{product.productName}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <label>
                            Quantity:
                            <input
                                type="number"
                                min="1"
                                defaultValue="1"
                                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                            />
                        </label>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
