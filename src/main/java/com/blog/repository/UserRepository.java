package com.blog.repository;

import com.blog.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    // dos formas de hacer la consulta:
    Optional<User> findByUsername(String username);

    // consulta personalizada
    @Query("select u from User u where u.username=?1")
    Optional<User> getUserByUsername(String username);
}

/* La interfaz UserRepository define la interfaz de acceso a datos para la entidad User. La interfaz extiende
* CrudRepository de Spring Data, lo que proporciona métodos básicos nativos de CRUD (crear, leer, actualizar y eliminar)
* para la entidad User sin necesidad de implementarlos manualmente.
* Además de los métodos heredados de CrudRepository, la interfaz UserRepository define dos métodos personalizados:
* Optional<User> findByUsername(String username): Este método busca un usuario por su nombre de usuario y devuelve un
*  Optional<User>. Un Optional es una clase que envuelve un valor opcional, lo que significa que el usuario puede
*  existir o no. Esto permite manejar el caso de que no se encuentre un usuario con el nombre de usuario proporcionado.
* @Query("select u from User where u.username=?1 and u.email=?2") Optional<User> getUserByUsernameEmail(String username,
*  String email): Este método utiliza una consulta personalizada para buscar un usuario por su nombre de usuario y
*  correo electrónico. La consulta especifica la entidad User en la cláusula FROM y utiliza parámetros ?1 y ?2 para
* representar los valores de username y email. El método devuelve un Optional<User> con el resultado de la consulta.
* Estos métodos personalizados permiten realizar consultas específicas en la base de datos para buscar usuarios según
* criterios específicos, en este caso, por nombre de usuario y correo electrónico.
*/

/* JDBC es una API de bajo nivel que te permite interactuar directamente con la base de datos utilizando consultas SQL
* personalizadas, mientras que JPA es una API de nivel más alto que se basa en JDBC y proporciona una abstracción
* orientada a objetos para el mapeo y la administración de objetos persistentes en la base de datos.
* JPA se encarga de generar y ejecutar las consultas correspondientes utilizando JDBC como el mecanismo subyacente para
* interactuar con la base de datos. Esto simplifica el desarrollo al evitar la necesidad de escribir consultas SQL
* manualmente y proporciona una forma más orientada a objetos de interactuar con la base de datos*/