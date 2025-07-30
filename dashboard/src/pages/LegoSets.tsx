import { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { LegoSet } from '../types/api';

const LegoSets = () => {
  const [legoSets, setLegoSets] = useState<LegoSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    skip: 0,
    limit: 100
  });

  useEffect(() => {
    const fetchLegoSets = async () => {
      try {
        setLoading(true);
        const data = await apiService.getLegoSets(filters);
        setLegoSets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch LEGO sets');
      } finally {
        setLoading(false);
      }
    };

    fetchLegoSets();
  }, [filters]);

  const handleFilterChange = (key: keyof typeof filters, value: number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div className="loading">Loading LEGO sets...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="page">
      <h1>LEGO Sets</h1>
      
      <div className="filters">
        <label>
          Limit:
          <input 
            type="number" 
            value={filters.limit}
            onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
            min="1"
            max="1000"
          />
        </label>
      </div>

      <div className="lego-sets-grid">
        {legoSets.map((set, index) => (
          <div key={index} className="lego-set-card">
            <pre>{JSON.stringify(set, null, 2)}</pre>
          </div>
        ))}
      </div>
      
      {legoSets.length === 0 && !loading && (
        <div className="no-data">No LEGO sets found.</div>
      )}
    </div>
  );
};

export default LegoSets;