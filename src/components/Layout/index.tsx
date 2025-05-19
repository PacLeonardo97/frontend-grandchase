'use client';
import { ReactNode } from 'react';
import Drawer from '../drawer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Drawer />
      {children}
    </>
  );
}
