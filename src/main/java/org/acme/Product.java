package org.acme;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "products")
public class Product extends PanacheEntity {
    @NotNull
    @Column(name = "product_name", nullable = false, length = 100)
    public String productName;

    @NotNull
    @Column(name = "price", nullable = false)
    public double price;

    // Default constructor
    public Product() {}

    public Product(String productName, double price) {
        this.productName = productName;
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product{id=" + id + ", productName='" + productName + "', price=" + price + "}";
    }
}
