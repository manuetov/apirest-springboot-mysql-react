package com.blog.auth.filters;

import com.blog.auth.TokenJwtConfig;
import com.fasterxml.jackson.databind.ObjectMapper;
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
        if(header == null || !header.contains(PREFIX_TOKEN)) {
            chain.doFilter(request, response);
            return;
        }
        // 3. obtengo el token y le quito el prefijo Bearer
        String token = header.replace(PREFIX_TOKEN, "");
        System.out.println(token);
        // 4. decodifico el token
        byte[] tokenDecodeBytes = Base64.getDecoder().decode(token);
        // 5. lo convierto a string
        String tokenDecode = new String(tokenDecodeBytes);
        System.out.println(tokenDecode);

        /* Quito el punto y creo un array con la palabra secreta y el username que viene en el token.
        * \\. => hay que añadir doble \\ para escapar ya que el punto es un carácter reservado en una expresión regular,
        *  que representa cualquier carácter */
        String[] tokenArr = tokenDecode.split("\\.");
        System.out.println(tokenArr.length);
        String secret = tokenArr[0];
        String username = tokenArr[1];

        // comparo la palabra secreta con la que viene en el token
        if (SECRET_KEY.equals(secret)) {
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username,
                    null, authorities);

            // nos autenticamos para acceder a la ruta protegida
            SecurityContextHolder.getContext().setAuthentication(authentication);
            chain.doFilter(request, response);
        } else {
            Map<String, String> body = new HashMap<>();
            body.put("message", "El token JWT no es válido!");
            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
            response.setStatus(403);
            response.setContentType("appliation/json");
        }


    }
}
