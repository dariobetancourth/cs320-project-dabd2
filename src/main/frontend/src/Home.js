import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <header className="hero">
                <h1>Welcome to Our Store!</h1>
                <p>Your one-stop shop for the best products.</p>
            </header>
            <section className="featured-products">
                <h2>Featured Products</h2>
                <div className="product-grid">
                    {/* Sample product items */}
                    <div className="product-card">
                        <img src="product1.jpg" alt="Product 1" />
                        <h3>Product 1</h3>
                        <p>$19.99</p>
                        <button>Add to Cart</button>
                    </div>
                    <div className="product-card">
                        <img src="product2.jpg" alt="Product 2" />
                        <h3>Product 2</h3>
                        <p>$29.99</p>
                        <button>Add to Cart</button>
                    </div>
                    <div className="product-card">
                        <img src="product3.jpg" alt="Product 3" />
                        <h3>Product 3</h3>
                        <p>$39.99</p>
                        <button>Add to Cart</button>
                    </div>
                    <div className="product-card">
                        <img src="product4.jpg" alt="Product 4" />
                        <h3>Product 4</h3>
                        <p>$49.99</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            </section>
            <section className="testimonials">
                <h2>What Our Customers Say</h2>
                <blockquote>
                    "Amazing service and fantastic products!" - Jane Doe
                </blockquote>
                <blockquote>
                    "I love shopping here! Highly recommend!" - John Smith
                </blockquote>
            </section>
        </div>
    );
};

export default Home;
