package org.acme;

import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class ProductRepository {

    public List<Product> listAll() {
        // Your logic to return all products (e.g., fetching from a database)
        return List.of(new Product("Example Product", 10.99)); // Example return
    }
}
