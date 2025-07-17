import Image from 'next/image';
import Link from 'next/link';
import { type Dispatch, type SetStateAction } from 'react';

import { useMediaQuery } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled, Theme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

import { getGameSlug } from '@/helper/slugMap';

const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
  background: '#2b2b2b',
  color: 'white',
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
  background: '#2b2b2b',
  color: 'white',
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

const DrawerComponent = styled(MuiDrawer, {
  // shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme, open }) => {
  return {
    '& .MuiDrawer-paper': {
      backgroundColor: theme.palette.grey[900],
    },
    [theme.breakpoints.up('sm')]: {
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
    },
  };
});

interface IProps {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}

export default function Drawer({ openDrawer, setOpenDrawer }: IProps) {
  const matches = useMediaQuery('(max-width:800px)');
  return (
    <DrawerComponent
      variant={matches ? undefined : 'permanent'}
      onClose={() => setOpenDrawer(false)}
      open={openDrawer}
    >
      <Toolbar />
      <List>
        {['Grand Chase Classic'].map((game) => (
          <ListItem key={game} disablePadding sx={{ display: 'block' }}>
            <Link href={`/games/${getGameSlug(game)}`}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <Image
                  width={24}
                  height={24}
                  src={`/drawer/${getGameSlug(game)}.webp`}
                  alt={game}
                  style={{ marginRight: 8 }}
                />
                <ListItemText primary={game} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </DrawerComponent>
  );
}
