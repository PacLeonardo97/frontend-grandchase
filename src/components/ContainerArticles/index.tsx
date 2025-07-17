'use client';

import { type ReactNode } from 'react';

import { Box } from '@mui/material';

import styled from './styled.module.scss';

export default function ContainerArticles({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Box
      className={styled.container}
      sx={(theme) => ({
        backgroundColor: `${theme.palette.grey[800]}!important`,
      })}
    >
      {children}
    </Box>
  );
}
