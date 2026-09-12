import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OpportunityCard from '../components/OpportunityCard';
import { getOpportunities, deleteOpportunity, getApplications } from '../services/api';

const AdminDashboard = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('opportunities');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const oppData = await getOpportunities();
      setOpportunities(oppData);
      
      const appData = await getApplications();
      setApplications(appData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this opportunity?')) {
      try {
        await deleteOpportunity(id);
        fetchData(); // Refresh list
      } catch (error) {
        alert('Failed to delete opportunity');
      }
    }
  };

  if (loading) return <p>Loading admin data...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Admin Dashboard</h2>
        <Link to="/admin/add" className="btn">
          + Add New Opportunity
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          className={`btn ${activeTab === 'opportunities' ? '' : 'btn-danger'}`}
          style={{ background: activeTab === 'opportunities' ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)' }}
          onClick={() => setActiveTab('opportunities')}
        >
          Manage Opportunities
        </button>
        <button 
          className={`btn ${activeTab === 'applications' ? '' : 'btn-danger'}`}
          style={{ background: activeTab === 'applications' ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)' }}
          onClick={() => setActiveTab('applications')}
        >
          View Applications
        </button>
      </div>

      {activeTab === 'opportunities' ? (
        <div className="opportunities-grid">
          {opportunities.map(opp => (
            <OpportunityCard 
              key={opp._id} 
              opportunity={opp} 
              isAdmin={true} 
              onDelete={handleDelete} 
            />
          ))}
          {opportunities.length === 0 && <p>No opportunities found.</p>}
        </div>
      ) : (
        <div className="glass-panel" style={{ overflowX: 'auto' }}>
          <h3>Submitted Applications</h3>
          {applications.length === 0 ? (
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>No applications received yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Applicant Name</th>
                  <th>Email Address</th>
                  <th>Opportunity</th>
                  <th>Date Applied</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app._id}>
                    <td>{app.applicantName}</td>
                    <td>{app.applicantEmail}</td>
                    <td>
                      {app.opportunityId ? app.opportunityId.title : 'Deleted Opportunity'}
                    </td>
                    <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
