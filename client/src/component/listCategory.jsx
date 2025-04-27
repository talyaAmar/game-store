import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllC, mydelete, update } from "../axios/categoryAxios";
import { delete_category, loadCategory } from "../redux/action";
import { Link } from "react-router-dom";

export const ListCategorys = () => {
    let listCat = useSelector((x) => x.dataCategoryReducer.listCategory); // קבלת הנתונים מ-Redux
    const [editCategoryId, setEditCategoryId] = useState({}); // מזהה את השורה הנערכת
    const [formData, setFormData] = useState({ nameCategory: "" }); // הנתונים לעריכה
    const [originalFormData, setOriginalFormData] = useState({ nameCategory: ""}); 
    const user = useSelector((x) => x.dataCustomerReducer.currentUser);
    let d = useDispatch();

    useEffect(() => {
        // if (listCat.length === 0) {
          getAllC()
            .then((x) => d(loadCategory(x.data)))
            .catch((err) => console.log(err));

    }, [listCat]);

    const f5 = (id) => {
        mydelete(id)
            .then(() => {
                d(delete_category(id));
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
      const updateFormDate={};
      if(formData.nameCategory!=="")
         updateFormDate.nameCategory=formData.nameCategory
        else
        updateFormDate.nameCategory=originalFormData.nameCategory

        update(id, updateFormDate)
            .then(() => {
                d(loadCategory(listCat.map((cat) => (cat._id === id ? { ...cat, ...formData } : cat))));
                setEditCategoryId(null); // מסיים עריכה
                alert("עודכן בהצלחה!");
            })
            .catch((err) => {
                console.log(err.message);
                alert("שגיאה בעדכון, נסי שוב");
            });
    };
    const editClick = (line) => {
        setEditCategoryId(line._id); // מפעיל מצב עריכה
        setFormData({ nameCategory: line.nameCategory }); // ממלא את הטופס עם הנתונים הקיימים
   setOriginalFormData({nameCategory:line.nameCategory})
      };

    const cancel = () => {
        setEditCategoryId(null); // מבטל עריכה
        setFormData({ nameCategory: "" });
    };

    return (
        <div className="container" >
            <h1>רשימת קטגוריות</h1>
            <br />
            {
                user.name == "מנהל" &&
                 <Link to={`/myAdd/`} className="btn btn-pastel-pink">
                    הוספת קטגוריה
                </Link>
            }
{/* <br></br>
<br></br>
<br></br>   */}

<table className="table">
  <thead>
    <tr>
      <th>קוד קטגוריה</th>
      <th>שם קטגוריה</th>
      {user.name == "מנהל" && <th>מחיקה</th>}
      {user.name == "מנהל" && <th>עדכון</th>}
    </tr>
  </thead>
  <tbody>
    {listCat.map((x) => (
      <tr key={x._id}>
        <td>{x._id}</td>
        <td>
          {editCategoryId === x._id ? (
            <input
              type="text"
              name="nameCategory"
              value={formData.nameCategory}
              onChange={changeToInput}
            />
          ) : (
            x.nameCategory
          )}
        </td>
        {user.name == "מנהל" && (
          <td>
            <button className="btn btn-secondary" onClick={(e) => { e.preventDefault(); f5(x._id); }}>-</button>
          </td>
        )}
        {user.name == "מנהל" && (
          <td>
            {editCategoryId === x._id ? (
              <>
                <button className="btn btn-success" onClick={(e) => { e.preventDefault(); f7(x._id); }}>שמור </button>
                <button className="btn btn-danger" onClick={(e) => { e.preventDefault(); cancel(); }}>בטל</button>
              </>
            ) : (
              <button className="btn btn-secondary" onClick={(e) => { e.preventDefault(); editClick(x); }}>+ </button>
            )}
          </td>
        )}
      </tr>
    ))}
  </tbody>
</table>

        </div>
    );
};
