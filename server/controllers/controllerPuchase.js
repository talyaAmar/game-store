
//import { code } from "statuses";
import schemaPurchase from "../schema/schemaPurchase.js";

export default{
     getById:(req,res)=>{
                schemaPurchase.find({codeCustomers:req.params.codeCustomers})
                .then((g)=>{
                     if(g)
                    res.status(200).send(g)
                 else
                 res.status(200).send("לא קיים")
                })
                .catch((err)=>{
                    res.status(404).send(err.message)
                })
            },
           
add: (req, res) => {
        const k = new schemaPurchase(req.body)
        k.save()
            .then((k) => {
                res.status(200).send(k)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    },
}