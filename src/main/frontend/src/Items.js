// Items.js
import React, { useEffect, useState } from 'react';
import './Items.css';

/**
 * Component representing the main items page, which displays all available items in the store.
 * Fetches and renders item data, allowing users to browse the catalog.
 */
function Items() {
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [newItem, setNewItem] = useState({
        itemName: '',
        description: '',
        price: ''
    }); // State for new item without imgSrc

    useEffect(() => {
        fetch('/api/items') // Updated endpoint
            .then(response => response.json())
            .then(data => setItems(data));
    }, []);

    const handleQuantityChange = (itemId, quantity) => {
        setSelectedItems(prev => ({
            ...prev,
            [itemId]: quantity
        }));
    };

    const addToCart = (item) => {
        const quantity = selectedItems[item.id] || 1;
        const cartItem = {
            itemName: item.itemName,
            quantity,
            price: item.price,
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
                setConfirmationMessage(`"${item.itemName}" has been added to your cart!`);
                setSelectedItems(prev => ({ ...prev, [item.id]: 1 }));
            })
            .catch(error => alert(error.message));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddItem = (e) => {
        e.preventDefault();

        fetch('/api/items', { // Updated endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add item');
                }
                return response.json();
            })
            .then(data => {
                setItems(prev => [...prev, data]); // Update the item list with the new item
                setConfirmationMessage(`"${newItem.itemName}" has been added successfully!`);
                setNewItem({ itemName: '', description: '', price: '' }); // Reset the form without imgSrc
            })
            .catch(error => alert(error.message));
    };

    return (
        <div>
            <h1>Items</h1>
            {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}

            <h2>Add New Item</h2>
            <form onSubmit={handleAddItem}>
                <input
                    type="text"
                    name="itemName"
                    placeholder="Item Name"
                    value={newItem.itemName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Item</button>
            </form>

            <div className="item-list">
                {items.map(item => (
                    <div key={item.id} className="item-item">
                        <h2>{item.itemName}</h2>
                        <p>{item.description}</p>
                        <p>Price: ${item.price}</p>
                        <label>
                            Quantity:
                            <input
                                type="number"
                                min="1"
                                defaultValue="1"
                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            />
                        </label>
                        <button onClick={() => addToCart(item)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Items;
