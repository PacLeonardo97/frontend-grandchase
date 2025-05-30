'use client';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import AdBanner from './AdBanner';
import Drawer from './drawer';
import Header from './Header';
import styled from './styled.module.scss';
import SubHeader from './SubHeader';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <SubHeader />
      <Drawer />

      <main className={styled.main}>{children}</main>
      <AdBanner />
    </>
  );
}
