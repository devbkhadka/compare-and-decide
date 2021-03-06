import {createMuiTheme} from '@material-ui/core/styles'

const palette = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#7a1c1c',
      // dark: will be calculated from palette.primary.main,
      contrastText: '#fffde7'
    },
    secondary: {
      // light: '#0066ff',
      main: '#0fbbff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#fffde7',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
}).palette

export default createMuiTheme({
    palette,
    overrides: {
      MuiSvgIcon: {
        root: {
          color: palette.secondary.dark
        }
      }
    },
    props: {
      MuiButton: {
        variant: 'contained',
        color: 'secondary'
      }
    }
    
  });