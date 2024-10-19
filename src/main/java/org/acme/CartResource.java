package org.acme;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.core.MediaType;
import jakarta.transaction.Transactional;
import java.util.List;

@Path("/cart")
public class CartResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<CartItem> getCartItems() {
        return CartItem.listAll(); // Retrieve all cart items
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public String addCartItem(CartItem item) {
        item.persist(); // Save the cart item to the database
        return "Cart item added: " + item.productName;
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/total")
    public double calculateTotal() {
        return CartItem.streamAll()
                .mapToDouble(item -> {
                    CartItem cartItem = (CartItem) item; // Cast to CartItem
                    return cartItem.getPrice() * cartItem.getQuantity();
                })
                .sum(); // Calculate total price
    }
}