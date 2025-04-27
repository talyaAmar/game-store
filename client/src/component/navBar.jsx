
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

export const NavBar=()=>{
    let login=useSelector(data=>data.dataCustomerReducer.currentUser)
    return   <ul className="nav justify-content-center pastel-menu">
      
      <img
        src="mediLogo.webp"
        alt="Mediland Logo"
        className="menu-logo"
      />
  
        <li className="nav-item">
            <NavLink className="nav-link"  to="myHome"> דף הבית</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="myRegister"> הרשם</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="myConnect">התחבר  </NavLink>
        </li>
        {
           login.name!="אורח"&& 
           <li>
            <NavLink className="nav-link active" to="myCategory">רשימת קטגוריות</NavLink>
        </li>
}
       {
        login.name!="אורח"&& 
        <li className="nav-item">
            <NavLink className="nav-link active" to="myGame">רשימת משחקים</NavLink>
        </li>
       }
         <li className="nav-item">
            <NavLink className="nav-link active" to="myShopping"> סל קניות</NavLink>
        </li>
       
       
       {
        login.name!="אורח"&&   <li className="nav-item">
            <NavLink className="nav-link active" to="myPersonal"> איזור אישי</NavLink>
        </li>
       }
    {/* {
       login.name!="אורח"&&  <li className="nav-item">
            <NavLink className="nav-link active" to="myAdd">הוספת קטגוריה </NavLink>
        </li>
    }
         */}

    </ul>



}