import "./Navbar.css";

function Navbar(){

    return(
        <nav className = "nav-container">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/">Matches</a></li>
                <li><a href="/">Event</a></li>
                <li><a href="/">Ranking</a></li>
                <li><input type="text" placeholder="Search"/></li>
            </ul>
        </nav>
    );
}
export default Navbar;