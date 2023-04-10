package com.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blog.entity.Comments;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments, Long> {

    // QUERY QUE BUSCA TODOS LOS COMENTARIOS DE UN POST DETERMINADO POR SU ID
    List<Comments> findByPostBlogId(long blogPostId);

}
