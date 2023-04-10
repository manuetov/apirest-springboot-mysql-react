package com.blog.DTO;

import com.blog.entity.Comments;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.Set;

public class PostBlogDTO {

    private Long id;

    @NotEmpty
    @Size(min = 3, message = "El titulo debe contener más de 3 caracteres")
    private String titulo;
    @NotEmpty
    @Size(min = 3, message = "La descripción debe contener más de 10 caracteres")
    private String descripcion;
    @NotEmpty
    private String contenido;
    // comentarios
    private Set<Comments> comments;

    public PostBlogDTO() {
    }

    public Long getId() { return id; }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() { return descripcion; }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public Set<Comments> getComments() {
        return comments;
    }

    public void setComments(Set<Comments> comments) {
        this.comments = comments;
    }
}
