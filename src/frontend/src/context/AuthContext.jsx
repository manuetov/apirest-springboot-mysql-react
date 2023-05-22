import React, { createContext } from 'react'
import { useContext, useReducer} from 'react'
import { authReducer } from '../auth/authReducer'

import { types } from '../auth/types/types'

// creo el context
const AuthContext = createContext()


// se cambiará a local storage
// const initialState =  {
//    logged: false,
// }

// carga el usuario que esta en el local Storage 
const init = () => {
   const user = JSON.parse( localStorage.getItem('user') )
   return {
      logged: !!user,
      user: user,
   }
}

// creo el provider. HOC
export const AuthProvider = ({ children }) => {
   
   //initialState es un objeto vacío {} init se encargará inicializar el hook
   const [ authState, dispatch ] = useReducer(authReducer, {}, init )

   // acción a realizar
   const login = ( name = '') => {
      const user = {
         id: 1,
         name: name  
      }
      const action = {
         type: types.login,
         payload: user
      }

      // guardo al usuario logeado en localstorage
      localStorage.setItem('user', JSON.stringify(user))

      // despacha la acción
      dispatch(action)
   }

   const logout = () => {
      localStorage.removeItem('user')
      const action = { type: types.logout }

      dispatch(action)
   }



   return (
      <AuthContext.Provider value={{ 
         ...authState, 
         //métodos
         login, 
         logout}}
      >
         { children }
      </AuthContext.Provider>
   )

}

export const useAuthContext = () => {
   return useContext(AuthContext)
}


/* la doble negación !!user. La primera negación !user convierte el valor de user
 en su opuesto booleano. Si user es null, undefined, false o un valor vacío, la 
 negación dará como resultado true. Si user tiene algún valor, la negación dará 
 como resultado false.

Luego, se realiza una segunda negación !(!user), que es equivalente a !!user. 
 Esta doble negación se utiliza para convertir el valor booleano obtenido en el
 paso anterior de nuevo al valor original de user. Es decir, si user era un valor
 falsy (null, undefined, false, valor vacío), la doble negación lo convierte en
 false. Si user tenía algún valor truthy, la doble negación lo convierte en true.

En resumen, la doble negación !!user se utiliza para convertir cualquier valor 
en un valor booleano, donde false representa la ausencia de usuario 
(null, undefined, false, valor vacío) y true indica que hay un usuario válido. */