'use client';

import { useEffect } from 'react';

// import styled from './styled.module.scss';
import Layout from '@/components/Layout';
import { fetchAllChars } from '@/store/char';
import { useAppDispatch } from '@/store/hooks';

export default function Page() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      dispatch(fetchAllChars());
    })();
  }, [dispatch]);

  return (
    <Layout>
      <h5>BuildPlanner</h5>
    </Layout>
  );
}
