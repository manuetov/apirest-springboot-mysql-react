package com.blog.auth.filters;

import com.blog.auth.SimpleGrantedAuthorityJsonCreator;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;
import java.util.*;

import static com.blog.auth.TokenJwtConfig.*;

public class JwtValidationFilter extends BasicAuthenticationFilter {

    public JwtValidationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {

        // 1 obtener las cabeceras
        String header = request.getHeader(HEADER_AUTHORIZATION);
        // 2. si la cabecera es nula o no comienza con Bearer , => forbiden STATUS 403. En rutas públicas no se pasa token
        if(header == null || !header.startsWith(PREFIX_TOKEN)) {
            chain.doFilter(request, response);
            return;
        }
        // 3. obtengo el token y le quito el prefijo Bearer
        String token = header.replace(PREFIX_TOKEN, "");
        System.out.println(token);

        // La data viene en el claims, se Valida el token con JWT, se compara la palabra secreta con la que viene en el
        // token
        try {
            Claims claims = Jwts.parserBuilder()
                             .setSigningKey(SECRET_KEY)
                             .build()
                             .parseClaimsJws(token)
                             .getBody();

            // obtengo los roles del claim, con el mismo atributo con el que se guardó en JwtAuthenticationFilter
            Object rolesClaim = claims.get("authorities");
            // obtengo el username del claim
            String username = claims.getSubject();
            Object username2 = claims.get("username");
            System.out.println(username);
            System.out.println(username2);

            /* Lee un array JSON que representa roles o autoridades, utiliza el método addMixIn() para asociar una clase
             * mix-in (SimpleGrantedAuthorityJsonCreator) a la clase SimpleGrantedAuthority, y luego realiza la
             * deserialización de un array JSON en una lista de objetos SimpleGrantedAuthority. Los objetos
             * deserializados se almacenan en la variable authorities, que es una colección de objetos que extienden
             * o implementan GrantedAuthority.*/
            Collection<? extends GrantedAuthority> authorities = Arrays
                    .asList(new ObjectMapper()
                            .addMixIn(SimpleGrantedAuthority.class, SimpleGrantedAuthorityJsonCreator.class)
                            .readValue(rolesClaim.toString().getBytes(), SimpleGrantedAuthority[].class));

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username,
                    null, authorities);

            // nos autenticamos para acceder a la ruta protegida
            SecurityContextHolder.getContext().setAuthentication(authentication);
            chain.doFilter(request, response);
        } catch (JwtException e) {
            Map<String, String> body = new HashMap<>();
            body.put("error", e.getMessage());
            body.put("message", "El token JWT no es válido!");

            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
            response.setStatus(403);
            response.setContentType("application/json");
        }
    /* En resumen, este código verifica la validez de un token JWT en función de una palabra secreta y un nombre de
    * usuario. Si el token es válido, se autentica al usuario y se permite el acceso a la ruta protegida. Si el token
    * no es válido, se envía una respuesta de error con el mensaje correspondiente.*/

    }
}
