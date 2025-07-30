import { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { InventoryItem } from '../types/api';

const Inventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    skip: 0,
    limit: 100,
    is_lego: null as boolean | null
  });

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const data = await apiService.getInventory(filters);
        setInventory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch inventory');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [filters]);

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div className="loading">Loading inventory...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="page">
      <h1>Inventory</h1>
      
      <div className="filters">
        <label>
          LEGO Filter:
          <select 
            value={filters.is_lego === null ? '' : String(filters.is_lego)}
            onChange={(e) => handleFilterChange('is_lego', e.target.value === '' ? null : e.target.value === 'true')}
          >
            <option value="">All Items</option>
            <option value="true">LEGO Only</option>
            <option value="false">Non-LEGO Only</option>
          </select>
        </label>
        
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

      <div className="inventory-grid">
        {inventory.map((item, index) => (
          <div key={index} className="inventory-card">
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
        ))}
      </div>
      
      {inventory.length === 0 && !loading && (
        <div className="no-data">No inventory items found.</div>
      )}
    </div>
  );
};

export default Inventory;