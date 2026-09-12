import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>
        <Link to="/">JobSeek Portal</Link>
      </h1>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/">Home</Link>
        {user ? (
          <>
            {user.role === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
            <span style={{ color: 'var(--text-muted)' }}>Welcome, {user.name}</span>
            <button onClick={handleLogout} className="btn" style={{ padding: '0.25rem 1rem' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn" style={{ padding: '0.25rem 1rem' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
