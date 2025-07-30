import { useState, useEffect } from 'react';
import { 
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip
} from '@mui/material';
import { fetchInventory } from '../api';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    limit: 100,
    is_lego: ''
  });

  useEffect(() => {
    const loadInventory = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchInventory(filters.limit);
        setInventory(data);
      } catch (err) {
        setError('Failed to fetch inventory data');
        console.error('Inventory error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
  }, [filters]);

  const handleFilterChange = (field: string, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Box textAlign="center">
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading inventory...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Typography variant="h3" component="h1">
          Inventory
        </Typography>
        <Chip label={`${inventory.length} items`} color="primary" />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <strong>Error:</strong> {error}
          <br />
          <Typography variant="caption">
            Make sure your FastAPI server is running at http://127.0.0.1:8000/
          </Typography>
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>LEGO Filter</InputLabel>
                <Select
                  value={filters.is_lego}
                  label="LEGO Filter"
                  onChange={(e) => handleFilterChange('is_lego', e.target.value)}
                >
                  <MenuItem value="">All Items</MenuItem>
                  <MenuItem value="true">LEGO Only</MenuItem>
                  <MenuItem value="false">Non-LEGO Only</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Limit"
                type="number"
                value={filters.limit}
                onChange={(e) => handleFilterChange('limit', parseInt(e.target.value) || 100)}
                inputProps={{ min: 1, max: 1000 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {inventory.length > 0 ? (
          inventory.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Item #{index + 1}
                  </Typography>
                  <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                    <pre style={{ fontSize: '11px', whiteSpace: 'pre-wrap', margin: 0 }}>
                      {JSON.stringify(item, null, 2)}
                    </pre>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary" textAlign="center">
                  No inventory items found
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
                  {error ? 'Check your server connection' : 'Try adjusting your filters'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Inventory;