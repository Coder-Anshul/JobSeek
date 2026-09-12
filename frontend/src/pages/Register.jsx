import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="glass-panel" style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Account</h2>
      {error && <div style={{ color: '#f87171', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            className="form-control" 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            className="form-control" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            className="form-control" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label>I am a...</label>
          <select 
            className="form-control" 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="candidate">Job Seeker</option>
            <option value="admin">Employer / Admin</option>
          </select>
        </div>
        <button type="submit" className="btn" style={{ width: '100%' }}>Register</button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)' }}>Login</Link>
      </p>
    </div>
  );
};

export default Register;
