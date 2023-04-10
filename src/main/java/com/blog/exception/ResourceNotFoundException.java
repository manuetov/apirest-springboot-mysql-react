package com.blog.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/* LANZA EXCEPCIÓN SI LA PUBLICACIÓN NO SE ENCUENTRA/EXISTE POR SU ID*/
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{
    private final static long serialVersionUID = 1L;

    private String resourceName;
    private String resourceField;
    private long fieldValue;

    public ResourceNotFoundException(String resourceName, String resourceField, long fieldValue) {
        super(String.format("%s No encontrado con : %s : '%s'",resourceName, resourceField, fieldValue));
        this.resourceName = resourceName;
        this.resourceField = resourceField;
        this.fieldValue = fieldValue;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public String getResourceField() {
        return resourceField;
    }

    public void setResourceField(String resourceField) {
        this.resourceField = resourceField;
    }

    public long getFieldValue() {
        return fieldValue;
    }

    public void setFieldValue(long fieldValue) {
        this.fieldValue = fieldValue;
    }
}
