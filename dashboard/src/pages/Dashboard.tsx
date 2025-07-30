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
  Button,
  Chip
} from '@mui/material';
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

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Box textAlign="center">
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading dashboard...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        eBay LEGO Analyzer Dashboard
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <strong>Connection Error:</strong> {error}
          <br />
          <Typography variant="caption">
            Make sure your FastAPI server is running at http://127.0.0.1:8000/
          </Typography>
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Statistics Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Statistics
              </Typography>
              {stats ? (
                <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                  <pre style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(stats, null, 2)}
                  </pre>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No statistics available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Inventory Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Typography variant="h5" component="h2">
                  Recent Inventory
                </Typography>
                <Chip label={`${inventory.length} items`} size="small" color="primary" />
              </Box>
              
              {inventory.length > 0 ? (
                <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {inventory.slice(0, 3).map((item, index) => (
                    <Card key={index} variant="outlined" sx={{ mb: 1, p: 1 }}>
                      <pre style={{ fontSize: '11px', margin: 0, whiteSpace: 'pre-wrap' }}>
                        {JSON.stringify(item, null, 2).substring(0, 200)}...
                      </pre>
                    </Card>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No inventory items available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent LEGO Sets Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Typography variant="h5" component="h2">
                  Recent LEGO Sets
                </Typography>
                <Chip label={`${legoSets.length} sets`} size="small" color="secondary" />
              </Box>
              
              {legoSets.length > 0 ? (
                <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {legoSets.slice(0, 3).map((set, index) => (
                    <Card key={index} variant="outlined" sx={{ mb: 1, p: 1 }}>
                      <pre style={{ fontSize: '11px', margin: 0, whiteSpace: 'pre-wrap' }}>
                        {JSON.stringify(set, null, 2).substring(0, 200)}...
                      </pre>
                    </Card>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No LEGO sets available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Quick Actions
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button 
                  variant="contained" 
                  href="/inventory"
                  sx={{ minWidth: 160 }}
                >
                  View All Inventory
                </Button>
                <Button 
                  variant="contained" 
                  href="/lego-sets"
                  sx={{ minWidth: 160 }}
                >
                  Browse LEGO Sets
                </Button>
                <Button 
                  variant="contained" 
                  href="/stats"
                  sx={{ minWidth: 160 }}
                >
                  Detailed Statistics
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;