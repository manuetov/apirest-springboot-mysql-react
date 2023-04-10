package com.blog.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class CommentsDTO {

    private Long id;
    @NotEmpty(message = "El nombre no puede estar vacío o nulo")
    @Size(min = 3, message = "El titulo debe contener más de 3 caracteres")
    private String nombre;
    @NotEmpty(message = "El nombre no puede estar vacío o nulo")
    @Email
    private String email;
    @NotEmpty
    @Size(min = 10, message = "El comentario debe tener al menos 10 caracteres")
    private String comentario;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }

    public void setNombre(String nombre) { this.nombre = nombre;  }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getComentario() { return comentario; }

    public void setComentario(String comentario) { this.comentario = comentario; }

}
