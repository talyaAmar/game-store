import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getAll } from "../axios/gamesAxios"
import { loadGames } from "../redux/action"
import { useEffect } from "react"

export const Details = () => {
    const params = useParams()
    let listofgame = useSelector(x => x.dataGameReducer.listGamess)
    let d = useDispatch()
    useEffect(() => {

        if (listofgame != null && listofgame.length == 0) {
            getAll().then((x) =>
                d(loadGames(x.data))
            )
             .catch((err) => console.log(err));
        }
    }, [])
    const selectedGame = listofgame.find((g) => g.name === params.name);
    return<>
     <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card h-100 shadow-lg border-0">
                        <img
                            src={`http://localhost:8080/${selectedGame.image}`}
                            alt=""
                            style={{ height: '300px', objectFit: 'cover' }}
                        />
                        <div className="card-body">
                            <h5 className="card-title text-center fw-bold">{selectedGame.name}</h5>
                            <p className="card-text text-muted text-center">
                                קטגוריה: <span className="text-dark">{selectedGame.codeCategory}</span>
                            </p>
                            <p className="card-text text-muted text-center">
                                מחיר: <span className="text-dark">{selectedGame.price} ש"ח</span>
                            </p>
                            <p className="card-text text-muted text-center">
                                כמות: <span className="text-dark">{selectedGame.count}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}