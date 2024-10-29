package org.acme;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

/**
 * Represents an item in the shopping cart, including its properties such as item details and quantity.
 * This class is part of the entity model for managing cart functionality in the e-commerce application.
 */
@Entity
@Table(name = "cart_items")
public class CartItem extends PanacheEntity {
    @Column(name = "item_name", nullable = false)
    public String itemName;

    @Column(name = "price", nullable = false)
    public double price;

    @Column(name = "quantity", nullable = false)
    public int quantity;

    public CartItem() {}

    public CartItem(String itemName, double price, int quantity) {
        this.itemName = itemName;
        this.price = price;
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
