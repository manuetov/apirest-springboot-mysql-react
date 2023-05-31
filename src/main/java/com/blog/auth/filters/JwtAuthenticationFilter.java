package com.blog.auth.filters;

import com.blog.entity.User;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.*;

import static com.blog.auth.TokenJwtConfig.*;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    // autenticacion / login
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        /* Los datos vienen en Json en el body del request. En el controlador se usa @RequestBody para poblar
            los datos automáticamente, aqui se hace de forma manual utilizando el objeto ObjectMapper.
           .readValue lee los datos del body del request con getInputStream() y se pueblan dentro de User.class */
        User user = null;
        String username = null;
        String password = null;

        try{
            user = new ObjectMapper().readValue(request.getInputStream(), User.class);

            // asigno los datos mapeados
            username = user.getUsername();
            password = user.getPassword();

            // herramienta utilizada para registrar información y mensaes en tiempo de ejecución
            logger.info("Username desde request IntpuStream (raw)" + username);
            logger.info("Password desde request IntpuStream (raw)" + password);

        } catch (StreamReadException e){
            e.printStackTrace();
        }  catch (DatabindException e){
            e.printStackTrace();
        }  catch (IOException e){
            e.printStackTrace();
        }

        // autenticación con el token pasandole los datos del User
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
        return authenticationManager.authenticate(authToken);
    }

    // login ok status 401 autenticado
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        /* User de security, hace un casting explícito de User de entity, no se puede importar directamente porque ya
        * tengo un User de entity, se usa con el package. La clase User es una implementación común de la interfaz
        * UserDetails en el contexto de seguridad de Spring.
        * authResult es el objeto que representa el resultado exitoso de la autenticación. El método getPrincipal()
        * devuelve el objeto de usuario que representa al usuario asociado con la autenticación y su role */
        String username = ((org.springframework.security.core.userdetails.User) authResult.getPrincipal())
                .getUsername();

        // Collection<? extends GrantedAuthority> es el tipo de dato que se utiliza para declarar la variable roles.
        // Es una colección de objetos que implementan la interfaz GrantedAuthority
        Collection<? extends GrantedAuthority> roles = authResult.getAuthorities();

        // stream que devuelve true si el role es Admin
        boolean isAdmin = roles.stream().anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));
        System.out.println(isAdmin);

        // Claims => objeto que se usa para enviar data(roles) en el token. Object se convierte a Json
        Claims claims = Jwts.claims();
        claims.put("authorities", new ObjectMapper().writeValueAsString(roles));
        claims.put("isAdmin", isAdmin);
        claims.put("username", username);

        // creo el objeto token con el patrón builder
        String token = Jwts.builder() // crea un generador de tokens JWT.
                .setClaims(claims) // roles
                .setSubject(username)
                .signWith(SECRET_KEY)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hora
                .compact();

        //agrego encabezado de autorización a la respuesta HTTP
        response.addHeader(HEADER_AUTHORIZATION, PREFIX_TOKEN + token);
        // para almacenar los datos que se enviarán en el cuerpo
        Map<String, Object> body = new HashMap<>();
        body.put("token", token);
        body.put("message", String.format("Hola %S has iniciado sesión correctamente!!", username));
        body.put("username", username);
        // devulevo convertido el string a Json, status y el tipo.
        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        response.setStatus(200);
        response.setContentType("application/json");
    }

    // Falla autenticacion. No autorizado / login status 401
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
                                              HttpServletResponse response,
                                              AuthenticationException failed) throws IOException, ServletException {
        Map<String, Object> body = new HashMap<>();
        body.put("message", "Error en la autenticación username o password incorrecto!!");
        body.put("error", failed.getMessage());

        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        response.setStatus(401);
        response.setContentType("application/json");

    }

}

