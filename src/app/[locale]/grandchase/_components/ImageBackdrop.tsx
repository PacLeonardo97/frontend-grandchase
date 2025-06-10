'use client';

import { styled } from '@mui/material/styles';

const Element = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

export default function ImageBackdrop() {
  return <Element className="MuiImageBackdrop-root" />;
}
