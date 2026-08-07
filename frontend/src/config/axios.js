//this is the axios instance that will be used to make requests to the backend API. It is configured 
// with the base URL and any other default settings that are needed for the application.
import axios from 'axios'
console.log(import.meta.env.VITE_API_BASE_URL)

 const API=axios.create({
   
    baseURL: import.meta.env.VITE_API_BASE_URL, 
     timeout: 10000, //10 seconds timeout for requests
})
export default API