import api from '.';
import type { AppStore } from '@/store';

async function fetchRefreshToken() {
  try {
    const req = await api.post<{ accessToken: string; refreshToken: string }>(
      '/users-permissions/refresh_token',
      {
        refreshToken: localStorage.getItem('@GC/refresh_token'),
      },
    );
    localStorage.setItem('@GC/access_token', req.data.accessToken);
    localStorage.setItem('@GC/refresh_token', req.data.refreshToken);
    return req.data.accessToken;
  } catch {
    localStorage.removeItem('@GC/access_token');
    localStorage.removeItem('@GC/refresh_token');
    window.location.href = '/login';
  }
}

export default function setUpInterceptor(store: AppStore) {
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

  api.interceptors.request.use((req) => {
    const state = store.getState();
    const token =
      state.user.accessToken || localStorage.getItem('@GC/refresh_token');

    if (token && !req.url?.endsWith('/api/auth/local')) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });
}
