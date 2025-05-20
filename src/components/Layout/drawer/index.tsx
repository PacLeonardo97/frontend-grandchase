import { styled, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth as never,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  transitionDelay: `0.2s`,
  overflowX: 'hidden' as const,
  '.MuiListItemIcon-root': {},
  '.MuiListItemText-root ': {
    opacity: 1,
    transitionDelay: `0.2s`,
  },
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden' as const,
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  '.MuiListItemIcon-root': {},
  '.MuiListItemText-root ': {
    opacity: 0,
  },
});

interface DrawerProps {
  open: boolean;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme, open }) => ({
  height: `100%`,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open
    ? {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
        '.toggle-button': {
          opacity: 1,
          transitionDelay: `0.2s`,
        },
        '+ .toggle-button': {
          opacity: 0,
          '&:not([open]):active': {
            pointerEvents: `none`,
          },
        },
      }
    : {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
        '.toggle-button': { opacity: 0 },
        '+ .toggle-button': { opacity: 1 },
        '&:hover ': {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
          '.toggle-button': {
            opacity: 1,
            left: drawerWidth,
            transitionDelay: `0.2s`,
            svg: {
              transform: `rotate(180deg)`,
            },
          },
          '+ .toggle-button': {
            opacity: 0,
          },
        },
      }),
}));

export default function MiniDrawer() {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <CssBaseline />
      <Box>
        <Drawer variant="permanent" open={false}>
          <Toolbar />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: 'center',
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </Box>
  );
}
