package com.blog.auth;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class SimpleGrantedAuthorityJsonCreator {

    @JsonCreator
    public SimpleGrantedAuthorityJsonCreator(@JsonProperty("authority") String role){

    }
}


/* utiliza las anotaciones de Jackson @JsonCreator y @JsonProperty para indicarle a Jackson cómo deserializar objetos
* JSON en instancias de SimpleGrantedAuthorityJsonCreator. @JsonCreator: Esta anotación se utiliza en un constructor
* para indicarle a Jackson que debe utilizar ese constructor para deserializar objetos desde JSON. En este caso, el
* constructor se utilizará para crear instancias de la clase SimpleGrantedAuthorityJsonCreator a partir de JSON.
* @JsonProperty("roles"): Esta anotación se utiliza en el parámetro del constructor para indicarle a Jackson que el
* valor del atributo JSON llamado "roles" se debe asignar a ese parámetro. En otras palabras, cuando Jackson deserialice
* un objeto JSON en una instancia de SimpleGrantedAuthorityJsonCreator, buscará un atributo llamado "roles" en el JSON
* y asignará su valor al parámetro role del constructor.
* public SimpleGrantedAuthorityJsonCreator(String role): Este es el constructor de la clase
* SimpleGrantedAuthorityJsonCreator. Toma un parámetro role de tipo String, que se asignará utilizando la anotación
* @JsonProperty("roles"). No hay una implementación concreta de este constructor en la clase abstracta, ya que es una
* clase base que se espera que sea extendida por otras clases que proporcionen la implementación concreta.*/