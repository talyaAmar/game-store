import schemaGames from "../schema/schemaGames.js";

export default{
    //שליפת הרשימה
        getAll:(req,res)=>{
            schemaGames.find()
            .then((list)=>{
                res.status(200).send(list)
    
            })
            .catch((err)=>{
                res.status(404).send(err.message)
    
            })
        },
         //הוספה לרשימה
          add:(req,res)=>{
        const k=new schemaGames(req.body)
        k.save()
        .then((k)=>{
            res.status(200).send(k)
        })
        .catch((err)=>{
            res.status(404).send(err.message)
        })
        },
        update:(req,res)=>{
            schemaGames.findByIdAndUpdate(req.params.id,req.body,{new:true})
            .then((k)=>{
                res.status(200).send(k)
            })
            .catch((err)=>{
                res.status(404).send(err.message)
            })
        },
        delete:(req,res)=>{
            schemaGames.findByIdAndDelete(req.params.id)
            .then(()=>{
                res.status(200).send(true)
            })
            .catch(()=>{
                res.status(404).send(false)
            })
        },
        getByCategoryId:(req,res)=>{
            schemaGames.find({codeCategory:req.params}).kid.populate('codeCategory')
            .then((g)=>{
                res.status(200).send(g)
            })
            .catch((err)=>{
                res.status(404).send(err.message)
            })
        }
}
