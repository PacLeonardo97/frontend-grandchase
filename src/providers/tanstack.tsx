'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

import { get, set, del } from 'idb-keyval';

import setUpInterceptor from '@/api/interceptor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  PersistedClient,
  Persister,
  PersistQueryClientProvider,
} from '@tanstack/react-query-persist-client';

export function createIDBPersister(
  idbValidKey: IDBValidKey = 'grand_chase_builder',
) {
  return {
    persistClient: async (client: PersistedClient) => {
      await set(idbValidKey, client);
    },
    restoreClient: async () => {
      return await get<PersistedClient>(idbValidKey);
    },
    removeClient: async () => {
      await del(idbValidKey);
    },
  } as Persister;
}

const CacheRestoredContext = createContext(false);
export const useCacheRestored = () => useContext(CacheRestoredContext);

export default function ProviderTanStack({
  children,
}: {
  children: ReactNode;
}) {
  const [isRestored, setIsRestored] = useState(false);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <CacheRestoredContext.Provider value={isRestored}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister: createIDBPersister(),
          maxAge: Infinity,
        }}
        onSuccess={async () => {
          setIsRestored(true);
          setUpInterceptor(queryClient);
        }}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </PersistQueryClientProvider>
    </CacheRestoredContext.Provider>
  );
}
