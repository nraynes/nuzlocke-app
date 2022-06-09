import logo from './logo.svg';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import './App.css';
import NuzlockeTracker from './NuzlockeTracker';

function App() {
  return (
    <Box
      id="App"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: ['max-content', '100vh']
      }}
    >
      <Typography variant="h4" sx={{ mb: '0.5em' }} >Pokemon Nuzlock App</Typography>
      <NuzlockeTracker />
    </Box>
  );
}

export default App;
