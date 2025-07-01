import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: `${['Roboto', 'Arial'].join(',')}!important`,
    h1: {
      fontSize: 24,
      color: 'white',
    },
    h2: {
      fontSize: 24,
      color: 'white',
    },
    h3: {
      fontSize: 22,
    },
    h4: {
      fontSize: 20,
    },
    subtitle1: {
      fontColor: '#e0e0e0',
    },
    body1: {
      fontSize: 16,
      fontColor: '#e0e0e0',
    },
    body2: {
      // '&>span': {
      //   color: 'red',
      // },
      fontSize: 12,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '.sun-editor-editable': {
          padding: '0px!important',
          background: 'none!important',
        },
        '.ellipsis': {
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2 /* Limits the text to 2 lines */,
          overflow: 'hidden',
        },
        '.raleway_18c3f832-module__1bzI6q__variable': {
          background: '	#121212',
        },
        '.main': {
          margin: '172px 192px 0 144px',
          background: '	#121212',
          position: 'relative',
          paddingBottom: '40px',
          ['@media (max-width: 800px)']: {
            margin: '172px 0 0 0',
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '8px',
            paddingRight: '8px',
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          minWidth: 190,
          borderRadius: '8px',
          padding: '8px',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderBottomWidth: '2px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:disabled': {
            cursor: 'not-allowed !important',
            pointerEvents: 'all',
          },
        },
      },
    },
  },
});
