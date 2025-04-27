import { useDispatch, useSelector } from "react-redux";
import { getById } from "../axios/orderAxios";
import { loadAllShop } from "../redux/action";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Personal = () => {
    const [loading, setLoading] = useState(true); // הוספנו state למעקב אחר מצב טעינה
    const listShop = useSelector(s => s.dataPurchasReduser.listdShop);
    const c_u = useSelector(x => x.dataCustomerReducer.currentUser);
    const d = useDispatch();

    useEffect(() => {
        // if (listShop.length === 0 &&listShop!=null) {
            getById(c_u.id)
                .then((x) => 
                    d(loadAllShop(x.data)))  // טוען את הנתונים ל-redux  
                .catch((err) =>
                    console.log(err));
            // }
    }, [ listShop]);
    // useEffect(() => {
    //     if (listShop.length === 0 && c_u.id) {
    //         setLoading(true); 
    //         getById(c_u.id)
    //             .then((x) => {
    //                 d(loadAllShop(x.data));  // טוען את הנתונים ל-redux
    //                 setLoading(false); // סיימנו טעינה
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 setLoading(false); // סיימנו טעינה גם במקרה של שגיאה
    //             });
    //     } else {
    //         setLoading(false); // אם כבר יש נתונים, לא צריך לטעון מחדש
    //     }
    // }, [c_u.id, listShop, d]);

    // // כאשר הנתונים לא נטענו, הצג הודעת טעינה
    // if (loading) {
    //     return <div>טעינה...</div>;
    // }

    return (
        <div className="container">
            <h1>אזור אישי</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>קוד</th>
                        <th>קוד לקוח</th>
                        <th>תאריך</th>
                        <th>פרטי קניה</th>
                    </tr>
                </thead>
                <tbody>
                    {listShop.length > 0 ? (
                        listShop.map((x, i) => (
                            <tr key={i}>
                                <td>{x._id}</td>
                                <td>{x.codeCustomers}</td>
                                <td>{x.date}</td>
                                <td>
                                    <Link to={`/myDShop/${x._id}`} className="btn btn-secondary">
                                        פרטים נוספים
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">לא נמצאו נתונים</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Personal;
