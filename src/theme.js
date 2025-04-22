import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#135c85', 
    },
    secondary: {
      main: '#F2A71B', 
    },
    background: {
      default: '#f7fbfd',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

//oldest theme
/*
import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
  palette: {
    primary: { main: '#135c85' },
    secondary: { main: '#F2A71B' },
    background: {
      default: '#f7fbfd',
    },
  },
  typography: {
    fontFamily: `'Kanit', sans-serif`,
  },
});
*/