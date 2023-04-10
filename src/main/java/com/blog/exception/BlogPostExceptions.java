package com.blog.exception;

import org.springframework.http.HttpStatus;

/* LANZO EXCEPCIÓN CUANDO NADIE ESCRIBA UN COMENTARIO O VALIDE CORRECTAMENTE LA PETICIÓN*/
public class BlogPostExceptions extends RuntimeException{

    private HttpStatus Status;
    private String message;

    public BlogPostExceptions(HttpStatus status, String message) {
        Status = status;
        this.message = message;
    }

    public BlogPostExceptions(String message, HttpStatus status, String message1) {
        super(message);
        Status = status;
        this.message = message1;
    }

    public HttpStatus getStatus() {
        return Status;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
