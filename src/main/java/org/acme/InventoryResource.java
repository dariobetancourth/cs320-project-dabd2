package org.acme;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
/**
 * REST API resource for managing inventory items. Provides endpoints for creating, updating, deleting, and retrieving inventory items.
 * This resource interacts with the Inventory entity to manage the inventory in the e-commerce application.
 */

@Path("/inventory")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class InventoryResource {

    @Inject
    InventoryRepository inventoryRepository;

    @GET
    public List<Inventory> getAllItems() {
        return inventoryRepository.listAll();
    }

    @POST
    @Transactional
    public Response addItem(Inventory item) {
        inventoryRepository.persist(item);
        return Response.status(Response.Status.CREATED).entity(item).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateItem(@PathParam("id") Long id, Inventory updatedItem) {
        Inventory existingItem = inventoryRepository.findById(id);
        if (existingItem == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        existingItem.setName(updatedItem.getName());
        existingItem.setPrice(updatedItem.getPrice());
        existingItem.setDescription(updatedItem.getDescription());
        return Response.ok(existingItem).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteItem(@PathParam("id") Long id) {
        boolean deleted = inventoryRepository.deleteById(id);
        return deleted ? Response.noContent().build() : Response.status(Response.Status.NOT_FOUND).build();
    }
}
