import { Link } from 'react-router-dom';

const OpportunityCard = ({ opportunity, isAdmin, onDelete }) => {
  return (
    <div className="card">
      <h3>{opportunity.title}</h3>
      <div className="company">{opportunity.company}</div>
      <div className="tags">
        <span className="tag">{opportunity.domain}</span>
        <span className="tag">{opportunity.location}</span>
        <span className="tag">{opportunity.experience}</span>
      </div>
      
      <div className="card-actions">
        <Link to={`/opportunity/${opportunity._id}`} className="btn">
          View Details
        </Link>
        {isAdmin && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to={`/admin/edit/${opportunity._id}`} className="btn" style={{ background: '#3b82f6' }}>
              Edit
            </Link>
            <button onClick={() => onDelete(opportunity._id)} className="btn btn-danger">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunityCard;
