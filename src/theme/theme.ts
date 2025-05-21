import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      // styleOverrides: {
      //   '*::-webkit-scrollbar': {
      //     width: '8px',
      //     height: '8px',
      //   },
      //   '*::-webkit-scrollbar-thumb': {
      //     background: 'linear-gradient(13deg, #374151 14%,#374151 64%)',
      //     borderRadius: '10px',
      //   },
      //   '*::-webkit-scrollbar-thumb:hover': {
      //     background: 'linear-gradient(13deg, #374151 14%,#374151 64%)',
      //   },
      //   '*::-webkit-scrollbar-track': {
      //     background: 'transparent',
      //   },
      //   '*::-webkit-scrollbar-corner': {
      //     background: 'transparent',
      //   },
      // },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          minWidth: 190,
          borderRadius: '8px',
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
