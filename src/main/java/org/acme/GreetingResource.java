package org.acme;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.PathParam;
import org.acme.exceptions.AppException;

@Path("/hello")
public class GreetingResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello RESTEasy";
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/personalized")
    @Transactional
    public String personalizedHelloPost(Person person) {
        if (person.getFirstName() == null || person.getFirstName().trim().isEmpty()) {
            throw new AppException("First name cannot be blank.");
        }

        UserName userName = new UserName(person.getFirstName() + " " + person.getLastName());
        userName.persist();

        return "Hello " + person.getFirstName() + " " + person.getLastName() + "! Your name has been stored.";
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/personalized/{name}")
    public String helloPersonalized(@PathParam("name") String name) {
        return "Hello " + name;
    }
}
