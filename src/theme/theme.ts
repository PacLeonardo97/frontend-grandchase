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
        '.main': {
          margin: '172px 192px 0 144px',
          background: 'white',
          position: 'relative',
          paddingBottom: '40px',
          ['@media (max-width: 800px)']: {
            margin: '172px 0 0 0',
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '8px',
          },
          // `@media (max-width: 800px) {
          //     margin: 172px 0 0 0;
          //     display: flex;
          //     flex-direction: column;
          //     padding-left: 8px;
          // }`
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
