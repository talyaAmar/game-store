import { produce } from 'immer'

export const purchasData = {
    listdShop: []
}

export const dataPurchasReduser = produce((state, action) => {
    switch (action.type) {
        case "SET_LISTSHOP": {  state.listdShop = action.payload;  }
     break;
        default:
            break;
    }
}, purchasData)
