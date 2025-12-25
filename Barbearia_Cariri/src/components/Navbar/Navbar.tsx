import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ variant = "default" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // 🔹 NAVBAR SIMPLES (alteração drástica)
  if (variant === "simple") {
    return (
          <header className="navbar">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          Barbearia Castelo Branco
        </Link>
      </div>

      <nav>
        <div
          className={`mobile-menu ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>

        <ul className={`menu ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" className="btn" onClick={closeMenu}>
              Início
            </Link>
          </li>

          <li>
            <Link to="/agenda" className="btn" onClick={closeMenu}>
              Agenda
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    );
  }

  // 🔹 NAVBAR COMPLETA (padrão)
  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          Barbearia Castelo Branco
        </Link>
      </div>

      <nav>
        <div
          className={`mobile-menu ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>

        <ul className={`menu ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" className="btn" onClick={closeMenu}>
              Início
            </Link>
          </li>

          <li>
            <Link to="/agenda" className="btn" onClick={closeMenu}>
              Agenda
            </Link>
          </li>

          <li>
            <Link to="/Cadastro" className="btn" onClick={closeMenu}>
              Entrar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
