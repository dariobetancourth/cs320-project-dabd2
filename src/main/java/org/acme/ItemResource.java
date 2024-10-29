package org.acme;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.transaction.Transactional;
import java.util.List;

/**
 * REST API resource for managing items in the e-commerce application. Provides endpoints for creating, updating, deleting, and retrieving items.
 */
@Path("/api/items")  // Updated path
public class ItemResource {

    @Inject
    ItemRepository itemRepository;

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addItem(Item item) {
        itemRepository.addItem(item);
        return Response.status(Response.Status.CREATED)
                .entity(item)
                .build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Item> getItems() {
        return itemRepository.listAll();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getItem(@PathParam("id") Long id) {
        Item item = itemRepository.findItemById(id);
        if (item == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(item).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateItem(@PathParam("id") Long id, Item item) {
        Item existingItem = itemRepository.findItemById(id);
        if (existingItem == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        itemRepository.updateItem(id, item);
        return Response.ok(item).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteItem(@PathParam("id") Long id) {
        Item existingItem = itemRepository.findItemById(id);
        if (existingItem == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        itemRepository.deleteItem(id);
        return Response.noContent().build();
    }
}