/*  los "claims" son declaraciones que se utilizan para transportar información sobre una entidad (usuario, dispositivo,
 * etc.) en el token. Representan los datos asociados al token y proporcionan información adicional sobre el sujeto del
 * token y los permisos o atributos asociados a él.
 * Los claims son pares de clave-valor que se incluyen en la carga útil (payload) del token JWT. Existen tres tipos de
 * claims:
 * Registered Claims: Son claims predefinidos por el estándar JWT. Estos claims tienen nombres reservados y se utilizan
 *  para información común y generalizada. Algunos ejemplos de registered claims son "iss" (emisor), "sub" (sujeto),
 * "exp" (fecha de expiración), "iat" (fecha de emisión), entre otros. Estos claims proporcionan información básica y
 * ampliamente utilizada en los tokens.
 * Public Claims: Son claims que se definen por los desarrolladores o las organizaciones para agregar información
 * específica a sus tokens. Aunque no tienen un significado predefinido en el estándar JWT, su contenido puede ser
 * interpretado y utilizado por las partes involucradas en el proceso de autenticación y autorización.
 * Private Claims: Son claims personalizados que se utilizan para aplicaciones específicas y no están destinados a ser
 * compartidos ampliamente. Estos claims se utilizan para incluir información privada o específica de una aplicación en
 * particular. Son reconocidos solo por las partes que acuerdan utilizarlos.
 * Los claims son codificados en formato JSON y se incluyen en la sección de carga útil del token JWT. El receptor del
 * token puede leer y utilizar estos claims para tomar decisiones de autorización, validar la identidad del sujeto,
 * obtener información adicional sobre el usuario, entre otras cosas.
 * Es importante tener en cuenta que los claims en un token JWT son firmados digitalmente y pueden ser verificados para
 * garantizar su integridad y autenticidad. Además, la información sensible no debe incluirse directamente en los
 * claims, ya que los tokens JWT son decodificables por cualquier persona con acceso a ellos.*/



/* La clase JwtAuthenticationFilter extiende la clase UsernamePasswordAuthenticationFilter, que es una clase proporcionada
 * por Spring Security para manejar la autenticación basada en nombre de usuario y contraseña.
 * El propósito principal de esta clase es realizar el proceso de autenticación o inicio de sesión. A continuación se
 * describen los métodos y su funcionalidad:
 * El método attemptAuthentication se ejecuta cuando se intenta autenticar al usuario. Obtiene los datos de autenticación
 * del cuerpo de la solicitud (que se espera que estén en formato JSON) utilizando la clase ObjectMapper de Jackson.
 * Luego, crea un objeto UsernamePasswordAuthenticationToken con el nombre de usuario y la contraseña obtenidos y lo
 * pasa al AuthenticationManager para que se realice la autenticación.
 * El método successfulAuthentication se ejecuta cuando la autenticación es exitosa. Recibe el objeto Authentication
 * authResult, que contiene la información del usuario autenticado. En este método, se genera un token JWT personalizado
 *  concatenando una clave secreta y el nombre de usuario. El token se codifica en Base64 y se agrega como encabezado de
 *  autorización en la respuesta HTTP. Además, se crea un mapa de datos que contiene el token, un mensaje de éxito y el
 * nombre de usuario, que se convierte a JSON y se envía en el cuerpo de la respuesta.
 * El método unsuccessfulAuthentication se ejecuta cuando la autenticación falla. Recibe la excepción
 * AuthenticationException failed, que contiene información sobre el error de autenticación. En este método, se crea un
 *  mapa de datos que contiene un mensaje de error y la descripción del error, que se convierte a JSON y se envía en la
 * respuesta HTTP con un código de estado 401 (No autorizado).
 * Estos métodos personalizados permiten controlar el flujo de autenticación y personalizar la respuesta según el
 * resultado de la autenticación.
 * Es importante tener en cuenta que este código muestra una implementación básica de autenticación JWT y se debe
 * adaptar y personalizar según los requisitos y la lógica de autenticación específica de tu aplicación.*/


