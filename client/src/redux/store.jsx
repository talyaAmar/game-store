import { combineReducers, createStore } from "redux";
import { dataGameReducer } from "./reducer/gameReducer";
import { dataCategoryReducer } from "./reducer/categoryReducer";
import { dataCustomerReducer } from "./reducer/customerReducer";
import { databuy } from "./reducer/buyReducer";
import { dataPurchasReduser } from "./reducer/purchasReduser";


const reducer=combineReducers({dataGameReducer,dataCategoryReducer,dataCustomerReducer,databuy,dataPurchasReduser})
export const myStore=createStore(reducer)
window.store=myStore