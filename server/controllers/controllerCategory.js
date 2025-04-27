//יבוא של המבנה האוסף של קטגוריות
import schemaKategory from "../schema/schemaKategory.js";

export default{
    //שליפת הרשימה
    getAll:(req,res)=>{
        schemaKategory.find()
        .then((list)=>{
            res.status(200).send(list)

        })
        .catch((err)=>{
            res.status(404).send(err.message)

        })
    },
    //הוספה לרשימה
  add:(req,res)=>{
const k=new schemaKategory(req.body)
k.save()
.then((k)=>{
    res.status(200).send(k)
})
.catch((err)=>{
    res.status(404).send(err.message)
})
},
update:(req,res)=>{
    schemaKategory.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then((k)=>{
        res.status(200).send(k)
    })
    .catch((err)=>{
        res.status(404).send(err.message)
    })
},
delete:(req,res)=>{
    schemaKategory.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(200).send(true)
    })
    .catch(()=>{
        res.status(404).send(false)
    })
}
}