import { createTheme } from '@mui/material/styles';

// Mirrors the CSS custom properties in src/styles/tokens.css so MUI
// components (Dialog, Button, etc.) sit visually consistent with the
// hand-styled components elsewhere in the app.
const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FBF6FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3E3552',
      secondary: '#7C7191',
    },
    primary: {
      main: '#EA93B4',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#B7A6E8',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#3FA47D',
      light: '#E4F6EC',
    },
    warning: {
      main: '#D98A3F',
      light: '#FCEEDD',
    },
    info: {
      main: '#6E85E0',
      light: '#EAEDFC',
    },
    error: {
      main: '#DB6D82',
      light: '#FCEBEF',
    },
    divider: '#F0E1EC',
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    h1: { fontFamily: "'Space Grotesk', sans-serif" },
    h2: { fontFamily: "'Space Grotesk', sans-serif" },
    h3: { fontFamily: "'Space Grotesk', sans-serif" },
    h4: { fontFamily: "'Space Grotesk', sans-serif" },
    h5: { fontFamily: "'Space Grotesk', sans-serif" },
    h6: { fontFamily: "'Space Grotesk', sans-serif" },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12, boxShadow: 'none' },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 22 },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#E4CFE0',
          '&.Mui-checked': { color: '#EA93B4' },
        },
      },
    },
  },
});

export default theme;
