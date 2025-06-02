import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Raleway } from 'next/font/google';
import { type ReactNode } from 'react';

import Layout from '@/components/Layout';
import { locales } from '@/i18n/config';
import ProviderTanStack from '@/providers/tanstack';
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
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <ProviderTanStack>
              <Layout />
              <main className="main">{children}</main>
            </ProviderTanStack>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
