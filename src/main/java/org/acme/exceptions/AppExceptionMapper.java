package org.acme;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.acme.exceptions.AppException;

@Provider
public class AppExceptionMapper implements ExceptionMapper<AppException> {
    @Override
    public Response toResponse(AppException exception) {
        return Response.status(Response.Status.BAD_REQUEST)
                .entity(exception.getMessage())
                .build();
    }
}
