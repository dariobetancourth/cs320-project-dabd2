package org.acme.exceptions;

public class AppException extends RuntimeException {
    public AppException(String message) {
        super(message);
    }
}