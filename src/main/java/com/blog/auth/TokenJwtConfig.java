package com.blog.auth;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;

public class TokenJwtConfig {
    // public final static String SECRET_KEY ="supersecreta";
    public final static Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    public final static String PREFIX_TOKEN = "Bearer ";
    public final static String HEADER_AUTHORIZATION = "Authorization";

    // llave de JWT
    // Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
}


/*se utiliza para generar una clave secreta para el algoritmo HMAC-SHA256 (HS256). El método Keys.secretKeyFor() forma
* parte de la biblioteca Java JWT (JSON Web Token) y crea una nueva clave secreta adecuada para su uso con el algoritmo
*  de firma especificado.
*
* Keys es una clase de la biblioteca Java JWT que proporciona métodos para generar claves.
* Keys.secretKeyFor() es un método estático que genera una nueva clave secreta. Toma el algoritmo de firma
* (SignatureAlgorithm.HS256) como argumento para especificar el algoritmo para el cual se utilizará la clave.
* SignatureAlgorithm.HS256 representa el algoritmo HMAC-SHA256, que es un algoritmo de clave simétrica ampliamente
*  utilizado para generar y verificar firmas digitales.
* La variable key se asigna con la clave secreta generada.
* Después de ejecutar esta línea de código, tendrás una clave secreta (key) que se puede utilizar para firmar y
* verificar JWT utilizando el algoritmo HS256.*/