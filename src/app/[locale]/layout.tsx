import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Raleway } from 'next/font/google';
import { notFound } from 'next/navigation';
import { type ReactNode } from 'react';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import ToastProvider from '@/components/Toast';
import { locales } from '@/i18n/config';
import { routing } from '@/i18n/routing';

import '../globals.css';
import ThemeProvider from '@/theme';

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

export default async function RootLayout({
  children,
  params,
}: Readonly<IProps>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang="pt-br">
      <body className={`${raleway.variable}`} style={{ overflowX: 'hidden' }}>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <NextIntlClientProvider>
              <ToastProvider>{children}</ToastProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
