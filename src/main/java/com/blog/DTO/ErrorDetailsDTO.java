package com.blog.DTO;

import java.util.Date;

public class ErrorDetailsDTO {

    private Date date;
    private String message;
    private String details;

    public ErrorDetailsDTO(Date date, String message, String details) {
        this.date = date;
        this.message = message;
        this.details = details;
    }

    public Date getDate() {
        return date;
    }



    public String getMessage() {
        return message;
    }



    public String getDetails() {
        return details;
    }


}
