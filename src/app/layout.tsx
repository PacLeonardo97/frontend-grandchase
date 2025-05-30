import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Raleway } from 'next/font/google';
import { type ReactNode } from 'react';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import Layout from '@/components/Layout';
import ToastProvider from '@/components/Toast';
import { locales } from '@/i18n/config';
import StoreProvider from '@/store/provider';
import ThemeProvider from '@/theme';

import './globals.css';

type IProps = {
  children: ReactNode;
  params: { locale: string };
};

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children }: Readonly<IProps>) {
  const messages = useMessages(); // Mensagens carregadas automaticamente pelo next-intl

  return (
    <html lang="pt">
      <body className={`${raleway.variable}`}>
        <StoreProvider>
          <AppRouterCacheProvider>
            <ThemeProvider>
              <NextIntlClientProvider messages={messages}>
                <ToastProvider>
                  <Layout>{children}</Layout>
                </ToastProvider>
              </NextIntlClientProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
