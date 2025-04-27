import bodyParser from "body-parser";
import { Router } from "express";
import controllerGames from "../controllers/controllerGames.js";


const gr=Router()
gr.use(bodyParser.json())
gr.get('/',controllerGames.getAll);
gr.post('/',controllerGames.add);//השתמשתי בבנאי של המרה כי הוא לא יודע להמיר לאוביקט JSON
gr.put('/:id',controllerGames.update)
gr.delete('/:id',controllerGames.delete)
gr.get('/byKategory/:kid',controllerGames.getByCategoryId)
export default gr; 