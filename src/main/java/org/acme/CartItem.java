package org.acme;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
@Table(name = "cart_items")
public class CartItem extends PanacheEntity {
    @Column(name = "product_name", nullable = false)
    public String productName;

    @Column(name = "price", nullable = false)
    public double price;

    @Column(name = "quantity", nullable = false)
    public int quantity;

    // Default constructor
    public CartItem() {}

    // Constructor with fields
    public CartItem(String productName, double price, int quantity) {
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
    }

    // Getters for price and quantity
    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }
}
