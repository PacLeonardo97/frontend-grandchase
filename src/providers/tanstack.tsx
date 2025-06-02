'use client';

import { useState, type ReactNode, useEffect } from 'react';

import { get, set, del } from 'idb-keyval';

import setUpInterceptor from '@/api/interceptor';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {
  PersistedClient,
  Persister,
  persistQueryClient,
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

export default function ProviderTanStack({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [isClient, setIsClient] = useState(false);
  if (isClient) {
    setUpInterceptor(queryClient);
    persistQueryClient({
      queryClient,
      persister: createIDBPersister(),
      maxAge: Infinity,
      dehydrateOptions: {
        shouldDehydrateMutation: () => false,
      },
    });
  }
  useEffect(() => setIsClient(true), []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
