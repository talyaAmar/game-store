import axios from "axios"


const url="http://localhost:8080/kategory"
//במקביל לכל פונקציה בקונטרולר נגדיר פונקציה שנקרא לה
export const getAllC=()=>{
    return axios.get(`${url}`)
}

export const add=(obj)=>{
    return axios.post(`${url}`,obj)
}
export const update=(id,obj)=>{
    return axios.put(`${url}/${id}`,obj)
}

export const mydelete=(id)=>{
    return axios.delete(`${url}/${id}`)
}




