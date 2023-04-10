package com.blog.repository;

import com.blog.entity.PostBlog;
import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository<T, ID>
public interface PostBlogRepository extends JpaRepository<PostBlog, Long> {
}
