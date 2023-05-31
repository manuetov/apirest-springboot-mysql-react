package com.blog.controller;

import com.blog.entity.User;
import com.blog.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(originPatterns = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> allUsers(){
        return userService.findAll();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> oneUser(@PathVariable(name= "userId") Long id){
        Optional<User> userOptional = userService.findById(id);
        // si esta presente se devuelve el objeto en formato Json en el body de la response status 200
        if(userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build(); //status 404
    }

    // @Valid => valida los campos del objeto User
    /* BindingResult => Después de la validación, Spring populá el objeto BindingResult con los
    resultados de la validación, importante!! debe ir justo a continuación del objeto que se valdia*/
    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody User user, BindingResult result){

        if(result.hasErrors()) {
            return validation(result);
        }

        return new ResponseEntity<>(userService.save(user), HttpStatus.CREATED); //status 201
        //return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user))
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@Valid @PathVariable(value = "userId") Long id,
                                        @RequestBody User user,
                                        BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }

        Optional<User> userOptional = userService.update(user, id);
        if(userOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.CREATED).body(userOptional.orElseThrow());
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable(name= "userId") Long id){
        Optional<User> userOptional = userService.findById(id);

        if(userOptional.isPresent()){
            userService.remove(id);
            return ResponseEntity.noContent().build(); // 204
        }
        return ResponseEntity.notFound().build(); // 404
    }
    /* validación de los campos del formulario del frontend utilizando
    * un map para construir json por cada campo que tenga error*/
    public ResponseEntity<?> validation (BindingResult result){
        Map<String, String> errors = new HashMap<>();

        result.getFieldErrors().forEach(err -> {
                errors.put(err.getField(), "El campo " + err.getField()
                        + " " + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }

}

