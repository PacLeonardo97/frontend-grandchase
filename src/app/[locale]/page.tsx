'use client';

import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('Home');

  return <div>{t.raw('principal')}</div>;
}
