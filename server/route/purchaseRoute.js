import { Router } from "express";
import controllerPuchase from "../controllers/controllerPuchase.js";
import bodyParser from "body-parser";

const pr=Router()
pr.use(bodyParser.json())
pr.get('/:codeCustomers',controllerPuchase.getById)
pr.post('/',controllerPuchase.add)

export default pr;