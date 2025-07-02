import { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Raleway } from 'next/font/google';
import { type ReactNode } from 'react';

import Layout from '@/components/Layout';
import { locales } from '@/i18n/config';
import Providers from '@/providers';

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

export const generateMetadata = (): Metadata => {
  return {
    title: 'Wiki Minmaxed',
    description: 'Wiki para jogos',
    other: {
      'google-adsense-account': 'ca-pub-2641808103356301',
    },
  };
};

export default function RootLayout({ children }: Readonly<IProps>) {
  const messages = useMessages(); // Mensagens carregadas automaticamente pelo next-intl

  return (
    <html lang="pt">
      <body className={`${raleway.variable}`}>
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
