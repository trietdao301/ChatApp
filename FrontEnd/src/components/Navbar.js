import "./Navbar.css";
import { NavLink, Outlet } from "react-router-dom";

function Navbar(){

    return(
        <nav className = "nav-container">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/sell">Sell</NavLink></li>
                <li><NavLink to="/market">Market</NavLink></li>
            </ul>
        </nav>
    );
}
export default Navbar;