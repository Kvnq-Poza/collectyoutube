import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="CollectYoutube Logo" className="logo" />
      <nav>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          to="/help"
          className={location.pathname === "/help" ? "active" : ""}
        >
          Help
        </Link>
      </nav>
    </header>
  );
}

export default Header;
