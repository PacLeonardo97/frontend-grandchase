'use client';

import { styled } from '@mui/material/styles';

const Element = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

export default function SpanImage({ children }: { children: React.ReactNode }) {
  return <Element>{children}</Element>;
}
