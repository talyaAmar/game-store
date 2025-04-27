import {produce} from 'immer'


export const myStateCategory={
    listCategory:[
    ]
}
export const dataCategoryReducer=produce((state,action)=>{
    switch(action.type){
        case "ADD_CATEGORY":state.listCategory.push(action.payload);
        break;
        case "SET_LISTCATEGORY":{state.listCategory=action.payload};
        break;
        case "DELETE_CATEGORY":{  state.listCategory = state.listCategory.filter(x => x.id !== action.payload)};
        break;

    default:
    break;
}
},myStateCategory)