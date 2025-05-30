'use client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';

export default function LanguageSwitcher() {
  const router = useRouter();
  const t = useTranslations('ChangeLang');

  function switchTo(lang: 'pt' | 'en') {
    Cookies.set('NEXT_LOCALE', lang);
    router.refresh(); // Recarrega com novo idioma
  }

  return (
    <div>
      <button onClick={() => switchTo('pt')}>{t('pt')}</button>
      <button onClick={() => switchTo('en')}>{t('en')}</button>
    </div>
  );
}
