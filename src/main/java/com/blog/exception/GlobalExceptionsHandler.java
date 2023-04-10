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

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice // capturará todas las excepciones de la App
public class GlobalExceptionsHandler extends ResponseEntityExceptionHandler {

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
}
