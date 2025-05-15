import { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Raleway } from 'next/font/google';
import { type ReactNode } from 'react';

import { host, locales } from '@/i18n/config';

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
        <NextIntlClientProvider>
          <main className={`max-w-screen-xl min-h-screen `}>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
