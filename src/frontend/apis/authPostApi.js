import axios from 'axios'

const authPostApi = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_BASE_URL}/post`
})

authPostApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        "Authorization": sessionStorage.getItem('token'),
        //"Content-Type": "application/json" // opcional, se pasa automaticamente.
    }
    return config
})

export default authPostApi