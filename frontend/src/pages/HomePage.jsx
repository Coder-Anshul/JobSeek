import { useState, useEffect } from 'react';
import OpportunityCard from '../components/OpportunityCard';
import SearchFilter from '../components/SearchFilter';
import { getOpportunities } from '../services/api';

const HomePage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const data = await getOpportunities(search, domain);
      setOpportunities(data);
    } catch (err) {
      setError('Failed to fetch opportunities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Initial load only, require button click for search later

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Find Your Next Opportunity</h2>
      <SearchFilter
        search={search}
        setSearch={setSearch}
        domain={domain}
        setDomain={setDomain}
        onSearch={fetchOpportunities}
      />
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : opportunities.length === 0 ? (
        <p>No opportunities found.</p>
      ) : (
        <div className="opportunities-grid">
          {opportunities.map((opp) => (
            <OpportunityCard key={opp._id} opportunity={opp} isAdmin={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
