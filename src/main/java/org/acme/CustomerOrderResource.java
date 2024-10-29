package org.acme;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.transaction.Transactional;
import java.util.List;
/**
 * REST API resource for managing customer orders. Provides endpoints for creating, viewing, and updating orders.
 * This resource interacts with the CustomerOrder entity and enables order management functionality.
 */

@Path("/customer-orders")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CustomerOrderResource {

    @GET
    public List<CustomerOrder> getAllOrders() {
        return CustomerOrder.listAll();
    }

    @POST
    @Transactional
    public Response createCustomerOrder(CustomerOrder order) {
        order.persist();
        return Response.status(Response.Status.CREATED).entity(order).build();
    }

    @GET
    @Path("/{id}")
    public Response getCustomerOrder(@PathParam("id") Long id) {
        CustomerOrder order = CustomerOrder.findById(id);
        if (order == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(order).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateCustomerOrder(@PathParam("id") Long id, CustomerOrder updatedOrder) {
        CustomerOrder order = CustomerOrder.findById(id);
        if (order == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        order.setCustomerName(updatedOrder.getCustomerName());
        order.setToStreet(updatedOrder.getToStreet());
        order.setToCity(updatedOrder.getToCity());
        order.setToState(updatedOrder.getToState());
        order.setToZip(updatedOrder.getToZip());
        order.setShipDate(updatedOrder.getShipDate());
        order.setProductId(updatedOrder.getProductId());
        order.persist();
        return Response.ok(order).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteCustomerOrder(@PathParam("id") Long id) {
        CustomerOrder order = CustomerOrder.findById(id);
        if (order == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        order.delete();
        return Response.noContent().build();
    }
}
