import { model, Schema } from "mongoose"; 

const customers=Schema({
    nameCustomer:String,
    password:String,
cardDetail:Number
})

//ליצא את הסכמה
export default model("customers",customers);