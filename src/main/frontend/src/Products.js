import React, { useEffect, useState } from 'react';
import './Products.css';

function Products() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState({});
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [newProduct, setNewProduct] = useState({
        productName: '',
        description: '',
        price: '',
        imgSrc: '',
    }); // State for new product

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const handleQuantityChange = (productId, quantity) => {
        setSelectedProducts(prev => ({
            ...prev,
            [productId]: quantity
        }));
    };

    const addToCart = (product) => {
        const quantity = selectedProducts[product.id] || 1;
        const cartItem = {
            productName: product.productName,
            quantity,
            price: product.price,
        };

        fetch('/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItem),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add item to cart');
                }
                return response.text();
            })
            .then(message => {
                setConfirmationMessage(`"${product.productName}" has been added to your cart!`);
                setSelectedProducts(prev => ({ ...prev, [product.id]: 1 }));
            })
            .catch(error => alert(error.message));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddProduct = (e) => {
        e.preventDefault();

        fetch('/api/products', { // Replace with your backend endpoint to add products
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add product');
                }
                return response.json();
            })
            .then(data => {
                setProducts(prev => [...prev, data]); // Update the product list with the new product
                setConfirmationMessage(`"${newProduct.productName}" has been added successfully!`);
                setNewProduct({ productName: '', description: '', price: '', imgSrc: '' }); // Reset the form
            })
            .catch(error => alert(error.message));
    };

    return (
        <div>
            <h1>Products</h1>
            {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}

            <h2>Add New Product</h2>
            <form onSubmit={handleAddProduct}>
                <input
                    type="text"
                    name="productName"
                    placeholder="Product Name"
                    value={newProduct.productName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="imgSrc"
                    placeholder="Image URL"
                    value={newProduct.imgSrc}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Product</button>
            </form>

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
