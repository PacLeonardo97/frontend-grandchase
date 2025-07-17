import Link from 'next/link';

import Typography from '@mui/material/Typography';

import ImageBackdrop from '../_components/ImageBackdrop';
import ImageButton from '../_components/ImageButton';
import ImageSrc from '../_components/ImageSrc';
import SpanImage from '../_components/SpanImage';
import styled from './styled.module.scss';
import { getGameCategory } from '@/helper/slugMap';
import { IArticle } from '@/interface/article';

interface PageProps {
  params: Promise<{
    game: string;
    locale: string;
  }>;
}

export function generateStaticParams() {
  return [
    { game: 'grandchase', locale: 'en' },
    { game: 'grandchase', locale: 'pt' },
    { game: 'nightreign', locale: 'en' },
    { game: 'nightreign', locale: 'pt' },
  ];
}

// const revalidate = 60 * 60 * 2; // 2 days

export default async function Page({ params }: PageProps) {
  const param = await params;
  const locale = param.locale === 'pt' ? 'pt-BR' : 'en';
  const game = param.game;
  const category = getGameCategory(game);

  const response = await fetch(
    `${process.env.NEXT_BASEURL_BACKEND}/articles?category=${category}&type=news&locale=${locale}&page=1&per_page=10`,
    {
      // cache: 'force-cache',
      // next: { revalidate },
    },
  );
  const news = await response.json();

  return (
    <div className={styled.container}>
      <Typography variant="h3">Notícias</Typography>

      <div className={styled.mainArticlesContainer}>
        {news.data.map((article: IArticle) => (
          <ImageButton key={article.id}>
            <Link href={`/games/${game}/news/${article.documentId}`}>
              <ImageSrc
                url={article.cover}
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
