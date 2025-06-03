'use client';
import api from '.';
import type { IUserState } from '@/interface/user';
import { QueryClient } from '@tanstack/react-query';
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function setUpInterceptor(queryClient: QueryClient) {
  let isAlreadyFetchingToken = false;

  let subscribers: any[] = [];

  const onAccessTokenFetched = (access_token: string) => {
    subscribers = subscribers.filter((callback) => callback(access_token));
  };

  const addSubscriber = (callback: (e: string) => void) => {
    subscribers.push(callback);
  };

  api.interceptors.response.use(
    (response) => response,
    async (err) => {
      const originalRequest = err.config;

      if (
        err?.response?.status === 401 &&
        err.response.data.message === 'Unauthorized' &&
        originalRequest.url !== '/users-permissions/refresh_token'
      ) {
        if (!isAlreadyFetchingToken) {
          isAlreadyFetchingToken = true;
          try {
            const token = await fetchRefreshToken();
            onAccessTokenFetched(token as string);
            if (originalRequest) {
              originalRequest.headers.token = token;
            }
            subscribers = [];
            return await api.request(originalRequest);
          } finally {
            isAlreadyFetchingToken = false;
          }
        }

        const retryOriginalRequest = await new Promise((resolve) => {
          addSubscriber((token) => {
            if (originalRequest) {
              originalRequest.headers.token = token;
            }
            resolve(api.request(originalRequest));
          });
        });

        subscribers = [];
        return await retryOriginalRequest;
      }

      return Promise.reject(err);
    },
  );
  const user = queryClient.getQueryData<IUserState>(['user']);

  api.interceptors.request.use((req) => {
    const token = user?.accessToken;
    if (token && !req.url?.endsWith('/api/auth/local')) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    const urlWithParams = req.url?.includes('?');
    const cookieLocale = Cookies.get('NEXT_LOCALE');

    const withLocale = `locale=${
      EParams[cookieLocale as keyof typeof cookieLocale]
    }`;

    if (!urlWithParams) req.url = `${req.url}?${withLocale}`;
    else req.url = `${req.url}&${withLocale}`;

    return req;
  });

  async function fetchRefreshToken() {
    if (!user?.refreshToken) throw new Error('Not have refreshToken');
    try {
      const req = await api.post<{ accessToken: string; refreshToken: string }>(
        '/users-permissions/refresh_token',
        {
          refreshToken: user?.refreshToken,
        },
      );

      const newTokens = {
        ...user,
        accessToken: req.data.accessToken,
        refreshToken: req.data.refreshToken,
      };

      queryClient.setQueryData(['user'], newTokens);

      return req.data.accessToken;
    } catch {
      queryClient.clear();
      window.location.href = '/auth/login';
    }
  }
}
