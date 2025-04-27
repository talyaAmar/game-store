import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCastomer, getCustomer } from "../axios/customerAxios";
import { add_customer } from "../redux/action";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [newUser, setNewUser] = useState({});
    const [myException, setMyException] = useState({});
    const dispath = useDispatch();
    const nevigate = useNavigate();

    const checkTakinut = () => {
        let errors = {};
        if (!newUser.nameCustomer) 
            errors.nameCustomer = "שם מלא הינו שדה חובה";  
        if (!newUser.password) 
            errors.password = "סיסמה הינה שדה חובה";
        if (!newUser.confirmPassword) 
            errors.confirmPassword = "אישור סיסמה הינו שדה חובה";
        
        // בדיקה אם הסיסמה ואישור הסיסמה תואמות
        if (newUser.password !== newUser.confirmPassword) {
            errors.confirmPassword = "הסיסמה ואישור הסיסמה אינם תואמים";
        }
        if (!newUser.cardDetail) 
            errors.cardDetail = "פרטי אשראי הינם שדה חובה";

        return errors;
    };

    const f2 = async () => {
        let errors = checkTakinut(); // בדיקות תקינות
        if (Object.keys(errors).length > 0) {
            setMyException(errors); // אם יש שגיאות, הצג אותן
            return;
        }

        const item = await getCustomer(newUser.nameCustomer, newUser.password);
        if (item.data.nameCustomer != null && item.data.password != null) {
            alert("הנך רשום כבר, אנא בצע התחברות");
            nevigate('/myConnect');
        } else {
            addCastomer(newUser)
                .then((x) => {
                    dispath(add_customer(x));
                    alert("נרשמת בהצלחה " + newUser.nameCustomer);
                    nevigate('/myConnect');
                })
                .catch((err) => {
                    console.log(err.message);
                    alert("שגיאה במהלך הרישום. נסי שוב.");
                });
        }
    };

    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg border-0">
                            <div className="card-header text-center" style={{ backgroundColor: '#ffcccb', color: 'white' }}>
                                <h4>טופס רישום</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">שם מלא</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            onBlur={(e) => setNewUser({ ...newUser, nameCustomer: e.target.value })}
                                            placeholder="הכנס את שמך"
                                            required
                                        />
                                        {myException.nameCustomer && <p className="alert alert-danger">{myException.nameCustomer}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">סיסמה</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            onBlur={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                            placeholder="בחר סיסמה חזקה"
                                            required
                                        />
                                        {myException.password && <p className="alert alert-danger">{myException.password}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">אישור סיסמה</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            onBlur={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                                            placeholder="הזן שוב את הסיסמה"
                                            required
                                        />
                                        {myException.confirmPassword && <p className="alert alert-danger">{myException.confirmPassword}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">פרטי אשראי </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="cardDetail"
                                            onBlur={(e) => setNewUser({ ...newUser, cardDetail: e.target.value })}
                                            placeholder="הכנס פרטי אשראי"
                                            required
                                        />
                                        {myException.cardDetail && <p className="alert alert-danger">{myException.cardDetail}</p>}
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary" onClick={(e) => { e.preventDefault(); f2(); }}>
                                            הרשם
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer text-center">
                                <p className="text-muted">כבר יש לך חשבון? <a href="/myConnect" className="text-primary">התחבר כאן</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
