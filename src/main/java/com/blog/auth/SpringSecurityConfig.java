package com.blog.auth;

import com.blog.auth.filters.JwtAuthenticationFilter;
import com.blog.auth.filters.JwtValidationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

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
                .requestMatchers(HttpMethod.GET, "/api/user").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/user/{userId}").hasAnyRole("USER", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/user").hasRole("ADMIN")
                .requestMatchers("/api/user/**").hasRole("ADMIN") // equivalente a put y delete
                /*.requestMatchers(HttpMethod.PUT, "/api/user/{userId}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/user/{userId}").hasRole("ADMIN")*/
                .anyRequest().authenticated()
                        .and()
                .addFilter(new JwtAuthenticationFilter(authenticationConfiguration.getAuthenticationManager())) // JWT
                .addFilter(new JwtValidationFilter(authenticationConfiguration.getAuthenticationManager())) // JWT
                .csrf(config -> config.disable()) //evitar exploit en los forms de spring. El form viene desde React
                .sessionManagement(managment ->
                        managment.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // la session vendrá por React
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(Arrays.asList("http://127.0.0.1:5173"));
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        corsConfig.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));//token y json
        corsConfig.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource urlSource = new UrlBasedCorsConfigurationSource();
        urlSource.registerCorsConfiguration("/**", corsConfig);

        return urlSource;
    }

    @Bean
    FilterRegistrationBean<CorsFilter> corsFilter() {
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(corsConfigurationSource()));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }

}
