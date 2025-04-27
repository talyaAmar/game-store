import {current, produce} from 'immer'

export const myStateCustomer={
    listCustomer:[
    ],
    currentUser:{name:"אורח",password:"",id:""}
}


export const dataCustomerReducer=produce((state,action)=>{
    switch(action.type){
        case "ADD_CUSTOMER":state.listCustomer.push(action.payload)
        break;
        case "SET-USER-NAME":{state.currentUser=action.payload}
        break;
    default:
    break;
}
},myStateCustomer)