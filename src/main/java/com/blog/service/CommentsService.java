package com.blog.service;

import com.blog.DTO.CommentsDTO;
import com.blog.entity.Comments;
import org.springframework.stereotype.Service;

import java.util.List;

public interface CommentsService {

    /* le paso el id del post y el comentario para crear el comentario */
    CommentsDTO createComment(Long postBlogId, CommentsDTO commentsDTO );

    /* listado de los comentarios de un Post*/
    List<CommentsDTO> getCommentsByPostBlogId(Long postBlogId);

    /* devuelvo el comentario cuyo id coincide con el id del post*/
    CommentsDTO getComentById(Long postBlogId, Long commentId );

    /* actualizo comentario y post por sus ids respectivamente */
    CommentsDTO updateComentById(Long postBlogId, Long commentId, CommentsDTO commentsDTO);

    /* borro un comentrio por su id si pertenece a un post */
    void deleteCommentById(Long postBlogId, Long commentId);



}
