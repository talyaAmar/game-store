import { useState } from "react";
import { useDispatch } from "react-redux";
import { add_category } from "../redux/action";
import { add } from "../axios/categoryAxios";

export const AddCategory = () => {
    const [newCat, setAddCat] = useState({});
    const [myexeption, setMyexeption] = useState({});
    const dispathCat = useDispatch();

    const checkName = (e) => {
        let txt = e.target.value;
        let Lovalid = !txt.match("[a-zA-Zא-ת]"); 
        if (txt === "") {
            setMyexeption({ ...myexeption, nameCategory: "שדה חובה" });
        } else if (Lovalid) {
            setMyexeption({ ...myexeption, nameCategory: "חייב להכיל אותיות בלבד" });
        } else {
            setMyexeption({ ...myexeption, nameCategory: true }); // אם הכל תקין, אין שגיאה
        }
    };

    const f3 = () => {
        if (myexeption.nameCategory !== true) {
            alert("לא ניתן להוסיף קטגוריה, יש לתקן את השגיאות");
            return;
        }

        add(newCat)
            .then((x) => {
                dispathCat(add_category(x));
                alert("נוסף בהצלחה!!");
            })
            .catch((err) => {
                console.log(err.message);
                alert("שגיאה בהוספה, נסי שוב");
            });
    };

    return (
        <form>
            <h1>הוספת קטגוריה</h1>
            <div className="row">
                <div>
                    <br />
                    <br />
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter category"
                        onBlur={(e) => {
                            setAddCat({ ...newCat, nameCategory: e.target.value });
                            checkName(e);
                        }}
                    />
                    {myexeption.nameCategory !== true && (
                        <p className="alert alert-danger"> {myexeption.nameCategory}</p>
                    )}
                </div>
            </div>

            <button className="btn btn-secondary" onClick={(e) => { e.preventDefault(); f3(); }}>
                הוסף
            </button>
        </form>
    );
};
