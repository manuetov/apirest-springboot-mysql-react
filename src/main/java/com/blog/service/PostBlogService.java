package com.blog.service;

import com.blog.DTO.PostBlogDTO;
import com.blog.entity.PostBlog;

import java.util.List;

public interface PostBlogService {


    PostBlogDTO createPostDTO(PostBlogDTO postBlogDTO);

    PostBlog createPost(PostBlog postBlog);

    List<PostBlog> listAllPost();

    PostBlogDTO getPostBlogById(long id);

    PostBlogDTO updatePostBlogById(PostBlogDTO postBlogDTO, long id);

    void deletePostBlogById(long id);

}
