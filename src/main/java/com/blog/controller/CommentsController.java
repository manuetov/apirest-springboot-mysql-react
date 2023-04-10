package com.blog.controller;

import com.blog.DTO.CommentsDTO;
import com.blog.entity.Comments;
import com.blog.service.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentsController {

    @Autowired
    private CommentsService commentsService;

    /* CREO COMENTARIO */
    @PostMapping("/post/{postBlog_id}/comment")
    public ResponseEntity<CommentsDTO> saveComment(@PathVariable(value = "postBlog_id") Long id,
                                                   @Valid @RequestBody CommentsDTO commentsDTO) {
        return new ResponseEntity<>(commentsService.createComment(id, commentsDTO), HttpStatus.CREATED);
    }

    /* LISTA DE COMENTARIOS DE UN POST CONCRETO */
    @GetMapping("/post/{postBlog_id}/comment")
    public ResponseEntity<List<CommentsDTO>> getAllComments(@PathVariable(value = "postBlog_id") long id,
                                              @RequestBody CommentsDTO commentsDTO) {
        return new ResponseEntity<>(commentsService.getCommentsByPostBlogId(id), HttpStatus.OK);
    }

    /* DEVUELVO UN COMENTARIO QUE PERTENECE A UNA PUBLICACIÓN CONCRETA*/
    @GetMapping("/post/{postBlog_id}/comment/{comments_id}")
    public ResponseEntity<CommentsDTO> getSingleComment(@PathVariable(value = "postBlog_id") Long pId,
                                                        @PathVariable(value = "comments_id") Long cId) {
        return new ResponseEntity<>(commentsService.getComentById(pId, cId), HttpStatus.OK);
    }

    /* ACTUALIZO COMENTARIO */
    @PutMapping("/post/{postBlog_id}/comment/{comments_id}")
    public ResponseEntity<CommentsDTO> updateComment(@PathVariable(value = "postBlog_id") Long pId,
                                                     @PathVariable(value = "comments_id") Long cId,
                                                     @RequestBody CommentsDTO commentsDTO) {
        return new ResponseEntity<>(commentsService.updateComentById(pId, cId, commentsDTO), HttpStatus.CREATED);
    }

    /* BORRO COMENTARIO DE UN POST*/
    @DeleteMapping("/post/{postBlog_id}/comment/{comments_id}")
    public ResponseEntity<String> deleteCommentById(@PathVariable(value = "postBlog_id") Long pId,
                                                     @PathVariable(value = "comments_id") Long cId) {
        commentsService.deleteCommentById(pId, cId);
        return new ResponseEntity<>( "Comentario eliminado!!", HttpStatus.OK );
    }



}
