package com.blog.service;

import com.blog.entity.User;
import com.blog.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    // findAll() es de tipo iterable casteo a tipo list
    public List<User> findAll() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    @Transactional
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public Optional<User> update(User user, Long id) {
        Optional<User> userOptional = userRepository.findById(id); //this.findById(id)

        if(userOptional.isPresent()) {
            User userDB = userOptional.orElseThrow();
            userDB.setUsername(user.getUsername());
            userDB.setEmail(user.getEmail());
            return Optional.of(userRepository.save(userDB)); // this.save(userDB)
        }
        return Optional.empty();
    }

    @Override
    @Transactional
    public void remove(Long id) {
        userRepository.deleteById(id);
    }
}


/* @Transactional se utiliza para indicar que un método debe ser ejecutado dentro de una transacción de base de datos.
 Una transacción de base de datos es un conjunto de operaciones que se realizan en una base de datos como una unidad
 atómica, lo que significa que todas las operaciones deben ser exitosas para que la transacción sea exitosa, y si alguna
 de las operaciones falla, todas las operaciones se deshacen y se revierte la transacción.*/

