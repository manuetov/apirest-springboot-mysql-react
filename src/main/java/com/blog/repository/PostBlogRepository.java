package com.blog.repository;

import com.blog.entity.PostBlog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

// JpaRepository<T, ID>
@Repository  // no es necesario spring boot es superInteligente y sabe que esto es un Dao..jeje
public interface PostBlogRepository extends JpaRepository<PostBlog, Long> {
}
