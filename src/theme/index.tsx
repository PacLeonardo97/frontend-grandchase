'use client';
import { type ReactNode } from 'react';
import { ToastContainer, Bounce } from 'react-toastify';

import { CssBaseline } from '@mui/material';
import { ThemeProvider as ThemeProviderMui } from '@mui/material/styles';

import { theme } from './theme';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
  children: ReactNode;
}

function ThemeProvider({ children }: IProps) {
  return (
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
  );
}

export default ThemeProvider;
