import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOpportunityById, submitApplication } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const OpportunityDetail = () => {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form state
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const data = await getOpportunityById(id);
        setOpportunity(data);
      } catch (err) {
        setError('Failed to fetch details');
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunity();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitStatus('Submitting...');
      await submitApplication({
        opportunityId: id,
        applicantName,
        applicantEmail
      });
      setSubmitStatus('Application submitted successfully!');
      setApplicantName('');
      setApplicantEmail('');
    } catch (err) {
      setSubmitStatus('Failed to submit application. Try again.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!opportunity) return <p>Opportunity not found.</p>;

  return (
    <div className="detail-container">
      <div className="glass-panel">
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{opportunity.title}</h2>
        <h3 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>{opportunity.company}</h3>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <span className="tag">📍 {opportunity.location}</span>
          <span className="tag">💼 {opportunity.experience}</span>
          <span className="tag">🌐 {opportunity.domain}</span>
        </div>
        
        <h4>Description</h4>
        <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-line', color: 'var(--text-muted)' }}>
          {opportunity.description}
        </p>
        
        {opportunity.applicationLink && (
          <div style={{ marginTop: '2rem' }}>
            <a href={opportunity.applicationLink} target="_blank" rel="noreferrer" className="btn">
              Apply on Company Site
            </a>
          </div>
        )}
      </div>

      <div className="glass-panel" style={{ height: 'fit-content' }}>
        <h3>Apply Now</h3>
        
        {!user ? (
          <div style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
            <p style={{ marginBottom: '1rem' }}>You must be logged in to apply.</p>
            <Link to="/login" className="btn">Log In to Apply</Link>
          </div>
        ) : user.role === 'admin' ? (
          <div style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
            <p>Admins cannot apply for opportunities.</p>
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', marginTop: '0.5rem' }}>Submit your application below.</p>
            
            {submitStatus && (
              <div style={{ 
                padding: '1rem', 
                marginBottom: '1rem', 
                borderRadius: '8px',
                background: submitStatus.includes('success') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: submitStatus.includes('success') ? '#34d399' : '#f87171'
              }}>
                {submitStatus}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required 
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  required 
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn" style={{ width: '100%' }}>Submit Application</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default OpportunityDetail;
