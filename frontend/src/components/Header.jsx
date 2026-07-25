import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { useState } from 'react';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    authService.logout();
    onLogout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          💅 Salon Beyoutiful
        </Link>

        <nav className="hidden md:flex gap-6">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-pink-200 transition">
                Dashboard
              </Link>
              <Link to="/book-appointment" className="hover:text-pink-200 transition">
                Reservar Cita
              </Link>
              <Link to="/my-appointments" className="hover:text-pink-200 transition">
                Mis Citas
              </Link>
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="hover:text-pink-200 transition"
                >
                  {user.name} ▼
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-pink-200 transition">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="bg-white text-pink-500 px-4 py-2 rounded hover:bg-pink-100 transition">
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
