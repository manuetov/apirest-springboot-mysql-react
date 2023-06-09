export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case "login":
      return {
        isAuth: true,
        isAdmin: action.payload.isAdmin,
        user: action.payload,
      };
    case "logout":
      return {
        isAuth: false,
        isAdmin: false,
        user: undefined,
      };
    default:
      return state;
  }
};

/* loginReducer. Un reducer es una función que especifica cómo cambia el estado de una aplicación en respuesta 
a una acción. En este caso, el reducer loginReducer maneja las acciones relacionadas con el inicio de sesión de 
un usuario.

1. El reducer loginReducer recibe dos parámetros: state y action. El parámetro state representa el estado actual
   de la aplicación y action es un objeto que contiene información sobre la acción que se está realizando.

2. Dentro del reducer, se utiliza un bloque switch para manejar diferentes casos basados en el tipo de acción.

3. El primer caso es cuando el tipo de acción es 'login'. En este caso, se crea y devuelve un nuevo objeto de 
   estado que indica que el usuario está autenticado (isAuth: true). El valor de isAdmin se toma del campo
   isAdmin del objeto payload que se despacha en el useAuth. junto con la propiedad user que contiene el objeto
   completo se asigna directamente en el nuevo estado.

3. El segundo caso es cuando el tipo de acción es 'logout'. En este caso, se crea y devuelve un nuevo objeto de 
   estado que indica que el usuario no está autenticado (isAuth: false). El valor de isAdmin se establece en 
   false y la propiedad user se establece en undefined.

4. Si el tipo de acción no coincide con ninguno de los casos anteriores, se devuelve el estado actual sin 
   realizar cambios.

En resumen, el reducer loginReducer se utiliza para actualizar el estado de la aplicación en función de las 
acciones de inicio de sesión. Cuando se recibe una acción de tipo 'login', se actualiza el estado para indicar
que el usuario está autenticado y se almacenan los datos del usuario. Cuando se recibe una acción de tipo
'logout', se actualiza el estado para indicar que el usuario no está autenticado y se eliminan los datos del
usuario.*/
