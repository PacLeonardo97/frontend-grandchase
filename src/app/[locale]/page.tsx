import Link from 'next/link';

import Typography from '@mui/material/Typography';

import ImageBackdrop from './games/[game]/_components/ImageBackdrop';
import ImageButton from './games/[game]/_components/ImageButton';
import ImageSrc from './games/[game]/_components/ImageSrc';
import SpanImage from './games/[game]/_components/SpanImage';
import styled from './styled.module.scss';
import ArticlesList from '@/components/ArticlesList';
import ContainerArticles from '@/components/ContainerArticles';
import { allSettled } from '@/helper/promise';
import { getArticleTypeSlug, getGameSlug } from '@/helper/slugMap';
import { IArticle } from '@/interface/article';

interface PageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const locale = (await params).locale === 'pt' ? 'pt-BR' : 'en';

  const [news, guides] = await allSettled([
    fetch(
      `${process.env.NEXT_BASEURL_BACKEND}/articles?locale=${locale}&type=news&page=1&per_page=6`,
      {
        // cache: 'force-cache',
        // next: { revalidate },
      },
    ),
    fetch(
      `${process.env.NEXT_BASEURL_BACKEND}/articles?locale=${locale}&type=game_guide&type=character_guide&page=1&per_page=10&sort=updatedAt:desc`,
      {
        // cache: 'force-cache',
        // next: { revalidate },
      },
    ),
  ]);

  return (
    <ContainerArticles>
      <Typography variant="h3">Notícias mais recentes</Typography>

      <div className={styled.articlesContainer}>
        {news.data.map((article: IArticle) => (
          <ImageButton key={article.id}>
            <Link
              href={`/games/${getGameSlug(
                article.category.name,
              )}/${getArticleTypeSlug(article.type)}/${article.documentId}`}
            >
              <ImageSrc
                url={article.cover}
                backgroundPositionType={undefined}
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

      <Typography marginTop={2} marginBottom={1} variant="h3">
        Guias mais recentes
      </Typography>
      <ArticlesList content={guides.data} />
    </ContainerArticles>
  );
}
