import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Fade as Hamburger } from 'hamburger-react';
import {
  LayoutDashboard,
  Calendar,
  Home as HomeIcon,
  User,
  Scissors,
  MapPin,
} from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lê diretamente do localStorage na renderização (atualizado a cada mudança de rota)
  const getUserName = (): string | null => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (!usuarioSalvo) return null;
    try {
      const u = JSON.parse(usuarioSalvo);
      return u.nome || 'Admin';
    } catch {
      return null;
    }
  };

  const userName = getUserName();

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo Nobre */}
        <div className="logo">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <div className="logo-icon-pill">
              <Scissors size={18} />
            </div>
            <div className="logo-text-box">
              <span className="logo-main">Castelo Branco</span>
              <span className="logo-sub">Barbearia • Cariri</span>
            </div>
          </Link>
        </div>

        {/* Menu Desktop e Mobile */}
        <nav>
          <div className="mobile-menu">
            <Hamburger toggled={menuOpen} toggle={setMenuOpen} size={20} color="#C9A24D" />
          </div>

          <ul className={`menu ${menuOpen ? 'active' : ''}`}>
            <li>
              <Link
                to="/"
                className={`nav-link ${location.pathname === '/' ? 'active-link' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <HomeIcon size={15} />
                <span>Início</span>
              </Link>
            </li>

            <li>
              <Link
                to="/servicos"
                className={`nav-link ${location.pathname === '/servicos' ? 'active-link' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <Scissors size={15} />
                <span>Serviços</span>
              </Link>
            </li>

            <li>
              <Link
                to="/barbeiros"
                className={`nav-link ${location.pathname === '/barbeiros' ? 'active-link' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span>Barbeiros</span>
              </Link>
            </li>

            <li>
              <Link
                to="/localizacao"
                className={`nav-link ${location.pathname === '/localizacao' ? 'active-link' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <MapPin size={15} />
                <span>Localização</span>
              </Link>
            </li>

            <li>
              <Link
                to="/agenda"
                className={`nav-link nav-link-agenda ${
                  location.pathname === '/agenda' ? 'active-link' : ''
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <Calendar size={15} />
                <span>Agendar Horário</span>
              </Link>
            </li>

            <li>
              <Link
                to="/painel"
                className={`nav-link nav-link-painel ${
                  location.pathname === '/painel' ? 'active-link' : ''
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <LayoutDashboard size={15} />
                <span>Painel</span>
              </Link>
            </li>

            <li className="nav-user-item">
              {userName ? (
                <Link
                  to="/painel"
                  className="btn-nav-user"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="nav-avatar">{userName.charAt(0).toUpperCase()}</div>
                  <span className="nav-username">{userName.split(' ')[0]}</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="btn-nav-login"
                  onClick={() => setMenuOpen(false)}
                >
                  <User size={14} />
                  <span>Área do Cliente</span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
