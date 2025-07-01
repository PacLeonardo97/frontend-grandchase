import Typography from '@mui/material/Typography';

import ImageBackdrop from './grandchase/_components/ImageBackdrop';
import ImageButton from './grandchase/_components/ImageButton';
import ImageSrc from './grandchase/_components/ImageSrc';
import SpanImage from './grandchase/_components/SpanImage';
import styled from './styled.module.scss';
import ArticlesList from '@/components/ArticlesList';
import { IArticle } from '@/interface/article';

interface PageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  console.log(params);

  const locale = (await params).locale === 'pt' ? 'pt-BR' : 'en';

  let response = await fetch(
    `${process.env.NEXT_BASEURL_BACKEND}/articles?locale=${locale}&type=news&page=1&per_page=6`,
    {
      // cache: 'force-cache',
      // next: { revalidate },
    },
  );
  const news = await response.json();

  response = await fetch(
    `${process.env.NEXT_BASEURL_BACKEND}/articles?locale=${locale}&type=game_guide&page=1&per_page=10`,
    {
      // cache: 'force-cache',
      // next: { revalidate },
    },
  );

  const guides = await response.json();

  return (
    <>
      <div className={styled.container}>
        <Typography variant="h3">Notícias mais recentes</Typography>

        <div className={styled.articlesContainer}>
          {news.data.map((article: IArticle) => (
            <ImageButton key={article.id}>
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
            </ImageButton>
          ))}
        </div>

        <Typography marginTop={2} marginBottom={1} variant="h3">
          Guias mais recentes
        </Typography>
        <ArticlesList content={guides.data} />
      </div>
    </>
  );
}
