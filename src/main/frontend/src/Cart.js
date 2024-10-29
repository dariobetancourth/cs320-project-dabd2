import React, { useEffect, useState } from 'react';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const cartResponse = await fetch('/cart');
                const cartData = await cartResponse.json();
                setCartItems(cartData);

                const totalResponse = await fetch('/cart/total');
                const totalData = await totalResponse.json();
                setTotalCost(totalData);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartData();
    }, []);

    const updateQuantity = async (id, quantity) => {
        try {
            await fetch(`/cart/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity }),
            });

            setCartItems(prevItems =>
                prevItems.map(item => (item.id === id ? { ...item, quantity } : item))
            );
            setTotalCost(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const deleteCartItem = async (id) => {
        try {
            await fetch(`/cart/${id}`, {
                method: 'DELETE',
            });

            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
            setTotalCost(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Your Cart</h1>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                        <h2>{item.productName}</h2>
                        <p>Price: ${item.price}</p>
                        <label>
                            Quantity:
                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            />
                        </label>
                        <button onClick={() => deleteCartItem(item.id)}>Remove</button>
                    </div>
                ))}
            </div>
            <h2>Total Cost: ${totalCost.toFixed(2)}</h2>
        </div>
    );
}

export default Cart;
