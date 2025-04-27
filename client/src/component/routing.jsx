import { Route, Routes } from "react-router-dom"
import { ListCategorys } from "./listCategory"
import { ListGame } from "./listGame"
import { AddCategory } from "./addCategory"
import { Home } from "./homePage"
import { Shopping } from "./shopping"
import { Register } from "./register"
import { Connect } from "./connect"
import { NavBar } from "./navBar"
import { Personal } from "./personal"
import { Details } from "./details"
import { AddGame } from "./addGame"
import { DetailOfShop } from "./detailOfShop"

export const Routing=()=>{
    return <>
    <Routes>
    <Route path="myCategory" element={<ListCategorys></ListCategorys>}></Route>
    <Route path="myGame" element={<ListGame></ListGame>}></Route>
    <Route path="myAdd" element={<AddCategory></AddCategory>}></Route>
    <Route path="myAddGame" element={<AddGame></AddGame>}></Route>
     <Route path="myHome" element={<Home></Home>}></Route>
<Route path="myDetails/:name" element={<Details></Details>}></Route>

<Route path="myShopping" element={<Shopping></Shopping>}></Route>

<Route path="myRegister" element={<Register></Register>}></Route>
<Route path="myConnect" element={<Connect></Connect>}></Route>
<Route path="myNav" element={<NavBar></NavBar>}></Route>
<Route path="myPersonal" element={<Personal></Personal>}></Route>
<Route path="myDShop/:id" element={<DetailOfShop></DetailOfShop>}></Route>

    </Routes>
    </>
}

