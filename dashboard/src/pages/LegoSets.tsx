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
  TextField,
  Chip
} from '@mui/material';
import { fetchLegoSets } from '../api';

const LegoSets = () => {
  const [legoSets, setLegoSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(100);

  useEffect(() => {
    const loadLegoSets = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchLegoSets(limit);
        setLegoSets(data);
      } catch (err) {
        setError('Failed to fetch LEGO sets data');
        console.error('LEGO Sets error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadLegoSets();
  }, [limit]);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Box textAlign="center">
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading LEGO sets...
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
          LEGO Sets
        </Typography>
        <Chip label={`${legoSets.length} sets`} color="secondary" />
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
              <TextField
                fullWidth
                label="Limit"
                type="number"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value) || 100)}
                inputProps={{ min: 1, max: 1000 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {legoSets.length > 0 ? (
          legoSets.map((set, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Set #{index + 1}
                  </Typography>
                  <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                    <pre style={{ fontSize: '11px', whiteSpace: 'pre-wrap', margin: 0 }}>
                      {JSON.stringify(set, null, 2)}
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
                  No LEGO sets found
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
                  {error ? 'Check your server connection' : 'No LEGO sets available'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default LegoSets;