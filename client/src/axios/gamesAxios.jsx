import axios from "axios"


const url="http://localhost:8080/games"


export const getAll=()=>{
    return axios.get(`${url}/`)
}
export const add=(obj)=>{
    return axios.post(`${url}/`,obj)
}
export const update=(id,obj)=>{
    return axios.put(`${url}/${id}`,obj)
}

export const mydelete=(id)=>{
    return axios.delete(`${url}/${id}`)
}

export const getByCategoryId=(obj)=>{//יכול להיות שזה לא נכון
    return axios.get(`${url}/getByCategoryId/byKategory/:kid`)
}
    
