package com.blog.service;

import com.blog.DTO.PostBlogDTO;

import java.util.List;

public interface PostBlogService {

    PostBlogDTO createPost(PostBlogDTO postBlogDTO);

    List<PostBlogDTO> listAllPost();

    PostBlogDTO getPostBlogById(long id);

    PostBlogDTO updatePostBlogById(PostBlogDTO postBlogDTO, long id);

    void deletePostBlogById(long id);

}
