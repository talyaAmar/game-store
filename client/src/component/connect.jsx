import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCustomer } from "../axios/customerAxios"
import { Link, useNavigate } from "react-router-dom"
import { setuserName } from "../redux/action"

export const Connect = () => {
  const [user, setUser] = useState({})
  const d =useDispatch()
  const nevigate = useNavigate();

  
  const f1 = async () => {
    const item = await  getCustomer(user.name, user.password)
     debugger;
    if (item.data !=false){
      //עדכון משתמש נוכחי ל שם ולססמה
      let obj={name:user.name,password:user.password,id:item.data._id}
      d(setuserName(obj))
      
    }
    else
  {
     alert("משתמש לא רשום, עליך לבצע רישום למערכת")
     nevigate('/myRegister')
  }
  }

  return <>
    <form className="container">
      <br></br>
      <h2>טופס התחברות</h2>
      <input required className="form-control" type="text" onBlur={(e) => setUser({ ...user, name: e.target.value })} placeholder="name"  ></input>
      <br></br>
      <input required className="form-control" type="password" onBlur={(e) => setUser({ ...user, password: e.target.value })} placeholder="password"></input>
      <br></br>
      <button required className="btn btn-outline-secondary" onClick={(e) =>{e.preventDefault();f1()} }>Login</button>
    </form>
    {/* <Link to={`/myRegister/`} className="btn btn-pastel-pink"></Link> */}

  </>
}