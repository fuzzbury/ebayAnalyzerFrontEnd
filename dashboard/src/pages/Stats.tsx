import { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { Stats as StatsType } from '../types/api';

const Stats = () => {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiService.getStats();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="loading">Loading statistics...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="page">
      <h1>Statistics</h1>
      <div className="stats-container">
        {stats && Object.entries(stats).map(([key, value]) => (
          <div key={key} className="stat-item">
            <h3>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
            <div className="stat-value">
              {typeof value === 'object' ? (
                <pre>{JSON.stringify(value, null, 2)}</pre>
              ) : (
                <span>{String(value)}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {!stats && !loading && (
        <div className="no-data">No statistics available.</div>
      )}
    </div>
  );
};

export default Stats;