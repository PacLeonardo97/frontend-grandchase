'use client';
import { useParams } from 'next/navigation';

import ButtonBase from '@mui/material/ButtonBase';
import { styled as styledMui } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import styled from './styled.module.scss';
import ArticleRenderer from '@/components/ArticleRenderer';
import Layout from '@/components/Layout';

export default function App() {
  const params = useParams();

  return (
    <Layout>
      <div className={styled.container}>
        <ArticleRenderer content="blabla" />
      </div>
    </Layout>
  );
}
