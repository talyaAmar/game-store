import mongoose, { model, Schema } from "mongoose";

const purchase=Schema({
  codeCustomers:{
            type:mongoose.Types.ObjectId,
            ref:'customers'//למי אני מקשרת את האוביקט
             },
  date: Date,
  gamesArr:[{
    code:{
        type:mongoose.Types.ObjectId,
        ref:'games'//למי אני מקשרת את האוביקט
         },
   name:String,
   count:Number,
   totalPrice:Number,
}],

})

export default model("purchase",purchase);//יצוא