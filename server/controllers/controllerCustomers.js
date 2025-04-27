import schemaCustomers from "../schema/schemaCustomers.js";

export default {
    //הוספה לרשימה
    add: (req, res) => {
        const k = new schemaCustomers(req.body)
        k.save()
            .then((k) => {
                res.status(200).send(k)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    },
    getByNameAndPass: (req, res) => {
        schemaCustomers.findOne({ nameCustomer: req.params.nameCustomer, password: req.params.password })
            .then((c) => {
                if (c)
                    res.status(200).send(c)
                else
                    res.status(200).send(false)
            })
            .catch((err) => res.status(404).send(err.message))
    }
}