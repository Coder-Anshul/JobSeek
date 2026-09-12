import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createOpportunity, getOpportunityById, updateOpportunity } from '../services/api';

const ManageOpportunity = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    domain: 'Software Engineering',
    location: '',
    experience: '',
    description: '',
    applicationLink: '',
  });
  
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      const fetchOpportunity = async () => {
        try {
          const data = await getOpportunityById(id);
          setFormData({
            title: data.title,
            company: data.company,
            domain: data.domain,
            location: data.location,
            experience: data.experience,
            description: data.description,
            applicationLink: data.applicationLink || '',
          });
        } catch (error) {
          alert('Failed to fetch opportunity');
          navigate('/admin');
        } finally {
          setLoading(false);
        }
      };
      fetchOpportunity();
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateOpportunity(id, formData);
      } else {
        await createOpportunity(formData);
      }
      navigate('/admin');
    } catch (error) {
      alert('Failed to save opportunity');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem' }}>
        {isEditing ? 'Edit Opportunity' : 'Add New Opportunity'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Job Title</label>
            <input type="text" name="title" className="form-control" required value={formData.title} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input type="text" name="company" className="form-control" required value={formData.company} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Domain</label>
            <select name="domain" className="form-control" required value={formData.domain} onChange={handleChange}>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Data Science">Data Science</option>
              <option value="Product Management">Product Management</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" className="form-control" required value={formData.location} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Experience Required</label>
            <input type="text" name="experience" className="form-control" required placeholder="e.g. 0-2 years, Internship" value={formData.experience} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Application Link (Optional)</label>
            <input type="url" name="applicationLink" className="form-control" value={formData.applicationLink} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            name="description" 
            className="form-control" 
            rows="6" 
            required 
            value={formData.description} 
            onChange={handleChange}
          ></textarea>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn" style={{ flex: 1 }}>
            {isEditing ? 'Update Opportunity' : 'Create Opportunity'}
          </button>
          <button type="button" className="btn btn-danger" onClick={() => navigate('/admin')} style={{ flex: 1 }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageOpportunity;
