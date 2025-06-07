'use client';
import { type ReactNode } from 'react';
import { ToastContainer, Bounce } from 'react-toastify';

import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider as ThemeProviderMui } from '@mui/material/styles';

import { theme } from './theme';

import 'react-toastify/dist/ReactToastify.css';

interface IProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: IProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProviderMui theme={theme}>
        <CssBaseline />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          theme="dark"
          transition={Bounce}
        />
        {children}
      </ThemeProviderMui>
    </AppRouterCacheProvider>
  );
}
