import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiButton: {
      // Name of the rule
      root: {
        // Some CSS
        fontFamily: 'Ubuntu',
        borderRadius: 100,
        border: 0,
      },
    },
  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#159afb',
      dark: '#036bb7',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
