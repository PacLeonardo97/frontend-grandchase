'use client';
import { ReactNode } from 'react';

import AdBanner from '../AdBanner';
import Drawer from './drawer';
import Header from './Header';
import SubHeader from './SubHeader';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <SubHeader />
      <Drawer />

      <main
        style={{
          margin: '0 192px 0 144px', // espaço lateral pro drawer e banner
          background: 'white',
          position: 'relative',
        }}
      >
        {children}
      </main>
      <AdBanner />
    </>
  );
}
