package com.blog.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
// @UniqueConstraint => no permite titulo repetido
@Table(name ="posts", uniqueConstraints = {@UniqueConstraint(columnNames = {"titulo"})})
public class PostBlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Column(name = "contenido", nullable = false)
    private String contenido;

    private String imagen;

    /* relación -> una publicación puede tener muchos comentarios */
    /* Cuando se elimine una publicación se eliminarán los comentarios asociados*/
    @JsonBackReference // evita la recursión infinita al serializar objetos
    @OneToMany(mappedBy = "postBlog", cascade = CascadeType.ALL, orphanRemoval = true)
    /* lista de comentarios - HashSet almacena elementos únicos sin duplicados*/
    private Set<Comments> comments = new HashSet<>();

    public PostBlog() {};

    public PostBlog(Long id, String titulo, String descripcion, String contenido, String imagen) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.contenido = contenido;
        this.imagen = imagen;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = this.id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

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

    @Override
    public String toString() {
        return "PostBlog{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", contenido='" + contenido + '\'' +
                ", imagen=" + imagen +
                ", comments=" + comments +
                '}';
    }
}
