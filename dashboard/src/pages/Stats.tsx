import { useState, useEffect } from 'react';
import { 
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Box
} from '@mui/material';
import { fetchStats } from '../api';

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchStats();
        setStats(data);
      } catch (err) {
        setError('Failed to fetch statistics data');
        console.error('Stats error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Box textAlign="center">
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading statistics...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  const renderStatValue = (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
          <pre style={{ fontSize: '12px', whiteSpace: 'pre-wrap', margin: 0 }}>
            {JSON.stringify(value, null, 2)}
          </pre>
        </Box>
      );
    }
    
    return (
      <Typography variant="h4" component="div" color="primary">
        {String(value)}
      </Typography>
    );
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Statistics
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <strong>Error:</strong> {error}
          <br />
          <Typography variant="caption">
            Make sure your FastAPI server is running at http://127.0.0.1:8000/
          </Typography>
        </Alert>
      )}

      {stats ? (
        <Grid container spacing={3}>
          {Object.entries(stats).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Typography>
                  {renderStatValue(key, value)}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        !loading && (
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" textAlign="center">
                No statistics available
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
                {error ? 'Check your server connection' : 'No statistics data found'}
              </Typography>
            </CardContent>
          </Card>
        )
      )}
    </Container>
  );
};

export default Stats;