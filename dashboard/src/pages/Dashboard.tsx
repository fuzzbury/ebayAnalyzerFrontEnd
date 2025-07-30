import { useState, useEffect } from 'react';
import { fetchStats, fetchInventory, fetchLegoSets } from '../api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [legoSets, setLegoSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch data from FastAPI server
        const [statsData, inventoryData, legoSetsData] = await Promise.allSettled([
          fetchStats(),
          fetchInventory(5),
          fetchLegoSets(5)
        ]);

        if (statsData.status === 'fulfilled') {
          setStats(statsData.value);
        }
        if (inventoryData.status === 'fulfilled') {
          setInventory(inventoryData.value);
        }
        if (legoSetsData.status === 'fulfilled') {
          setLegoSets(legoSetsData.value);
        }

      } catch (err) {
        setError('Failed to connect to FastAPI server');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Loading dashboard...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>eBay LEGO Analyzer Dashboard</h1>
      
      {error && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          borderRadius: '5px', 
          marginBottom: '20px' 
        }}>
          <strong>Connection Error:</strong> {error}
          <br />
          <small>Make sure your FastAPI server is running at http://127.0.0.1:8000/</small>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Statistics Card */}
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h2>Statistics</h2>
          {stats ? (
            <pre style={{ fontSize: '12px', overflow: 'auto' }}>{JSON.stringify(stats, null, 2)}</pre>
          ) : (
            <p>No statistics available</p>
          )}
        </div>

        {/* Recent Inventory Card */}
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h2>Recent Inventory ({inventory.length} items)</h2>
          {inventory.length > 0 ? (
            <div style={{ maxHeight: '200px', overflow: 'auto' }}>
              {inventory.slice(0, 3).map((item, index) => (
                <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
                  <pre style={{ fontSize: '11px', margin: 0 }}>
                    {JSON.stringify(item, null, 2).substring(0, 200)}...
                  </pre>
                </div>
              ))}
            </div>
          ) : (
            <p>No inventory items available</p>
          )}
        </div>

        {/* Recent LEGO Sets Card */}
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h2>Recent LEGO Sets ({legoSets.length} sets)</h2>
          {legoSets.length > 0 ? (
            <div style={{ maxHeight: '200px', overflow: 'auto' }}>
              {legoSets.slice(0, 3).map((set, index) => (
                <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
                  <pre style={{ fontSize: '11px', margin: 0 }}>
                    {JSON.stringify(set, null, 2).substring(0, 200)}...
                  </pre>
                </div>
              ))}
            </div>
          ) : (
            <p>No LEGO sets available</p>
          )}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <a href="/inventory" style={{ 
            padding: '10px 20px', 
            backgroundColor: '#3498db', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px' 
          }}>
            View All Inventory
          </a>
          <a href="/lego-sets" style={{ 
            padding: '10px 20px', 
            backgroundColor: '#3498db', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px' 
          }}>
            Browse LEGO Sets
          </a>
          <a href="/stats" style={{ 
            padding: '10px 20px', 
            backgroundColor: '#3498db', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px' 
          }}>
            Detailed Statistics
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;