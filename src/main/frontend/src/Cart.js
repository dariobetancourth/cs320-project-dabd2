import React, { useEffect, useState } from 'react';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [loading, setLoading] = useState(true); // State to track loading

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const cartResponse = await fetch('/cart');
                if (!cartResponse.ok) {
                    throw new Error('Failed to fetch cart items');
                }
                const cartData = await cartResponse.json();
                setCartItems(cartData);

                const totalResponse = await fetch('/cart/total');
                if (!totalResponse.ok) {
                    throw new Error('Failed to fetch total cost');
                }
                const totalData = await totalResponse.json();
                setTotalCost(totalData);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchCartData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Display loading state
    }

    return (
        <div>
            <h1>Your Cart</h1>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                        <h2>{item.productName}</h2>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.price}</p>
                    </div>
                ))}
            </div>
            <h2>Total Cost: ${totalCost}</h2>
        </div>
    );
}

export default Cart;