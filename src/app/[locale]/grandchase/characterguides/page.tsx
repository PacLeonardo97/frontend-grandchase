import Link from 'next/link';

import Typography from '@mui/material/Typography';

import ImageBackdrop from '../_components/ImageBackdrop';
import ImageButton from '../_components/ImageButton';
import ImageSrc from '../_components/ImageSrc';
import SpanImage from '../_components/SpanImage';
import styled from './styled.module.scss';
import { IArticle } from '@/interface/article';

interface PageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

// const revalidate = 60 * 60 * 2; // 2 days

export default async function Page({ params }: PageProps) {
  console.log(params);

  const locale = (await params).locale === 'pt' ? 'pt-BR' : 'en';

  const response = await fetch(
    `${process.env.NEXT_BASEURL_BACKEND}/articles?category=Grand Chase Classic&type=character_guide&locale=${locale}`,
    {
      // cache: 'force-cache',
      // next: { revalidate },
    },
  );
  const articles = await response.json();

  console.log(articles);

  return (
    <div className={styled.container}>
      <Typography variant="h3">Guias Personagens</Typography>

      <div className={styled.mainArticlesContainer}>
        {articles.map((article: IArticle) => (
          <ImageButton key={article.id}>
            <Link href={`/grandchase/characterguides/${article.documentId}`}>
              <ImageSrc
                url={`/char/${article.title}_class_5.webp`}
                backgroundPositionType="character"
              />
              <ImageBackdrop />
              <SpanImage>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                >
                  {article.title}
                </Typography>
              </SpanImage>
            </Link>
          </ImageButton>
        ))}
      </div>
    </div>
  );
}
