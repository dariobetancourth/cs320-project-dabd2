package org.acme;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class ProductRepository {

    // Create
    @Transactional
    public void addProduct(Product product) {
        product.persist();
    }

    // Read (all products)
    public List<Product> listAll() {
        return Product.listAll();
    }

    // Read (one product by ID)
    public Product findProductById(Long id) {
        return Product.findById(id);
    }

    // Update
    @Transactional
    public void updateProduct(Long id, Product updatedProduct) {
        Product product = Product.findById(id);
        if (product != null) {
            product.setProductType(updatedProduct.getProductType());
            product.setQuantity(updatedProduct.getQuantity());
            product.setPrice(updatedProduct.getPrice());
        }
    }

    // Delete
    @Transactional
    public void deleteProduct(Long id) {
        Product product = Product.findById(id);
        if (product != null) {
            product.delete();
        }
    }
}
