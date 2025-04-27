import { Router } from "express";
import controllerCategory from "../controllers/controllerCategory.js";
import bodyParser from "body-parser";

const kr=Router()
kr.use(bodyParser.json())
kr.get('/',controllerCategory.getAll);
kr.post('/',controllerCategory.add);//השתמשתי בבנאי של המרה כי הוא לא יודע להמיר לאוביקט JSON
kr.put('/:id',controllerCategory.update)
kr.delete('/:id',controllerCategory.delete)
export default kr; //  kr יצוא של 