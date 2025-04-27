import { produce } from 'immer'


export const mybuy = {
    listBuy: [
        //         {"_id":"6775abf89c9429e868e60342","name":"מונופול","codeCategory":"6767eecff56400b83c355bee","price":12,"image":"monopl.jpg","count":36,"amount":6},
        //    {"_id":"6775ac9f9c9429e868e60349","name":"טאקי","codeCategory":"6767eecff56400b83c355bee","price":111,"__v":0,"count":300,"image":"","amount":3}
    ]
}
export const databuy = produce((state, action) => {
    switch (action.type) {
        case "DELETE_BUY": { state.listBuy = state.listBuy.filter(x => x._id !== action.payload) };
            break;
        case "ADD_BUY": state.listBuy.push(action.payload);
            break;

        case "ADD_AMOUNT":
            const item = state.listBuy.find(x => x.id === action.payload);
            if (item) {
                item.count += 1; // מוסיפים 1 ל-amount של המוצר
            }
            break;
        case "LESS_AMOUNT":
            const item2 = state.listBuy.find(x => x.id === action.payload);
            if (item2) {
                if (item2.count > 1)
                    item2.count -= 1; //  1 ל-amount של המוצר
            }

            break;
        default:
            break;
    }
}, mybuy)