import { useDispatch, useSelector } from "react-redux"
import { add_order } from "../axios/orderAxios";
import { add_amount, deleteBuy, less_amount, loadBuy } from "../redux/action";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export const Shopping = () => {

  const c_u = useSelector(s => s.dataCustomerReducer.currentUser);
  const card=(useSelector(s => s.databuy.listBuy))
  let d = useDispatch()
  let navigate = useNavigate();
  
  const saveOrder = () => {
    if (c_u.name === "אורח") {
      alert("אתה לא מחובר")
      navigate("/myConnect");
    }
    else {
      debugger;
      let my_order = {
        codeCustomers: c_u.id,
        date: new Date(),
        gamesArr: card.map((i) => ({ id: i._id, name: i.name, price: i.price, count: i.count, totalPrice: i.price }))
      }
      console.log("bb", my_order)
      add_order(my_order)
        .then((s) => {
          debugger
          alert("הצליח!!!");
          navigate("/myPersonal");  // מעבר לדף התשלום
        })
        .catch((err) => {
          alert("rrrr")
          console.log(err.message);  // הדפסת השגיאה בקונסול
        });
    }
  }

  return (
    <>
      <h1 className="text-center my-4">סל קניות</h1>

      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>קוד מוצר</th>
              <th>שם המוצר</th>
              <th>מחיר</th>
              <th>כמות</th>
              <th>מחיר סופי</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {card.map((x, i) => (
              <tr key={i} >
                <td>{x.id}</td>
                <td>{x.name}</td>
                <td>{x.price} ש"ח</td>
                <td>
                  <button
                    className="btn btn-success btn-sm mx-1"
                    onClick={(e) => { e.preventDefault(); d(add_amount(x.id)); }}
                  >
                    +
                  </button>
                  {x.count}
                  <button
                    className="btn btn-warning btn-sm mx-1"
                    onClick={(e) => { e.preventDefault(); d(less_amount(x.id)); }}
                  >
                    -
                  </button>
                </td>
                <td>{x.count * x.price} ש"ח</td>
                <td>
            
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        d(deleteBuy(x._id));
          
                      }}
                    >
                      מחיקה
                    </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-center mt-4">
          <button
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              saveOrder();
            }}
          >
            שמור הזמנה
          </button>
        </div>
      </div>
    </>
  );
}
