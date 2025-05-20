'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';

import { store, AppStore } from '.';
import setUpInterceptor from '@/api/interceptor';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = store;
  }

  setUpInterceptor(storeRef.current);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
