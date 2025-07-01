import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';

import styled from './styled.module.scss';

export default function SubHeader() {
  const pathName = usePathname();
  const [isSiteHome, setIsSiteHome] = useState(false);
  const t = useTranslations('SubHeader');

  useEffect(() => {
    if (pathName === '/') {
      setIsSiteHome(true);
    } else {
      setIsSiteHome(false);
    }
  }, [pathName]);

  return (
    <div className={styled.container}>
      <div className={styled.content}>
        {isSiteHome ? (
          <Typography variant="h1">{t('welcome_message')}</Typography>
        ) : (
          <>
            <div className={styled.menu}>
              <Link href="/grandchase">
                <Typography variant="h4">{t('home')}</Typography>
              </Link>
              <Link href="/grandchase/news">
                <Typography variant="h4">{t('news')}</Typography>
              </Link>
              <Link href="/grandchase/gameguides">
                <Typography variant="h4">{t('game_guides')}</Typography>
              </Link>
              <Link href="/grandchase/characterguides">
                <Typography variant="h4">{t('character_guides')}</Typography>
              </Link>
              <Link href="/buildplanner">
                <Typography variant="h4">{t('build_planner')}</Typography>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
