import axios from "axios"

const authUsersApi = axios.create({
    baseUrl: `${import.meta.env.VITE_APP_API_BASE_URL}/user`
})

authUsersApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        "Authorization": sessionStorage.getItem('token'),
        //"Content-Type": "application/json" // opcional, se pasa automaticamente.
    }

    return config
})

export default authUsersApi


/* los interceptores de solicitud (request interceptors) se utilizan en el contexto de las solicitudes HTTP para realizar acciones 
* personalizadas antes de que se envíe una solicitud al servidor. 
* El interceptor de solicitud te permite modificar o agregar encabezados (headers), realizar validaciones, agregar tokens de autenticación, 
* entre otras tareas, antes de que la solicitud sea enviada.

* El objeto config es proporcionado por Axios cuando se realiza una solicitud HTTP. Cuando llamas a un método de Axios, como get, post, put, etc.,
* pasas un objeto de configuración como argumento. Este objeto de configuración puede contener propiedades como url, method, headers, params,
* data y otras opciones relacionadas con la solicitud.

* Este código permite realizar solicitudes HTTP a la URL base 'http://localhost:8080/api/post' con el encabezado de autorización incluido 
* en cada solicitud. Se define un interceptor de solicitud utilizando el método authUsersApi.interceptors.request.use(). Dentro de la función 
* de interceptor, se proporciona una función de callback que recibe la configuración de la solicitud (config). config.headers = 
* {...config.headers, "Authorization": sessionStorage.getItem('token')} utiliza el operador de propagación (...) para copiar los encabezados
*  existentes en el objeto config.headers y luego agrega el encabezado de autorización. Esto asegura que no se pierdan los encabezados existentes 
* y se mantengan en la solicitud El valor del encabezado de autorización se obtiene de sessionStorage.getItem('token'), lo que significa que se 
* espera que el token de autenticación esté almacenado en el sessionStorage.

* Finalmente, se exporta la instancia personalizada authUsersApi
*/