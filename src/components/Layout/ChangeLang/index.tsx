'use client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { setCookie, useGetCookie } from 'cookies-next';

import Select from '@/components/Form/Select';
import { i18n } from '@/helper/i18n-config';

enum ELabel {
  pt = '🇧🇷 Português',
  en = '🇺🇸 English',
}

const listSelect = i18n.locales.map((item) => ({
  value: item,
  label: ELabel[item],
}));

export default function LanguageSwitcher() {
  const router = useRouter();
  const getCookie = useGetCookie();
  const t = useTranslations('Header');

  function switchTo(lang: 'pt' | 'en') {
    setCookie('NEXT_LOCALE', lang);
    router.refresh(); // Recarrega com novo idioma
  }

  return (
    <div>
      <Select
        label={t('language')}
        id="select-language"
        onChange={(e) => {
          switchTo(e.target.value as 'pt' | 'en');
        }}
        value={getCookie('NEXT_LOCALE') || i18n.defaultLocale}
        list={listSelect}
      />
      {getCookie('NEXT_LOCALE') === 'pt' ? (
        <button onClick={() => switchTo('en')}></button>
      ) : (
        <button onClick={() => switchTo('pt')}></button>
      )}
    </div>
  );
}
