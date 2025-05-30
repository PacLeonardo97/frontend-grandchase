'use client';
import { ReactNode, useState } from 'react';

import AdBanner from './AdBanner';
import Drawer from './drawer';
import Header from './Header';
import styled from './styled.module.scss';
import SubHeader from './SubHeader';

export default function Layout({ children }: { children: ReactNode }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Header setOpenDrawer={setOpenDrawer} />
      <SubHeader />
      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />

      <main className={styled.main}>{children}</main>
      <AdBanner />
    </>
  );
}
