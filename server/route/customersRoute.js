import bodyParser from "body-parser";
import { Router } from "express";
import controllerCustomers from "../controllers/controllerCustomers.js";

const cr=Router()
cr.use(bodyParser.json())
cr.post('/',controllerCustomers.add);
cr.get('/:nameCustomer/:password',controllerCustomers.getByNameAndPass)

export default cr;