'use client';
import { ReactNode } from 'react';
import Drawer from './drawer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main
      style={{
        margin: '72px 192px 0px 144px',
        background: 'white',
        position: 'relative',
      }}
      // className={`max-w-screen-xl min-h-screen`}
    >
      <header
        style={{
          position: 'fixed',
          height: '72px',
          zIndex: 2,
          background: 'blue',
          top: 0,
          left: 0,
          width: '100%',
        }}
      ></header>
      <Drawer />
      <main
        style={{
          margin: '72px 192px 0px 144px',
          background: 'white',
          position: 'relative',
        }}
        // className={`max-w-screen-xl min-h-screen`}
      >
        {children}
      </main>
      <div
        className="ad_banner"
        style={{
          width: '192px',
          height: '100vh',
          background: 'grey',
          position: 'fixed',
          right: 0,
          top: '72px',
          padding: '16px',
        }}
      >
        <p style={{ color: 'red' }}>anuncio caralho</p>
      </div>
    </main>
  );
}
