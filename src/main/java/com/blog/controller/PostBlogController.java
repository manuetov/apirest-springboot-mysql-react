package com.blog.controller;


import com.blog.DTO.PostBlogDTO;
import com.blog.service.PostBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import static org.springframework.http.MediaType.*;

@RestController
@RequestMapping("/api/post")
public class PostBlogController {

    @Autowired
    public PostBlogService postBlogService;

    @GetMapping
    public ResponseEntity<List<PostBlogDTO>> listPost() {

        return new ResponseEntity<>(postBlogService.listAllPost(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostBlogDTO> getSinglePost(@PathVariable(name = "id") long id){
        return ResponseEntity.ok(postBlogService.getPostBlogById(id));
    }

    @PostMapping
    public ResponseEntity<PostBlogDTO> savePost(@ModelAttribute PostBlogDTO postBlogDTO) {
        System.out.println(postBlogDTO.getImagen());

        try {
            MultipartFile fileName = postBlogDTO.getImagen();
            byte[] bytes = postBlogDTO.getImagen().getBytes();
            Path path = Paths.get("src/main/resources/uploadImages/" + fileName);
            Files.write(path, bytes);
        } catch (IOException e) {
            e.printStackTrace();
        }

        /*        if(postBlogDTO.getImagen().isEmpty()) {
            throw new IllegalStateException("imagen esta vacia");
        }
        if(!Arrays.asList(IMAGE_JPEG.getType(), IMAGE_PNG.getType(), IMAGE_GIF.getType()).contains(postBlogDTO.getImagen().getContentType())) {
            throw new IllegalStateException("formato imagen no permitido");
        }*/
        return new ResponseEntity<>(postBlogService.createPost(postBlogDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostBlogDTO> updateSinglePost(@Valid @RequestBody PostBlogDTO postBlogDTO,
                                                        @PathVariable(name = "id") long id) {
        return new ResponseEntity<>(postBlogService.updatePostBlogById(postBlogDTO, id), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteSinglePost(@PathVariable(name = "id") long id) {
        postBlogService.deletePostBlogById(id);
        return new ResponseEntity("Post elmiminado con exito",HttpStatus.OK);
    }

}
