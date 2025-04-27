import axios from "axios"


const url="http://localhost:8080/customers"

export const addCastomer=(obj)=>{
    return axios.post(`${url}`,obj)

}
export const getCustomer=(n,p)=>{
    return axios.get(`${url}/${n}/${p}`)
}
//return axios.get(`${url}/:nameCustomer/:password`,{nameCustomer:n,password:p})
