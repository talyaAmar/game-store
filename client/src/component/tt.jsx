
import { add_amount, addshop, delete_item, less_amount } from "../redex/action";
import { Link, useNavigate } from "react-router-dom";
import { addnewshop } from "../axios/shopAxios";

export const Cart = () => {
  let listCart = useSelector((x) => x.datacart.cart);
  const current = useSelector((x) => x.datausers.current);

  let d = useDispatch();
  let navigate = useNavigate();
  let message = " ";
  if (!listCart[0]) message = "עגלה ריקה - הוסף פריטים";

  const TodayDate = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    return formattedDate;
  };

  const setCart = () => {
    const gamesArray = listCart.map((game) => ({
      codeGame: game._id,
      nameGame: game.name,
      price: game.price,
      amount: game.sum,
      totalprice: game.price * game.amount,
    }));

    const totalSum = gamesArray.reduce((sum, game) => sum + game.totalprice, 0);

    const shopObject = {
      codeCustomer: current._id,
      date: TodayDate(),
      gameArr: gamesArray,
      sum: totalSum,
    };

    console.log(shopObject);
    return shopObject;
  };

  const endShop = async () => {
    if (current.name == "לא מחובר") {
      alert("תתחבר")
      navigate("/mylogin");

    }
    else{
    const obj = setCart();
    if (obj) {
      try {
        const response = await addnewshop(obj);
        d(addshop(response.data));
        navigate("/mypayment");
      } catch (err) {
        console.log(err.message);
      }
    }
  }
  };

  return (
    <>
      <div className="container mt-5">
        <p className="text-center text-danger">{message}</p>
        <table className="table table-bordered table-hover text-center" style={{ borderColor: "#000" }}>
          <thead className="bg-black text-white">
            <tr>
              <th>קוד</th>
              <th>שם</th>
              <th>מחיר</th>
              <th>כמות</th>
              <th>מחיר סופי</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {listCart.map((x, i) => (
              <tr key={i}>
                <td>{x._id}</td>
                <td>{x.name}</td>
                <td>{x.price}₪</td>
                <td>
                  <button className="btn btn-outline-danger btn-sm"
                    onClick={(e) => { e.preventDefault(); d(add_amount(x._id));}} >
                    + </button>{" "}
                  {x.amount}{" "}
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      d(less_amount(x._id));
                    }}
                  >
                    -
                  </button>
                </td>
                <td>{x.amount * x.price}₪</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      d(delete_item(x._id));
                    }}
                  >
                    מחק
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-danger" onClick={() => endShop()}>
            סיום הקניה
          </button>
        </div>
      </div>
    </>
  );
};
