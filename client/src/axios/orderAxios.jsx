import axios from "axios"


const url="http://localhost:8080/purchase"


export const add_order=(obj)=>{
    return axios.post(`${url}/`,obj)
}
export const getById=(obj)=>{
    return axios.get(`${url}/${obj}`)
}




    
