package com.blog.service;

import com.blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<com.blog.entity.User> userOtional = userRepository.getUserByUsername(username);

        // si el usuario no existe en la BBDD lanzo error
        if(!userOtional.isPresent()) {
            throw new UsernameNotFoundException(String.format("Username %s no existe!!", username));
        }
        // si el usuario existe en la BBDD
        com.blog.entity.User user = userOtional.orElseThrow();

        // SimpleGrantedAuthority es una implementación de la interfaz GrantedAuthority
        /* asignar roles a un usuario. En este caso, se está obteniendo una lista de roles del usuario y se está
        * creando una lista de objetos GrantedAuthority a partir de ellos. La entidad Role tiene un método getName()
        * que devuelve el nombre del rol. */
        List<GrantedAuthority> authorities = user.getRoles()
                .stream()
                .map(r -> new SimpleGrantedAuthority(r.getName()))
                .collect(Collectors.toList());
        System.out.println(authorities);
        // interface userDetails => username, password, roles etc.
        // encriptado con Bcrypt
        return new User(
                user.getUsername(),
                user.getPassword(),
                true,
                true,
                true,
                true,
                authorities);
    }
}

/* La clase SimpleGrantedAuthority es una implementación de la interfaz GrantedAuthority de Spring Security. Representa
* una autoridad o rol concedido a un usuario dentro del contexto de seguridad de una aplicación. Proporciona información
* sobre los roles o permisos asociados a un usuario.
* Algunos aspectos clave sobre SimpleGrantedAuthority:
* Una instancia de SimpleGrantedAuthority se crea proporcionando el nombre del rol o permiso como argumento en su
* constructor. Por ejemplo: new SimpleGrantedAuthority("ROLE_ADMIN").
* La autoridad o rol puede ser cualquier cadena de texto que represente un rol o permiso válido en tu aplicación. Por
* convención, se utiliza el prefijo "ROLE_" seguido del nombre del rol para los roles definidos en Spring Security.
* En la implementación que compartiste, se utiliza el nombre de usuario como el rol del usuario al construir
* SimpleGrantedAuthority. Esto podría ser válido en tu caso particular, pero generalmente los roles y los nombres de
* usuario son conceptos diferentes en un sistema de autenticación y autorización. Es posible que desees asignar roles
* específicos a tus usuarios en lugar de utilizar sus nombres de usuario como roles.
* La lista de SimpleGrantedAuthority se utiliza comúnmente en la construcción del objeto UserDetails, que encapsula los
* detalles de autenticación y autorización de un usuario.
* En resumen, SimpleGrantedAuthority es una clase que representa un rol o permiso de usuario en Spring Security.
* Proporciona una forma sencilla de representar y trabajar con roles en el contexto de la seguridad de una aplicación.*/



/*@Service
public class JpaUserDetailsService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // usuario ficticio hardcodeado
        if(!username.equals("admin")) {
            throw new UsernameNotFoundException(String.format("Username %s no existe!!", username));
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        // interface userDetails => username, password, roles etc.
        // encriptado con Bcrypt
        return new User(username,
                "$2a$10$DOMDxjYyfZ/e7RcBfUpzqeaCs8pLgcizuiQWXPkU35nOhZlFcE9MS",
                true,
                true,
                true,
                true,
                authorities);
    }
}*/

/* interfaz UserDetailsService en la clase JpaUserDetailsService. Esta clase se utiliza para cargar los detalles de un
* usuario a partir de su nombre de usuario durante el proceso de autenticación.
* En el método loadUserByUsername, se verifica si el nombre de usuario es igual a "admin". Si no coincide, se lanza
* una excepción UsernameNotFoundException, indicando que el nombre de usuario no existe.
* Si el nombre de usuario coincide con "admin", se crea una lista de GrantedAuthority que contiene un solo rol llamado
* "ROLE_USER". Luego se crea un objeto User de Spring Security que implementa la interfaz UserDetails. El objeto User
*  representa los detalles del usuario, incluyendo el nombre de usuario, la contraseña encriptada con BCrypt, y otros
* atributos relacionados con la cuenta de usuario, como la habilitación de la cuenta, la expiración, las credenciales
*  expiradas, etc.
* En resumen, esta implementación de UserDetailsService carga los detalles de un usuario llamado "admin" con una
* contraseña encriptada y un rol de "ROLE_USER". Este es un ejemplo ficticio y debería adaptarse para cargar los
*  detalles de usuario de una base de datos o cualquier otro origen de datos real.*/
