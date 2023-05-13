import { createTheme } from "@mui/material";
import { grey, indigo, red } from "@mui/material/colors";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: grey[100],
      secondary: grey[100],
      disabled: grey[100],
    },
    primary: {
      light: indigo[300],
      main: indigo[300],
      contrastText: grey[200],
    },
    error: {
      main: red[300],
      light: red[300],
      contrastText: grey[900],
    },
    neutral: {
      main: '#64748B',
      contrastText: grey[100],
    },
  },
})

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: grey[800],
      secondary: grey[800],
      disabled: grey[800],
    },
    primary: {
      light: indigo[500],
      main: indigo[500],
      dark: indigo[800],
      contrastText: grey[200],
    },
    error: {
      main: red[300],
      light: red[300],
      contrastText: grey[200],
    },
    neutral: {
      main: '#64748B',
      contrastText: grey[100],
    },
  },
})

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
