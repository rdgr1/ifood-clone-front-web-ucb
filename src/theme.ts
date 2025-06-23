import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FC944C', // --orange
    },
    secondary: {
      main: '#fa7d00', // --orange-secondary
    },
    text: {
      primary: '#000000',
      secondary: '#9b9b9b',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

export default theme;