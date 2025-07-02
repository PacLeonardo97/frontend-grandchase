'use client';
import { useState } from 'react';

import AdBanner from './AdBanner';
import Drawer from './drawer';
import Header from './Header';
import SubHeader from './SubHeader';

export default function Layout() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Header setOpenDrawer={setOpenDrawer} />
      <SubHeader />
      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />

      <AdBanner />
    </>
  );
}
