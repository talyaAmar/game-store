import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAll, getByCategoryId } from "../axios/gamesAxios"
import { add_amount, add_buy, loadCategory, loadGames } from "../redux/action"
import { getAllC } from "../axios/categoryAxios"


export const Home = () => {
    const listofgame = useSelector(x => x.dataGameReducer.listGamess||[])
    const listCategory = useSelector(x => x.dataCategoryReducer.listCategory || [])
    const buyList=useSelector(s => s.databuy.listBuy)
    const [Listfilter, setListFilter] = useState([])

    let s = "monopl.jpg"
    let d = useDispatch()

    useEffect(() => {
        if (listofgame != null && listofgame.length === 0) {
            getAll().then((x) => d(loadGames(x.data)))
                .catch((err) => console.log(err));
        }
        if (Listfilter&& Listfilter.length==0){
            setListFilter(listofgame);
        }
            getAllC()
                .then((x) => d(loadCategory(x.data)))
                .catch((err) => console.log(err));
    }, [listofgame, listCategory])

    const addToBuy = (x) => {
        debugger;
        const ch=buyList.find(y=>y.name===x.name)
        if(ch!=null){
           d(add_amount(x._id))
        alert("נוסף בהצלחה")
     }
        else{
        let item = { id: x._id, name: x.name, price: x.price, count: 1, totalPrice: x.price }
        d(add_buy(item))}
    }

    // const checkFilter = (filterName) => {
    //     const item = listCategory.find((cat) => cat.nameCategory==filterName);
    //     if (item) {
    //         getByCategoryId(item._id)
    //             .then((response) => setListFilter(response.data))
    //             .catch((err) => console.log(err));
    //     } else {
    //         setListFilter(listofgame); // אם לא נמצא התאמה, מחזירים את כל המשחקים
    //     }
    // }

    return (
        <>
            <br />
            {/* <div className="d-flex justify-content-end align-items-center mb-3">
                <input
                    type="text"
                    className="form-control form-control-sm w-auto me-2"
                    placeholder="Enter category"
                    value={filter}
                    onBlur={(e) => setFilter(e.target.value)}
                />
                <button
                    onClick={(e) => { e.preventDefault(); checkFilter(filter); }}
                    className="btn btn-secondary"
                >
                    סנן
                </button> */}
            {/* </div> */}

            <div className="container my-4">
                <select onChange={(e) => {
                    debugger;
                    if (listofgame && listofgame.length > 0) {
                        if (e.target.value === ""){
                            console.log("Showing all games");
                            setListFilter(listofgame)}
                        else{
                            setListFilter(listofgame.filter((x) => String(x.codeCategory) === String(e.target.value)));
                            console.log("Showing fff");
                            console.log(Listfilter);
                        }  }
                }}>
                    <option value="">כל הקטגוריות</option>
                    {listCategory.map((x, i) => (
                        <option key={x._id} value={x._id}>{x.nameCategory}</option>
                    ))}
                </select>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {Listfilter.map((x, i) => (
                        <div key={i} className="col">
                            <div className="card h-100 text-center">
                                <img src={`http://localhost:8080/${x.image}`} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{x.name}</h5>
                                    <div className="d-flex justify-content-center gap-2">
                                        <button className="btn btn-secondary" onClick={(e) => { e.preventDefault(); addToBuy(x); }}>הוסף לסל </button>
                                        <Link to={`/myDetails/${x.name}`} className="btn btn-secondary">
                                            פרטים נוספים
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
