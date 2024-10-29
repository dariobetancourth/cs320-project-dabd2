import React, { useEffect, useState } from 'react';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [newProduct, setNewProduct] = useState({ productName: '', price: '', imgSrc: '' });
    const [confirmationMessage, setConfirmationMessage] = useState('');

    useEffect(() => {
        fetch('/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const addProduct = async () => {
        try {
            const response = await fetch('/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct),
            });
            const addedProduct = await response.json();
            setProducts([...products, addedProduct]);
            setNewProduct({ productName: '', price: '', imgSrc: '' });
            setConfirmationMessage(`Product "${addedProduct.productName}" added successfully!`);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const updateProduct = async (productId) => {
        try {
            const response = await fetch(`/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedProduct),
            });
            const updatedProduct = await response.json();
            setProducts(products.map(prod => (prod.id === productId ? updatedProduct : prod)));
            setConfirmationMessage(`Product "${updatedProduct.productName}" updated successfully!`);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await fetch(`/products/${productId}`, { method: 'DELETE' });
            setProducts(products.filter(product => product.id !== productId));
            setConfirmationMessage(`Product deleted successfully!`);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleSelectProduct = (product) => setSelectedProduct(product);

    return (
        <div className="product-list">
            <h1>Our Products</h1>
            {confirmationMessage && <p>{confirmationMessage}</p>}

            <h2>Add New Product</h2>
            <input type="text" name="productName" placeholder="Product Name" value={newProduct.productName} onChange={handleInputChange} />
            <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} />
            <input type="text" name="imgSrc" placeholder="Image URL" value={newProduct.imgSrc} onChange={handleInputChange} />
            <button onClick={addProduct}>Add Product</button>

            <h2>Update Existing Product</h2>
            {selectedProduct.id && (
                <>
                    <input type="text" name="productName" placeholder="Product Name" value={selectedProduct.productName} onChange={(e) => setSelectedProduct({...selectedProduct, productName: e.target.value })} />
                    <input type="number" name="price" placeholder="Price" value={selectedProduct.price} onChange={(e) => setSelectedProduct({...selectedProduct, price: e.target.value })} />
                    <button onClick={() => updateProduct(selectedProduct.id)}>Update Product</button>
                </>
            )}

            <div className="product-grid">
                {products.map(product => (
                    <div className="product-card" key={product.id}>
                        <img src={product.imgSrc} alt={product.productName} />
                        <h2>{product.productName}</h2>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => handleSelectProduct(product)}>Edit</button>
                        <button onClick={() => deleteProduct(product.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
