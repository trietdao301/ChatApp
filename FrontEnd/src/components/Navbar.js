import "./Navbar.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate, Link
} from "react-router-dom";

function Navbar(){

    return(
        <nav className = "nav-container">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/">Login</a></li>
                <li><Link to="/sell">Sell</Link></li>
            </ul>
        </nav>
    );
}
export default Navbar;