'use client';

import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';

const Element = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
  },
}));

export default function ImageButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Element>{children}</Element>;
}
