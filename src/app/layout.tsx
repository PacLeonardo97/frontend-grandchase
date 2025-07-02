import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Raleway } from 'next/font/google';
import { type ReactNode } from 'react';

import Layout from '@/components/Layout';
import { locales } from '@/i18n/config';
import Providers from '@/providers';

import './globals.css';
import Script from 'next/script';

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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2641808103356301"
          crossOrigin="anonymous"
        ></Script>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Layout />
            <main className="main">{children}</main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
