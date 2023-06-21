package com.blog.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 3, max = 25)
    @Column(unique = true)
    private String username;

    @NotBlank
    private String password;

    @NotEmpty
    @Email
    @Column(unique = true)
    private String email;

    // Un usuario puede tener muchos roles. Un role puede estar en muchos usuarios
    // en el momento que se guarde un user(parent) se guardará tambien su role(child)
    // unidireccional a través del usuario obtengo su role. No es necesario obtener los usuarios de los roles
    @ManyToMany
    @JoinTable(
            name = "users_roles",  // nombre de la tabla intermedia
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),  // Fk. Nombre de la llave siempre en singular
            inverseJoinColumns = @JoinColumn(name="role_id", referencedColumnName = "id"),  // Fk. Nombre de la llave siempre en singular
            uniqueConstraints = { @UniqueConstraint(columnNames = {"user_id", "role_id"})} // evita duplicidades
    )
    private List<Role> roles;

}

/* Relación de muchos a muchos entre las entidades de usuario (User) y roles (Role) en un modelo de base de datos.
* @ManyToMany: Es una anotación de JPA que indica una relación de muchos a muchos entre entidades.
* @JoinTable: Es una anotación utilizada para especificar los detalles de la tabla intermedia que se utilizará para
* almacenar la relación entre las entidades de usuario y roles.
* name = "users_roles": Especifica el nombre de la tabla intermedia que se creará en la base de datos para almacenar
* la relación entre usuarios y roles.
* joinColumns = @JoinColumn(name = "user_id"): Especifica la columna que actúa como clave externa (FK) en la tabla
* intermedia para hacer referencia al usuario.
* inverseJoinColumns = @JoinColumn(name="role_id"): Especifica la columna que actúa como clave externa (FK) en la tabla
*  intermedia para hacer referencia al rol.
* uniqueConstraints = { @UniqueConstraint(columnNames = {"user_id", "role_id"})}: Define una restricción única en la
* tabla intermedia para asegurarse de que no haya duplicados de la combinación de "user_id" y "role_id".
*
* En resumen, esta configuración establece una relación de muchos a muchos entre usuarios y roles. La tabla intermedia
* "users_roles" se crea para almacenar los pares de ID de usuario y ID de rol correspondientes a esta relación. La
*  restricción única garantiza que no se puedan duplicar las combinaciones de "user_id" y "role_id" en la tabla
* intermedia, evitando así que un usuario tenga el mismo rol asignado múltiples veces.
*
* script para crear la tabla. No es necesario ya que en application.properties jpa = update y el framework crea la tabla
* automáticamente cada vez que se reinicia y hay una nueva tabla.
* # hibernate ddl auto (create, create-drop, validate, update)
  # spring.jpa.hibernate.ddl-auto=update
  *
  * script para crear la tabla. *
CREATE TABLE roles (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    PRIMARY KEY ( id )
) ENGINE = InnoDB CHARACTER SET utf8;

CREATE TABLE users_roles (
    user_id BIGINT NOT NULL ,
    role_id BIGINT NOT NULL
) ENGINE = InnoDB CHARACTER SET utf8;

ALTER TABLE roles
ADD CONSTRAINT UK_roles_name
UNIQUE (name);

ALTER TABLE users_roles
ADD CONSTRAINT UK_user_id_roles_id
UNIQUE (user_id, role_id);

ALTER TABLE users_roles
ADD CONSTRAINT FK_users_roles_roles_id
FOREIGN KEY (role_id) REFERENCES roles(id);

ALTER TABLE users_roles
ADD CONSTRAINT FK_users_roles_user_id
FOREIGN KEY (user_id) REFERENCES users(id);
*
* */

