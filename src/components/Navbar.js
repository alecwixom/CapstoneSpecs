import { useContext } from "react"
import { NavLink } from "react-router-dom"
import AuthContext from "../store/authContext"
import './navbar.css'
import workoutpng from '../icon/workouticon.png'
const Navbar = () => {
const authCtx = useContext(AuthContext)

    const styleActiveLink = ({isActive}) => {
        return{
            color: isActive ? "red" : "",
        }
    }


    return (
        <header className="navbar flex-row">
            <div className="flex-row">
                <a target="_blank" href="https://icons8.com/icon/122695/dumbbell">
                    <img className="logoicon" src={workoutpng} alt="WorkoutPng" />
                </a>
                <h3>Lift Share</h3>
            </div>
            <nav>
            {authCtx.token ? (
                <ul className="main-nav">
                    <li>
                        <NavLink style={styleActiveLink} to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={styleActiveLink} to='/Dashboard'>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={styleActiveLink} to='/Profile'>
                            Profile
                        </NavLink>
                    </li>
                    <li>
                <button className="logout-btn" onClick={() => authCtx.logout()}>
                    Logout
                </button>
            </li>
                    </ul>
                    ) : (
                    <ul className="main-nav">
                    <li>
                        <NavLink style={styleActiveLink} to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={styleActiveLink} to='/Login'>
                            Login
                        </NavLink>
                    </li>
                </ul>
            )}
            </nav>
        </header>
    )
}


export default Navbar