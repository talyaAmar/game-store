import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getById } from "../axios/orderAxios"
import { loadAllShop } from "../redux/action"

export const DetailOfShop=()=>{

    const params = useParams()
    const d = useDispatch()
    const listShop = useSelector(s => s.dataPurchasReduser.listdShop);
    console.log("ss", listShop)
    const myOrder=listShop.find((x)=>x._id==params.id)
console.log(myOrder.gamesArr);


    return<>
      <div className="container" >
            <h1>הפריטים בקניה </h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>קוד </th>
                        <th>שם  </th>
                        <th>כמות</th>
                        <th>מחיר סופי </th>
                    </tr>
                </thead>
                <tbody>
                    {myOrder.gamesArr.map((x,i) => (
                           <tr key={i}>
                            <td>{x._id}</td>
                            <td>{x.name}</td>
                            <td>{x.count}</td>
                            <td>{x.totalPrice}</td>   
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}