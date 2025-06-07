'use client';

import type { ReactNode } from 'react';

import ProviderTanStack from './tanstack';
import ThemeProvider from '@/theme';

interface IProps {
  children: ReactNode;
}

export default function Providers({ children }: IProps) {
  return (
    <ProviderTanStack>
      <ThemeProvider>{children}</ThemeProvider>
    </ProviderTanStack>
  );
}
