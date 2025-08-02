import { Link } from "react-router-dom";
import logo from "../../../assets/seznam_s_logo.svg";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
  <Link to="/" className="navbar-seznam-link">
    <span className="navbar-seznam">
      <img src={logo} alt="S" className="navbar-logo-inline" />
      eznam
    </span>
  </Link>
</nav>

  );
};

export default Navbar;
