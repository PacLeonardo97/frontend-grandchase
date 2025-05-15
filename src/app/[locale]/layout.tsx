import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Raleway } from 'next/font/google';
import { type ReactNode } from 'react';

import { host, locales } from '@/config';

import '../globals.css';

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

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Grand Chase',
    icons: {
      icon: '/favicon.ico',
    },
    description: 'Site Grand Chase',
    metadataBase: new URL(host),
    alternates: {
      canonical: '/',
      languages: {
        pt: '/pt',
        en: '/en',
      },
    },
  };
}

export default async function RootLayout({ children }: Readonly<IProps>) {
  // const messages = await getMessages();

  return (
    <html lang="pt-br">
      <body className={`${raleway.variable}`}>
        {/* <NextIntlClientProvider messages={messages}> */}
        <main className={`max-w-screen-xl min-h-screen `}>{children}</main>
        {/* </NextIntlClientProvider> */}
      </body>
    </html>
  );
}
