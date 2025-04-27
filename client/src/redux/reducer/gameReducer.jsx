import {produce} from 'immer'

export const myState={
     listGamess:[
     //{code:123,name:"aaa",price:25,image:"",age:"7-12",codeCategory:2323},
    //     {code:123,name:"aaa",price:25,image:"",age:"7-12",codeCategory:2323},
    //     {code:123,name:"aaa",price:25,image:"",age:"7-12",codeCategory:2323},
    //     {code:123,name:"aaa",price:25,image:"",age:"7-12",codeCategory:2323}
 ]
}

export const dataGameReducer=produce((state,action)=>{
            switch(action.type){
                case "ADD_GAMES":state.listGamess.push(action.payload);
                break;
                case "SET_LISTGAMES":{ state.listGamess=action.payload;debugger};
                break;
                case "DELETE_GAMES":{state.listGamess.filter(x=>x.id!=action.payload)};
                break;
            default:
            break;
    }
},myState)