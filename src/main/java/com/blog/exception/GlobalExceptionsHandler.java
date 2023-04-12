package com.blog.exception;

import com.blog.DTO.ErrorDetailsDTO;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.nio.file.AccessDeniedException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice // capturará todas las excepciones de la App
public class GlobalExceptionsHandler extends ResponseEntityExceptionHandler {

    // EXCEPCION PARA INFORMAR DE RECURSO NO ENCONTRADO - STATUS 404
    @ExceptionHandler(ResourceNotFoundException.class) // manejará las expcepciones que se hayan detallado
    public ResponseEntity<ErrorDetailsDTO> resourcesNotFoundException(
            ResourceNotFoundException exception,
            WebRequest webRequest) {

        ErrorDetailsDTO errorDetailsDTO = new ErrorDetailsDTO(
                new Date(),
                exception.getMessage(),
                webRequest.getDescription(false));

        return new ResponseEntity<>(errorDetailsDTO, HttpStatus.NOT_FOUND);
    }

    // EXCEPCIÓN PARA INFORMAR DE UNA PETICIÓN NO PUEDE SER PROCESADA - STATUS 400
    @ExceptionHandler(BlogPostExceptions.class)
    public ResponseEntity<ErrorDetailsDTO> handleBlogPostException(BlogPostExceptions blogPostExceptions,
                                                                   WebRequest webRequest) {
        ErrorDetailsDTO errorDetails = new ErrorDetailsDTO(new Date(),
                blogPostExceptions.getMessage(),
                webRequest.getDescription(false));

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    // EXCEPCIONES GLOBALES DE SERVIDOR - STATUS 500
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetailsDTO> handleGlobalException(Exception exception,
                                                                 WebRequest webRequest){
        ErrorDetailsDTO errorDetails = new ErrorDetailsDTO(new Date(), exception.getMessage(),
                webRequest.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @Override // para mostrar las validaciones
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatusCode status,
            WebRequest request) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((e) -> {
            String fieldName = ((FieldError) e).getField();
            String errorMessage = e.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        /*return super.handleMethodArgumentNotValid(ex, headers, status, request);*/
    }

    // EXCEPCION INFORMA DE ACCESO NO PERMITIDO A USUARIO SEGUN SU ROLE - STATUS 401
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorDetailsDTO> handleAccessDeniedException(AccessDeniedException exception,
                                                                       WebRequest webRequest){
        ErrorDetailsDTO errorDetails = new ErrorDetailsDTO(new Date(), exception.getMessage(),
                webRequest.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.UNAUTHORIZED);
    }
}
