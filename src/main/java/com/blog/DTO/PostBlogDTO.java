package com.blog.DTO;

import com.blog.entity.Comments;

import com.blog.entity.PostBlog;
import jakarta.persistence.Lob;

import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import org.springframework.beans.BeanUtils;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;


import java.util.Set;

@Data
public class PostBlogDTO {

    private Long id;
    @Nullable
    //@Size(min = 3, message = "El titulo debe contener más de 3 caracteres")
    private String titulo;

    private MultipartFile imagen;

    // comentarios
    private Set<Comments> comments;



    /* El método BeanUtils.copyProperties() es un método de utilidad del Framework Spring que
     copia los valores de las propiedades del objeto fuente(DTO) al objeto destino(entity).
     El tercer parámetro es una lista de propiedades que se deben ignorar durante el proceso
     de copia. En este caso, se ignora la propiedad "imagen", lo que sugiere que se maneja de
     forma separada o no es necesaria en la entidad PostBlog.*/
    public static PostBlog toEntity(PostBlogDTO postBlogDTO){
        PostBlog postBlog = new PostBlog();
        BeanUtils.copyProperties(postBlogDTO, postBlog, "imagen");
        return postBlog;
    }

}


/*
    public MultipartFile getImagen() {
        return imagen;
    }

    public void setImagen(MultipartFile imagen) {
        this.imagen = imagen;
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
*/

/*
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
*/

/*
    public Set<Comments> getComments() {
        return comments;
    }

    public void setComments(Set<Comments> comments) {
        this.comments = comments;
    }
*/