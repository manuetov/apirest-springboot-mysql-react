import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";

import { loginReducer } from "../reducers/loginReducer";

// si el usuario es logeado obtengo sus datos o sino lo esta.
const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  isAdmin: false,
  user: undefined,
};

export const useAuth = () => {

  const [login, dispatch] = useReducer(loginReducer, initialLogin);
  const navigate = useNavigate();

  // recibe data de loginPage
  async function handlerLogin({ username, password }) {
    try {
      // recibe la data desde backend. promesa
      const response = await loginUser({ username, password });
      console.log(response);

      // extraigo el token
      const token = response.data.token;

      // dentro del token vienen los claims, que tienen los roles y el username.
      // cojo la segunda parte del JWT que contiene la data(payload), viene saparado por .
      // lo decodifico con atob y lo parseo ya que viene un Json String
      const claims = JSON.parse(window.atob(token.split(".")[1]));
      console.log(claims);

      const user = { username: claims.username };

      dispatch({
        type: "login",
        payload: { user, isAdmin: claims.isAdmin },
      });

      // guardo el usuario
      sessionStorage.setItem("login", JSON.stringify({
          isAuth: true,
          isAdmin: claims.isAdmin,
          user,
        })
      );
      // guardo el token del usuario  
      sessionStorage.setItem('token', `Bearer ${token}`)  
      navigate("/");

    } catch (error) {
      if (error.response?.status == 401) {
        Swal.fire("Error Login", "Username o password invalidos", "error");
      } else if (error.response?.status == 403) {
        Swal.fire("Error Login", "no tiene permisos para acceder al recurso", "error");
      } else {
        throw error;
      }
    }
  }

  //elimina la data. isAuth: false, isAdmin: false, user: undefined
  const handlerLogout = () => {
    dispatch({
      type: "logout",
    });
    // elimina la session
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("token");
    // clear() => borra todo. Se podría omitir lo anterior.
    sessionStorage.clear();
  };
  return {
    login,
    handlerLogin,
    handlerLogout,
  };
};

/* handlerLogin, para el inicio de sesión de un usuario. 

1. La función handlerLogin es una función asíncrona que recibe un objeto con las propiedades username y password como parámetros desestructurados.

2. Dentro del bloque try es donde se realiza la lógica principal del inicio de sesión. Se utiliza la función loginUser para enviar una solicitud 
   al backend y obtener una respuesta. La respuesta se almacena en la constante response.

3. A continuación, se extrae el token de la respuesta. El token se encuentra en la propiedad data.token de la respuesta.

4. El token JWT se divide en tres partes separadas por puntos. La segunda parte del token (el payload) se decodifica utilizando la función window.atob, 
   que decodifica una cadena codificada en base64.

5. El payload decodificado se analiza como un objeto JSON utilizando JSON.parse y se almacena en la constante claims. El payload contine información 
   como el nombre de usuario y los roles del usuario.

6. A continuación, se crea un objeto user con la propiedad username basado en los datos extraídos del payload.

7. Se realiza una llamada a la función dispatch, que es parte de un contexto o un estado global. Esta llamada actualiza el estado de la aplicación 
   con la acción 'login' y pasa un objeto payload que contiene el objeto user y el valor isAdmin extraídos de los claims.

8. Se utiliza sessionStorage.setItem para almacenar los datos del inicio de sesión en la sesión del navegador. Los datos almacenados incluyen 
   información sobre si el usuario está autenticado (isAuth), si es administrador (isAdmin) y el objeto user.

9. sessionStorage.setItem('token', Bearer ${token}) se encarga de almacenar el token de autenticación en el almacenamiento de sesión (sessionStorage). 
   La cadena "Bearer ${token}" se utiliza para incluir el prefijo "Bearer" seguido del token en el valor almacenado. El prefijo "Bearer" es comúnmente
   utilizado en esquemas de autenticación basados en tokens, como el estándar JWT (JSON Web Token). Indica que el token se utiliza como parte de la 
   autenticación en el encabezado de la solicitud HTTP.
   Al almacenar el token en el almacenamiento de sesión, se puede acceder a él posteriormente en otras partes de la aplicación para incluirlo en las 
   solicitudes de API y autenticar al usuario en el servidor.   

10. Finalmente, se utiliza la función navigate para redirigir al usuario a la ruta '/users', que parece ser la página principal después del inicio 
   de sesión exitoso.

11. En caso de que se produzca un error durante el inicio de sesión (por ejemplo, si las credenciales son inválidas), se captura la excepción en el
    bloque catch y se muestra un mensaje de error utilizando Swal.fire. dependiendo del status de error.

12. La función handlerLogout se encarga de realizar el logout o cierre de sesión. Al llamar a esta función, se realiza lo siguiente:
    - Se despacha una acción de tipo 'logout' al dispatch para actualizar el estado de autenticación y eliminar la información del usuario.
    - Se eliminan los datos de autenticación y token del almacenamiento de sesión (sessionStorage).

En resumen, este código realiza una solicitud de inicio de sesión al backend, procesa la respuesta, actualiza el estado de la aplicación y almacena
 los datos del inicio de sesión en la sesión del navegador antes de redirigir al usuario a la página principal.*/
