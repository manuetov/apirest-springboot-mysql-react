package com.blog.service;

import com.blog.DTO.CommentsDTO;
import com.blog.entity.Comments;
import com.blog.entity.PostBlog;
import com.blog.exception.BlogPostExceptions;
import com.blog.exception.ResourceNotFoundException;
import com.blog.repository.CommentsRepository;
import com.blog.repository.PostBlogRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentsServiceImpl implements CommentsService {

    // inyecto Bean creado en SpringBootApplication. Sirve para mapear DTOs(Json)
    @Autowired
    private ModelMapper modelMapper;

    /* inyecto los repositorios que se van a asociar */
    @Autowired
    private CommentsRepository commentsRepository;
    @Autowired
    private PostBlogRepository postBlogRepository;

    /* -------------- CREO UN COMENTARIO ----------- */
    @Override
    public CommentsDTO createComment(Long postBlogId, CommentsDTO commentsDTO) {
        //1. mapear comentario (json)
        Comments comments = mapDTOToEntity(commentsDTO);
        //2. buscar id del comentario
        PostBlog singlePostBlog = postBlogRepository.findById(postBlogId)
                .orElseThrow(() -> new ResourceNotFoundException("PostBlog", "id", postBlogId));
        //3. asigno comentario a la publicación
        comments.setPostBlog(singlePostBlog);
        //4. guardo comentario en el repositorio
        Comments newComments = commentsRepository.save(comments);

        return mapEntityToDTO(newComments);
    }

    /* ------- DEVUELVO TODOS LOS COMENTARIOS DE UNA PUBLICACIÓN -----*/
    @Override
    public List<CommentsDTO> getCommentsByPostBlogId(Long postBlogId) {
        // recupera comentario por su id
        List<Comments> commentsList = commentsRepository.findByPostBlogId(postBlogId);
        // convierto list de comentarios a list de DTOs(json)
        return commentsList.stream().map(c -> mapEntityToDTO(c)).collect(Collectors.toList());
    }

    /* ------- DEVUELVO UN COMENTARIO POR SU ID DE UNA PUBLICACIÓN -----*/
    @Override
    public CommentsDTO getComentById(Long postBlogId, Long commentsId) {
        // recupero un post y coments entities por su id or lanzo excepción
        PostBlog singlePostBlog = postBlogRepository.findById(postBlogId)
                .orElseThrow(() -> new ResourceNotFoundException("PostBlog", "id", postBlogId));
        Comments singleComments = commentsRepository.findById(commentsId)
                .orElseThrow(() -> new ResourceNotFoundException("Comments", "id", commentsId));

        if(!singleComments.getPostBlog().getId().equals(singlePostBlog.getId()))
            throw new BlogPostExceptions(HttpStatus.BAD_REQUEST, "Comentario no pertenece a ningún post");

        return mapEntityToDTO(singleComments);
    }

    @Override
    public CommentsDTO updateComentById(Long postBlogId, Long commentId, CommentsDTO commentsDTO) {
        // recupero un post y coments entities por su id or lanzo excepción
        PostBlog singlePostBlogId = postBlogRepository.findById(postBlogId)
                .orElseThrow(() -> new ResourceNotFoundException("PostBlog", "id", postBlogId));
        Comments singleCommentsId = commentsRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comments", "id", commentId));

        if(!singleCommentsId.getPostBlog().getId().equals(singlePostBlogId.getId()))
            throw new BlogPostExceptions(HttpStatus.BAD_REQUEST, "Comentario no pertenece a ningún post");

        // asigno los datos actualizados
        singleCommentsId.setNombre(commentsDTO.getNombre());
        singleCommentsId.setEmail(commentsDTO.getEmail());
        singleCommentsId.setComentario(commentsDTO.getComentario());

        // los guardo en BBDD
        Comments updateComment = commentsRepository.save(singleCommentsId);

        // covierto los datos de la BBDD a Json y los devuelvo
        return mapEntityToDTO(updateComment);


    }

    @Override
    public void deleteCommentById(Long postBlogId, Long commentId) {
        // recupero un post y coments entities por su id or lanzo excepción
        PostBlog singlePostBlogId = postBlogRepository.findById(postBlogId)
                .orElseThrow(() -> new ResourceNotFoundException("PostBlog", "id", postBlogId));
        Comments singleCommentsId = commentsRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comments", "id", commentId));

        if(!singleCommentsId.getPostBlog().getId().equals(singlePostBlogId.getId()))
            throw new BlogPostExceptions(HttpStatus.BAD_REQUEST, "Comentario no pertenece a ningún post");

        commentsRepository.delete(singleCommentsId);


    }


    // Convierto de DTO a entidad - usando modelMapper
    private Comments mapDTOToEntity(CommentsDTO commentsDTO){
        Comments comments = modelMapper.map(commentsDTO, Comments.class);

        /*        Comments comments = new Comments();

        comments.setNombre(commentsDTO.getNombre());
        comments.setEmail(commentsDTO.getEmail());
        comments.setComentario(commentsDTO.getComentario()); */

        return comments;
    }
    // Convierto entidad en DTO - usando modelMapper
    private CommentsDTO mapEntityToDTO(Comments comments){
        CommentsDTO commentsDTO = modelMapper.map(comments, CommentsDTO.class);
        /*        CommentsDTO commentsDTO = new CommentsDTO();

        commentsDTO.setId(comments.getId());
        commentsDTO.setNombre(comments.getNombre());
        commentsDTO.setEmail(comments.getEmail());
        commentsDTO.setComentario(comments.getComentario());*/

        return commentsDTO;
    }
}

