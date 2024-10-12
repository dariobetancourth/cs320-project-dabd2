package org.acme;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.PathParam;
import org.acme.UserName;


@Path("/hello")
public class GreetingResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello RESTEasy";
    }

    // Change the endpoint to POST and add @Transactional
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/personalized")
    @Transactional
    public String personalizedHelloPost(Person person) {
        // Create a new UserName object
        UserName userName = new UserName(person.getFirstName() + " " + person.getLastName());
        // Persist the new UserName object
        userName.persist();

        // Update the greeting message
        return "Hello " + person.getFirstName() + " " + person.getLastName() + "! Your name has been stored.";
    }

    // New personalized hello endpoint for GET
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/personalized/{name}")
    public String helloPersonalized(@PathParam("name") String name) {
        return "Hello " + name;
    }
}
