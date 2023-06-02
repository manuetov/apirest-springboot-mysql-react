package com.blog.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/* Sólo quiero enviar esta información al cliente, sin password ni roles.
* El service le pedirá los datos al entity y los poblará dentro de los dtos usando modelMapper para converirlos a Json */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
    private Long id;
    private String username;
    private String email;
}
