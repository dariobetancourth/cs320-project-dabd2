package org.acme;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.transaction.Transactional;
import java.util.List;
/**
 * REST API resource for managing products in the e-commerce application. Provides endpoints for creating, updating, deleting, and retrieving products.
 * This resource interacts with the Product entity to enable product management functionality.
 */

@Path("/products")
public class ProductResource {

    @Inject
    ProductRepository productRepository;

    // Create a product
    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addProduct(Product product) {
        productRepository.addProduct(product);
        return Response.status(Response.Status.CREATED)
                .entity(product) // Return the created product
                .build();
    }

    // Read all products
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Product> getProducts() {
        return productRepository.listAll();
    }

    // Read a single product by ID
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProduct(@PathParam("id") Long id) {
        Product product = productRepository.findProductById(id);
        if (product == null) {
            return Response.status(Response.Status.NOT_FOUND) // Return 404 if product not found
                    .build();
        }
        return Response.ok(product).build(); // Return the product if found
    }

    // Update a product
    @PUT
    @Path("/{id}")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateProduct(@PathParam("id") Long id, Product product) {
        Product existingProduct = productRepository.findProductById(id);
        if (existingProduct == null) {
            return Response.status(Response.Status.NOT_FOUND) // Return 404 if product not found
                    .build();
        }
        productRepository.updateProduct(id, product);
        return Response.ok(product).build(); // Return updated product
    }

    // Delete a product
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteProduct(@PathParam("id") Long id) {
        Product existingProduct = productRepository.findProductById(id);
        if (existingProduct == null) {
            return Response.status(Response.Status.NOT_FOUND) // Return 404 if product not found
                    .build();
        }
        productRepository.deleteProduct(id);
        return Response.noContent().build(); // Return 204 No Content after successful deletion
    }
}
