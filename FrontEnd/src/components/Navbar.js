import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar({ name }) {
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <nav className="nav-container">
      <ul className="list-container">
        <div className="user">User: {name.name}</div>
        <li className="list">
          <NavLink to="/home">Home</NavLink>
        </li>
        <li className="list">
          <NavLink to="/sell">Sell</NavLink>
        </li>
        <li className="list">
          <NavLink to="/market">Market</NavLink>
        </li>
        <li className="list">
          <NavLink to="/login" action={handleLogout}>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
