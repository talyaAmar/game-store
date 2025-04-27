export const add_category = (item) => {
    return { type: "ADD_CATEGORY", payload: item }
}
export const loadCategory = (mydata) => {
    return { type: "SET_LISTCATEGORY", payload: mydata }
}


export const delete_category = (item) => {
    
    return { type: "DELETE_CATEGORY", payload: item }
}

export const add_game = (item) => {
    alert(item)
    return { type: "ADD_GAMES", payload: item }
}
export const loadGames = (mydata) => {
    return { type: "SET_LISTGAMES", payload: mydata }
}


export const delete_games = (item) => {
    return { type: "DELETE_GAMES", payload: item }
}

export const add_customer=(item)=>{
    alert(item)
    return {type:"ADD_CUSTOMER",payload:item}
}


export const setuserName=(val)=>{
    return {type:"SET-USER-NAME",payload:val}
}

export const deleteBuy = (item) => {
    alert("המוצר נמחק בהצלחה")
    return { type: "DELETE_BUY", payload: item }
}
export const add_buy=(item)=>{
    alert(item)
    return {type:"ADD_BUY",payload:item}
}
export const loadBuy = (mydata) => {
    return { type: "SET_LISTBUY", payload: mydata }
}

export const add_amount=(item)=>{
    return {type:"ADD_AMOUNT",payload:item}
}
export const less_amount=(item)=>{
    return {type:"LESS_AMOUNT",payload:item}
}
export const loadAllShop = (mydata) => {
    return { type: "SET_LISTSHOP", payload: mydata }
}



