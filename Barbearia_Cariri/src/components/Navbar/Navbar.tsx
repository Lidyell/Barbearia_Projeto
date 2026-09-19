import { useState } from "react";
import { Link } from "react-router-dom";
import { Fade as Hamburger } from "hamburger-react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Barbearia Castelo Branco
        </Link>
      </div>

      <nav>
        <div className="mobile-menu">
          <Hamburger
            toggled={menuOpen}
            toggle={setMenuOpen}
          />
        </div>

        <ul className={`menu ${menuOpen ? "active" : ""}`}>
          <li>
            <Link
              to="/"
              className="btn"
              onClick={() => setMenuOpen(false)}
            >
              Início
            </Link>
          </li>

          <li>
            <Link
              to="/agenda"
              className="btn"
              onClick={() => setMenuOpen(false)}
            >
              Agenda
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;