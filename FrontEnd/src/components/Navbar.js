import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { Logo, Search } from "../assets/svg";

function Navbar({ name }) {
  const search_icon_color = "#d7d7d7";
  const handleLogout = () => {
    console.log("localStorage is cleared");
    localStorage.clear();
  };

  return (
    <nav className="nav-container">
      <div className="nav-container-left">
        <div className="navbar-search">
          <Search color={search_icon_color} />
          <input
            type="text"
            placeholder="Search Friend"
            className="search-input"
          />
        </div>
      </div>
      <ul className="nav-container-middle">
        <li className="nav-container-middle-list">
          <NavLink to="/home">Home</NavLink>
        </li>
        <li className="nav-container-middle-list">
          <NavLink to="/sell">Sell</NavLink>
        </li>
        <li className="nav-container-middle-list">
          <NavLink to="/market">Market</NavLink>
        </li>
        <li className="nav-container-middle-list">
          <NavLink to="/viewProfile">View Profile</NavLink>
        </li>
      </ul>

      <ul className="nav-container-right">
        <li className="nav-container-right-list">User: {name.name}</li>
        <li className="nav-container-right-list">
          <NavLink to="/login" onClick={handleLogout}>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
