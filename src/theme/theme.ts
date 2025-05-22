import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    h1: {
      fontSize: 24,
    },
    h2: {
      fontSize: 24,
    },
    h3: {
      fontSize: 22,
    },
    h4: {
      fontSize: 20,
    },
    body1: {
      fontSize: 16,
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
        '.ellipsis': {
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2 /* Limits the text to 2 lines */,
          overflow: 'hidden',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          minWidth: 190,
          borderRadius: '8px',
          // background: '#292929',
          padding: '8px',
          color: '#ffffff',
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
