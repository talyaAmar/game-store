import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_games, loadGames } from "../redux/action";
import { getAll, mydelete, update } from "../axios/gamesAxios";
import { Link } from "react-router-dom";

export const ListGame = () => {
    let listofgame = useSelector(x => x.dataGameReducer.listGamess);
    const [editGameId, setEditGameId] = useState(null); // מזהה את השורה הנערכת
    const [formData, setFormData] = useState({ name: "", codeCategory: "", price: "", image: "", count: "" }); // הנתונים לעריכה
    const [originalFormData, setOriginalFormData] = useState({ name: "", codeCategory: "", price: "", image: "", count: "" }); // הערכים המקוריים
    let d = useDispatch();
    const user = useSelector((x) => x.dataCustomerReducer.currentUser);

    useEffect(() => {
        if (listofgame != null || listofgame.length === 0) {
            getAll().then((x) => d(loadGames(x.data)))
                .catch((err) => console.log(err));
        }
    }, [listofgame]);

    const f6 = (id) => {
        mydelete(id).then(() => {
            d(delete_games(id));
            alert("נמחק בהצלחה!!");
        })
        .catch((err) => {
            console.log(err.message);
            alert("שגיאה במחיקה, נסי שוב");
        });
    };

    const changeToInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const f7 = (id) => {
        const updatedFormData = {};

       if (formData.name != "")
        updatedFormData.name= formData.name
       else
       updatedFormData.name=originalFormData.name;
       if (formData.codeCategory != "")
        updatedFormData.codeCategory= formData.codeCategory
       else
       updatedFormData.codeCategory=originalFormData.codeCategory;

       if (formData.price != "")
        updatedFormData.price= formData.price
       else
       updatedFormData.price=originalFormData.price;
       if (formData.image != "")
        updatedFormData.image= formData.image
       else
       updatedFormData.image=originalFormData.image;
       if (formData.count != "")
        updatedFormData.count= formData.count
       else
       updatedFormData.count=originalFormData.count;
       
        // עדכון המשחק
        update(id, updatedFormData)
            .then(() => {
                d(loadGames(listofgame.map((game) => (
                    game._id === id ? { ...game, ...updatedFormData } : game
                ))));
                setEditGameId(null); // מסיים עריכה
                alert("עודכן בהצלחה!");
            })
            .catch((err) => {
                console.log(err.message);
                alert("שגיאה בעדכון, נסי שוב");
            });
    };

    const editClick = (line) => {
        setEditGameId(line._id); // מפעיל מצב עריכה
        setFormData({ name: line.name, codeCategory: line.codeCategory, price: line.price, image: line.image, count: line.count }); // ממלא את הטופס עם הנתונים הקיימים
        setOriginalFormData({ name: line.name, codeCategory: line.codeCategory, price: line.price, image: line.image, count: line.count }); // שומר את הערכים המקוריים
    };

    const cancel = () => {
        setEditGameId(null); // מבטל עריכה
        setFormData({ name: "", codeCategory: "", price: "", image: "", count: "" });
    };

    return (
        <div className="container">
            <h1>list games</h1>
            <br></br>
            {user.name === "מנהל" &&
                <Link to={`/myAddGame/`} className="btn btn-pastel-pink">
                    הוספת משחק
                </Link>}
            <table className="table table-game">
                <thead>
                    <tr>
                        <th>קוד</th>
                        <th>שם</th>
                        <th>קטגוריה</th>
                        <th>מחיר</th>
                        <th>תמונה</th>
                        <th>כמות</th>
                        {user.name === "מנהל" && <th>מחיקה</th>}
                        {user.name === "מנהל" && <th>עדכון</th>}
                    </tr>
                </thead>
                <tbody>
                    {listofgame.map((x, i) => (
                        <tr key={i}>
                            <td>{x._id}</td>
                            <td>
                                {editGameId === x._id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={changeToInput}
                                    />
                                ) : (x.name)}
                            </td>
                            <td>
                                {editGameId === x._id ? (
                                    <input
                                        type="text"
                                        name="codeCategory"
                                        value={formData.codeCategory}
                                        onChange={changeToInput}
                                    />
                                ) : (x.codeCategory)}
                            </td>
                            <td>
                                {editGameId === x._id ? (
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={changeToInput}
                                    />
                                ) : (x.price)}
                            </td>
                            <td>
                                {editGameId === x._id ? (
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={changeToInput}
                                    />
                                ) : (<img src={`http://localhost:8080/${x.image}`} style={{ height: '50px' }} />)}
                            </td>
                            <td>
                                {editGameId === x._id ? (
                                    <input
                                        type="number"
                                        name="count"
                                        value={formData.count}
                                        onChange={changeToInput}
                                    />
                                ) : (x.count)}
                            </td>
                            {user.name === "מנהל" && <td>
                                <button className="btn btn-secondary" onClick={(e) => { e.preventDefault(); f6(x._id); }}>-</button>
                            </td>}
                            {user.name === "מנהל" && <td>
                                {editGameId === x._id ? (
                                    <>
                                        <button className="btn btn-success" onClick={(e) => { e.preventDefault(); f7(x._id); }}>שמור </button>
                                        <button className="btn btn-danger" onClick={(e) => { e.preventDefault(); cancel(); }}>בטל</button>
                                    </>) : (
                                    <button className="btn btn-secondary" onClick={(e) => { e.preventDefault(); editClick(x); }} >+ </button>
                                    )}
                            </td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
