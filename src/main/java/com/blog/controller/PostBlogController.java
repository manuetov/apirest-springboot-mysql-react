package com.blog.controller;


import com.blog.DTO.PostBlogDTO;
import com.blog.entity.PostBlog;
import com.blog.service.PostBlogService;
import com.blog.utils.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;


@RestController
@RequestMapping("/api/post")
public class PostBlogController {

    @Autowired
    public PostBlogService postBlogService;

    @Autowired
    public StorageService storageService;

    @GetMapping
    public ResponseEntity<List<PostBlog>> listPost() {

        return new ResponseEntity<>(postBlogService.listAllPost(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostBlogDTO> getSinglePost(@PathVariable(name = "id") long id){
        return ResponseEntity.ok(postBlogService.getPostBlogById(id));
    }

    @PostMapping
    public ResponseEntity<?> savePost(@ModelAttribute PostBlogDTO postBlogDTO) {

        PostBlog postBlog = PostBlogDTO.toEntity(postBlogDTO);

        String image = storageService.store(postBlogDTO.getImagen());

        postBlog.setImagen(image);

        return new ResponseEntity<>(postBlogService.createPost(postBlog), HttpStatus.CREATED);
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

        /*        if(postBlogDTO.getImagen().isEmpty()) {
            throw new IllegalStateException("imagen esta vacia");
        }
        if(!Arrays.asList(IMAGE_JPEG.getType(), IMAGE_PNG.getType(), IMAGE_GIF.getType()).contains(postBlogDTO.getImagen().getContentType())) {
            throw new IllegalStateException("formato imagen no permitido");
        }*/

/*System.out.println(postBlogDTO.getImagen());

        try {

                byte[] bytes = postBlogDTO.getImagen().getBytes();

                MultipartFile image = postBlogDTO.getImagen();
                String fileName = UUID.randomUUID().toString();

                String fileOriginalName = image.getOriginalFilename();


                Path path = Paths.get("src/main/resources/uploadImages/" + fileName);
                Files.write(path, bytes);

        } catch (IOException e) {
            e.printStackTrace();
        }*/
