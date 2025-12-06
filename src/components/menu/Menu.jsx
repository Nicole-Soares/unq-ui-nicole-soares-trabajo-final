import { useNavigate} from "react-router-dom"

export default function Menu(){

    const navigate = useNavigate()
    return(
        <div>
        <h1 className="menu-item" onClick={() => navigate("/")}>Home</h1>
        <h1 className="menu-item" onClick={() => navigate("/score")}>Score</h1>
        </div>
    )
}