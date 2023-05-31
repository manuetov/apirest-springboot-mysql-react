package com.blog;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Main {

	// inyecto dependencia a springBoot, sirve para mapear DTO.
	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}

	// Cors
/*	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("*")
						.allowedMethods("*")
						.allowedHeaders("*")
						.allowCredentials(true).maxAge(3600);
			}
		};
	}*/

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}
}
