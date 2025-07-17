import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import styled from './styled.module.scss';

export default function SubHeader() {
  const { game } = useParams<{ game: string }>();
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
    <Box
      sx={(theme) => ({
        borderTop: `1px solid ${theme.palette.grey[800]}`,
        backgroundColor: theme.palette.grey[900],
      })}
      className={styled.container}
    >
      <>
        {isSiteHome ? (
          <div className={styled.contentHome}>
            <Typography variant="h1">{t('welcome_message')}</Typography>
          </div>
        ) : (
          <div className={styled.wrapper}>
            <Image
              width={170}
              height={80}
              src={`/subheader/${game}.png`}
              alt={game}
            />
            <Link href={`/games/${game}`}>
              <Typography variant="h4">{t('home')}</Typography>
            </Link>
            <Link href={`/games/${game}/news`}>
              <Typography variant="h4">{t('news')}</Typography>
            </Link>
            <Link href={`/games/${game}/gameguides`}>
              <Typography variant="h4">{t('game_guides')}</Typography>
            </Link>
            <Link href={`/games/${game}/characterguides`}>
              <Typography variant="h4">{t('character_guides')}</Typography>
            </Link>
            {game === 'grandchase' ? (
              <Link href={`/games/${game}/buildplanner`}>
                <Typography variant="h4">{t('build_planner')}</Typography>
              </Link>
            ) : null}
          </div>
        )}
      </>
    </Box>
  );
}
