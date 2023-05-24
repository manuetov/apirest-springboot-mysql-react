package com.blog.auth;

import com.blog.auth.filters.JwtAuthenticationFilter;
import com.blog.auth.filters.JwtValidationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SpringSecurityConfig {

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;
    //    1. metodo con todas las reglas de autenticación/autorización

    @Bean
    // solo para testing. Luego se sustituye por Bcrypt
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    // recibe una instancia HttpSecurity que se utiliza para configurar las reglas de seguridad.
    SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity.authorizeHttpRequests()
                .requestMatchers(HttpMethod.GET, "/api/*").permitAll()
                .anyRequest().authenticated()
                        .and()
                .addFilter(new JwtAuthenticationFilter(authenticationConfiguration.getAuthenticationManager())) // JWT
                .addFilter(new JwtValidationFilter(authenticationConfiguration.getAuthenticationManager())) // JWT
                .csrf(config -> config.disable()) //evitar exploit en los forms de spring. El form viene desde React
                .sessionManagement(managment ->
                        managment.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // la session vendrá por React
                .build();
    }
}
