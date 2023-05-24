package com.blog.auth.filters;

import com.blog.entity.User;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

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
            user = new ObjectMapper().readValue(request.getInputStream(),User.class);

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
        * devuelve el objeto de usuario que representa al usuario asociado con la autenticación */

        String username = ((org.springframework.security.core.userdetails.User)authResult.getPrincipal()).getUsername();

        // creo un token artesanal. Base64 es inseguro
        String originalInput= "supersecreta." + username;
        String token = Base64.getEncoder().encodeToString(originalInput.getBytes());

        //agrego encabezado de autorización a la respuesta HTTP
        response.addHeader("Authorization", "Bearer" + token);
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
