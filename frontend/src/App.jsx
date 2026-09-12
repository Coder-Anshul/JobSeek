import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import OpportunityDetail from './pages/OpportunityDetail';
import AdminDashboard from './pages/AdminDashboard';
import ManageOpportunity from './pages/ManageOpportunity';
import Login from './pages/Login';
import Register from './pages/Register';

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/opportunity/:id" element={<OpportunityDetail />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/add" element={<AdminRoute><ManageOpportunity /></AdminRoute>} />
            <Route path="/admin/edit/:id" element={<AdminRoute><ManageOpportunity /></AdminRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
