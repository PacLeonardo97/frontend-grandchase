'use client';

import { useEffect } from 'react';

import styled from './styled.module.scss';
import api, { isLogged } from '@/api';
import Layout from '@/components/Layout';

export default function Page() {
  useEffect(() => {
    (async () => {
      // if (isLogged) {
      const data = await api.get('/chars');
      // }
    })();
  }, []);
  return (
    <Layout>
      <h5 className={styled.bory}>BuildPlanner</h5>
    </Layout>
  );
}
