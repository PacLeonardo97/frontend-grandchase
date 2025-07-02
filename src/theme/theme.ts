import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    grey: {
      '900': '#121212', // Header, Drawer
      '800': '#1E1E1E', //
      '700': '#9D9898',
      '600': '#D9D9D9',
      '500': '#E0E0E0',
      '400': '#E8E8E8',
      '300': '#EEEEEE',
      '200': '#F2F2F2',
      '100': '#F5F5F5',
    },
  },
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
      fontSize: 12,
    },
  },

  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.grey[400],
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        '.ellipsis': {
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2 /* Limits the text to 2 lines */,
          overflow: 'hidden',
        },
        '.main': {
          margin: '172px 192px 0 0px',
          paddingLeft: theme.spacing(18),
          position: 'relative',
          paddingBottom: theme.spacing(5),
          [theme.breakpoints.down('sm')]: {
            margin: `${theme.spacing(8)} 0 0 0`,
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
          },
        },
      }),
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
    MuiSelect: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: `${theme.palette.grey[100]} !important`,
          svg: {
            color: `${theme.palette.grey[100]} !important`,
          },
        }),
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          label: {
            color: `${theme.palette.grey[100]} !important`,
          },
          input: {
            color: `${theme.palette.grey[100]} !important`,
          },
        }),
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
    MuiTabs: {
      styleOverrides: {
        indicator: ({ theme }) => ({
          background: theme.palette.grey[100],
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.Mui-selected': {
            color: `${theme.palette.grey[100]} !important`,
          },
          '&.MuiButtonBase-root': {
            color: theme.palette.grey[700],
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.grey[800], // alterar para outro
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23) ',
          },
        },
      },
    },
    MuiPopper: {},
  },
});
