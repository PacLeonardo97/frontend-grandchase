'use client';
import { useState } from 'react';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '.';
import setUpInterceptor from '@/api/interceptor';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [interceptorReady, setInterceptorReady] = useState(false);
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => {
          setUpInterceptor(store);
          setInterceptorReady(true);
        }}
      >
        {interceptorReady && children}
      </PersistGate>
    </Provider>
  );
}
