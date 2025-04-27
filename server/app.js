 import express from "express"
 import mongoose, { mongo } from "mongoose";
 import cors from "cors"
 import gr from "./route/gameRoute.js";
import cr from "./route/customersRoute.js";
import kr from "./route/karegoryRoute.js";
import pr from "./route/purchaseRoute.js";
 
 const app=express()

 app.use(cors());//בגלל שיש בעית חיבור בין שרת ללקוח
 
 //בחירת כתובת לפרויקט
app.listen ("8080",()=>{
    console.log("serrer run");
})

 app.use('/kategory',kr)
app.use('/games',gr)
app.use('/customers',cr)
app.use('/purchase',pr)

//מגדירה את תקית התמונות לציבורית
app.use(express.static('images'))

//בפונציה הזו אני מחברת את השרת למסד נתונים
mongoose.connect('mongodb://0.0.0.0:27017/game_shop')
.then(()=>{
    console.log("connect mongo");
})
.catch((err)=>{
    console.log(err.message);
})
