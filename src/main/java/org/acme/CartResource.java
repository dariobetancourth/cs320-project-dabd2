package org.acme;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.PathParam;
import java.util.List;

@Path("/cart")
public class CartResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<CartItem> getCartItems() {
        return CartItem.listAll();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public String addCartItem(CartItem item) {
        item.persist();
        return "Cart item added: " + item.productName;
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/total")
    public double calculateTotal() {
        return CartItem.streamAll()
                .mapToDouble(item -> ((CartItem) item).getPrice() * ((CartItem) item).getQuantity())
                .sum();
    }

    // Update Cart Item Quantity
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response updateCartItemQuantity(@PathParam("id") Long id, int newQuantity) {
        CartItem cartItem = CartItem.findById(id);
        if (cartItem == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        cartItem.quantity = newQuantity;
        cartItem.persist();
        return Response.ok(cartItem).build();
    }

    // Delete Cart Item
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteCartItem(@PathParam("id") Long id) {
        CartItem cartItem = CartItem.findById(id);
        if (cartItem == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        cartItem.delete();
        return Response.noContent().build();
    }
}
