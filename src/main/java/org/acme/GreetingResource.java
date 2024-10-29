package org.acme;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/hello")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class GreetingResource {

    @GET
    public List<UserName> listAllUsers() {
        return UserName.listAll(); // List all users
    }

    @POST
    @Path("/personalized")
    @Transactional
    public Response createUser(Person person) {
        if (person.getFirstName() == null || person.getFirstName().trim().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).entity("First name cannot be blank.").build();
        }

        UserName userName = new UserName(person.getFirstName() + " " + person.getLastName());
        userName.persist();
        return Response.status(Response.Status.CREATED).entity(userName).build();
    }

    @GET
    @Path("/{id}")
    public Response getUserById(@PathParam("id") Long id) {
        UserName userName = UserName.findById(id);
        if (userName == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(userName).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateUser(@PathParam("id") Long id, Person person) {
        UserName userName = UserName.findById(id);
        if (userName == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        userName.setName(person.getFirstName() + " " + person.getLastName());
        userName.persist(); // Save the updated user
        return Response.ok(userName).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteUser(@PathParam("id") Long id) {
        UserName userName = UserName.findById(id);
        if (userName == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        userName.delete();
        return Response.noContent().build();
    }
}
