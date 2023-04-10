package com.blog.entity;

import jakarta.persistence.*;

@Entity
@Table (name = "comments")
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String email;
    private String comentario;

    /* relación -> muchos comentarios pueden haber en una publicación  */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_blog_id", nullable = false)
    private PostBlog postBlog;

    /* ----------- CONSTRUCTORES -----------*/
    public Comments() {};

    public Comments(Long id, String nombre, String email, String comentario, PostBlog postBlog) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.comentario = comentario;
        this.postBlog = postBlog;
    }

    /* ---------- GETTERS & SETTERS ---------*/
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public PostBlog getPostBlog() {
        return postBlog;
    }

    public void setPostBlog(PostBlog postBlog) {
        this.postBlog = postBlog;
    }

    @Override
    public String toString() {
        return "Comments{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", email='" + email + '\'' +
                ", comentario='" + comentario + '\'' +
                ", postBlog=" + postBlog +
                '}';
    }
}
