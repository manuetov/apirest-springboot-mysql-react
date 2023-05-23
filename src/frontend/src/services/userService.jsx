import axios from "axios"

const BASE_URL = "http://localhost:8080/api/user"

export const findAll = async () => {
   try {
      const response = await axios.get(BASE_URL)
      return response
   } catch (error) {
      console.error(error)
   }
   return null
}


export const save = async ({ username, email, password }) => {
   try {
      return await axios.post(BASE_URL, {
         username,
         email,
         password
      })

   } catch (error) {
      throw error
   }


}

// objeto user destructurado
export const update = async ({ id, username, email }) => {
   // paso el id por params y el resto en el cuerpo del request
   try {
      return await axios.put(`${BASE_URL}/${id}`, {
         username,
         email,
         password: 'algo'
      })
      // en el backend en service el password no se asigna nada cuando se actualiza,
      // por eso y para que no de error en la validación del formulario si pone 'algo'
   } catch (error) {
      throw error
   }
 
}

export const remove = async (id) => {
   try {
      await axios.delete(`${BASE_URL}/${id}`)
   } catch (error) {
      console.error(error)
   }
}