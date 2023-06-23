import axios from "axios";

// para hacer login. recibe username y password desde useAuth
export const loginUser = async ({ username, password }) => {

  // recibo la data desde el body del request successfulAuthentication en JwtAuthenticationFilter
  try {
    return await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/login`, { 
      username, 
      password 
    })
  } catch (error) {
    throw error;
  }
}

/* La función loginUser es una función asíncrona que recibe el nombre de usuario (username) 
   y la contraseña (password) como parámetros. Dentro de la función, se realiza una solicitud 
   POST a la URL http://localhost:8080/login, que es la ruta de la API para el inicio de sesión.

1. En el cuerpo de la solicitud, se envían los datos de inicio de sesión proporcionados 
   (username y password) en un objeto JSON.

2. Si la solicitud se realiza con éxito y se recibe una respuesta exitosa del servidor, se devuelve 
   la respuesta utilizando la sintaxis return await axios.post(...). Esto significa que la función 
   loginUser devolverá una promesa que se resolverá con los datos de la respuesta.

3. Si ocurre algún error durante la solicitud (por ejemplo, problemas de red, error del servidor, etc.),
   se lanza una excepción utilizando throw error. Esto permitirá capturar y manejar el error en el lugar 
   donde se llama a la función loginUser.

En resumen, este código proporciona una forma de realizar una solicitud de inicio de sesión a través 
de una API utilizando Axios.*/