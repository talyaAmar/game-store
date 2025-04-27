import { model,Schema } from "mongoose"

//בניית הסכמה
const Kategory=Schema({
    nameCategory:String
})

//ליצא את הסכמה
export default model("kategory",Kategory);

