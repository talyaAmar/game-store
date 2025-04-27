import { useState } from "react"
import { useDispatch } from "react-redux"
import { add } from "../axios/gamesAxios"
import { add_game } from "../redux/action"

export const AddGame = () => {

    const [newGame, setAddGame] = useState({})
    const [myExep, setMyExep] = useState({})
    const dispathG = useDispatch()

    const checkName = (e) => {
        let txt = e.target.value
        let Lovalid = !txt.match("[a-zA-Z]")
        if (txt === "")
            setMyExep({ ...myExep, name: "שדה חובה" })
        else if (Lovalid)
            setMyExep({ ...myExep, name: "חייב להכיל אותיות בלבד" })
        else
            setMyExep({ ...myExep, name: true })
    }

    const checkNumber = (e) => {
        let txt = e.target.value
        let Lovalid = !txt.match("[0-9]")
       if (Lovalid)
            setMyExep({ ...myExep, number: "חייב להכיל מספרים בלבד" })
        else
            setMyExep({ ...myExep, number: true })
    }

    const validateFields = () => {
        const errors = {}
        if (!newGame.name) errors.name = "שדה חובה"
        if (!newGame.codeCategory) errors.codeCategory = "שדה חובה"
        if (!newGame.price) errors.price = "שדה חובה"
        if (!newGame.image) errors.image = "שדה חובה"
        if (!newGame.count) errors.count = "שדה חובה"
       
        if (Object.keys(errors).length > 0) {
            setMyExep(errors)
            return false
        }
        return true
    }

    const f4 = () => {
        // אם כל השדות תקינים, מבצע את הקריאה לשרת
        if (validateFields()) {
            add(newGame).then((x) => {
                dispathG(add_game(x))
                alert("נוסף בהצלחה!!")
            })
            .catch((err) => {
                console.log(err.message)
                alert("שגיאה בהוספה, נסי שוב");
            })
        }
    }

    return (
        <form>
            <h1>הוספת משחק</h1>
            <div className="row">
                <div>
                    <br />
                    <br />
                    <br />
                    <input type="text" className="form-control" placeholder="Enter name" 
                        onBlur={(e) => { setAddGame({ ...newGame, name: e.target.value }); checkName(e) }} />
                    {myExep.name && <p className="alert alert-danger"> {myExep.name}</p>}

                    <input type="text" className="form-control" placeholder="Enter code category" 
                        onBlur={(e) => setAddGame({ ...newGame, codeCategory: e.target.value })} />
                    {myExep.codeCategory && <p className="alert alert-danger"> {myExep.codeCategory}</p>}

                    <input type="number" className="form-control" placeholder="Enter price" 
                        onBlur={(e) => { setAddGame({ ...newGame, price: e.target.value }); checkNumber(e) }} />
                    {myExep.price && <p className="alert alert-danger"> {myExep.price}</p>}

                    <input type="text" className="form-control" placeholder="Enter image" 
                        onBlur={(e) => setAddGame({ ...newGame, image: e.target.value })} />
                    {myExep.image && <p className="alert alert-danger"> {myExep.image}</p>}

                    <input type="number" className="form-control" placeholder="Enter count" 
                        onBlur={(e) => { setAddGame({ ...newGame, count: e.target.value }); checkNumber(e) }} />
                    {myExep.count && <p className="alert alert-danger"> {myExep.count}</p>}
                </div>
            </div>

            <button className="btn btn-secondary" onClick={(e) => { e.preventDefault(); f4() }}>הוסף</button>
        </form>
    )
}
