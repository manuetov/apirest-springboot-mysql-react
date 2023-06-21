import axios from "axios"

const BASE_URL = "http://localhost:8080/api/user"


// para pasar el token en las consultas
const config = () => {
   return {
      headers: {
         "Authorization": sessionStorage.getItem('token'),
         "Content-Type": "application/json" // opcional, se pasa automaticamente.
      }
   }
}

export const findAll = async () => {
   try {
      const response = await axios.get(BASE_URL)
      return response
   } catch (error) {
      console.error(error)
   }
   return null
}


export const save = async ({ username, email, password, admin }) => {
   try {
      return await axios.post(BASE_URL, {
         username,
         email,
         password,
         admin
      }, config())

   } catch (error) {
      throw error
   }
}

// objeto user destructurado
export const update = async ({ id, username, email, admin }) => {
   // paso el id por params y el resto en el cuerpo del request
   try {
      return await axios.put(`${BASE_URL}/${id}`, {
         username,
         email,
         admin,
      }, config())
   } catch (error) {
      throw error
   }
}

export const remove = async (id) => {
   try {
      await axios.delete(`${BASE_URL}/${id}`, config())
   } catch (error) {
      console.error(error)
      throw error
   }
}