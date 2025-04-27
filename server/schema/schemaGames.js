import mongoose, { model, Schema } from "mongoose";

const games=Schema({
    name:String,
    codeCategory:{
        type:mongoose.Types.ObjectId,  //הסוג
        ref:'Kategory'//למי אני מקשרת את האוביקט- לקטגוריה
    },
    price:Number,
    image:String,
    count:Number
})

//ליצא את הסכמה
export default model("games",games);