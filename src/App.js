import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import './App.css';
import NuzlockeTracker from './NuzlockeTracker';
import pokeball from './images/pokeball.png';

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
      <Typography variant="h4" sx={{ mb: '0.5em', display: 'flex', alignItems: 'center' }} >Pokemon Nuzlocke App<img src={pokeball} alt="" style={{
        width: '2em',
        height: '2em',
        marginLeft: '0.2em'
      }} /></Typography>
      <NuzlockeTracker />
    </Box>
  );
}

export default App;
