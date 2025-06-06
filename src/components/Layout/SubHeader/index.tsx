import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';

import styled from './styled.module.scss';

export default function SubHeader() {
  const pathName = usePathname();
  const [isSiteHome, setIsSiteHome] = useState(false);

  useEffect(() => {
    if (pathName === '/') {
      setIsSiteHome(true);
    }
  }, [pathName]);

  return (
    <div className={styled.container}>
      <div className={styled.content}>
        {isSiteHome ? (
          <Typography variant="h1">Bem vindo ao MinMaxed!</Typography>
        ) : (
          <>
            <div className={styled.menu}>
              <Link href="/grandchase">
                <Typography variant="h4">Home</Typography>
              </Link>
              <Link href="/grandchase/guides">
                <Typography variant="h4">Guias Jogo</Typography>
              </Link>
              <Link href="/grandchase/guides">
                <Typography variant="h4">Guias Personagens</Typography>
              </Link>
              <Link href="/buildplanner">
                <Typography variant="h4">Build Planner</Typography>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
