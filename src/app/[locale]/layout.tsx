import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Raleway } from 'next/font/google';
import { type ReactNode } from 'react';

import { locales } from '@/i18n/config';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import '../globals.css';
import { routing } from '@/i18n/routing';

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
      <body className={`${raleway.variable}`}>
        <AppRouterCacheProvider>
          <NextIntlClientProvider>
            <header
              style={{
                position: 'fixed',
                height: '72px',
                background: 'blue',
                top: 0,
                left: 0,
                width: '100%',
              }}
            ></header>
            <main
              style={{
                margin: '72px 192px 0px 144px',
                background: 'white',
                position: 'relative',
              }}
              // className={`max-w-screen-xl min-h-screen`}
            >
              {children}
              <div
                className="ad_banner"
                style={{
                  width: '192px',
                  height: '100vh',
                  background: 'grey',
                  position: 'fixed',
                  right: 0,
                  top: '72px',
                  padding: '16px',
                }}
              >
                <p style={{ color: 'red' }}>anuncio caralho</p>
              </div>
            </main>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
