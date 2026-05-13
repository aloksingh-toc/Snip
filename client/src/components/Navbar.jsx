import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-blue-600 tracking-tight">
          ✂️ Snip
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-gray-600 hover:text-blue-600 font-medium hidden sm:block">
                Dashboard
              </Link>
              <span className="text-sm text-gray-400 hidden sm:block">|</span>
              <span className="text-sm text-gray-500 hidden sm:block">Hi, {user.name}</span>
              <button onClick={handleLogout} className="btn-secondary text-sm py-1.5">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary text-sm py-1.5">Login</Link>
              <Link to="/register" className="btn-primary text-sm py-1.5">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
