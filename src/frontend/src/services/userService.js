// import axios from "axios"
import authUsersApi from "../../apis/authUsersApi"

const BASE_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/user`


// // para pasar el token en las consultas
// const config = () => {
//    return {
//       headers: {
//          "Authorization": sessionStorage.getItem('token'),
//          "Content-Type": "application/json" // opcional, se pasa automaticamente.
//       }
//    }
// }

// uso interceptors(authUsersApi) en vez de config()
export const findAll = async () => {
   try {
      const response = await authUsersApi.get(BASE_URL)
      return response
   } catch (error) {
      console.error(error)
      throw error
   }
}


export const save = async ({ username, email, password, admin }) => {
   try {
      return await authUsersApi.post(BASE_URL, {
         username,
         email,
         password,
         admin
      })

   } catch (error) {
      throw error
   }
}

// objeto user destructurado
export const update = async ({ id, username, email, admin }) => {
   // paso el id por params y el resto en el cuerpo del request
   try {
      return await authUsersApi.put(`${BASE_URL}/${id}`, {
         username,
         email,
         admin,
      })
   } catch (error) {
      throw error
   }
}

export const remove = async (id) => {
   try {
      await authUsersApi.delete(`${BASE_URL}/${id}`)
   } catch (error) {
      console.error(error)
      throw error
   }
}