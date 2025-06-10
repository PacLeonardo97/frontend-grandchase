import Link from 'next/link';

import Typography from '@mui/material/Typography';

import ImageBackdrop from './_components/ImageBackdrop';
import ImageButton from './_components/ImageButton';
import ImageSrc from './_components/ImageSrc';
import SpanImage from './_components/SpanImage';
import styled from './styled.module.scss';
import ArticlesList from '@/components/ArticlesList';
import { IArticle } from '@/interface/article';

const images = [
  {
    id: 1,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Patch 28/05/2025',
  },
  {
    id: 2,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Eventos de junho',
  },
  {
    id: 3,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Novo sistema de loadouts',
  },
  {
    id: 4,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Bory chega no GC',
  },
  {
    id: 5,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Ataque DDoS e recompensas',
  },
  {
    id: 6,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Próximos SR',
  },
];
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
    `${process.env.NEXT_BASEURL_BACKEND}/articles?category=Grand Chase Classic&type=news&locale=${locale}`,
    {
      // cache: 'force-cache',
      // next: { revalidate },
    },
  );
  const news = await response.json();

  // response = await fetch(
  //   `${process.env.NEXT_BASEURL_BACKEND}/articles?category=Grand Chase Classic&type=game_guides&locale=${locale}`,
  //   {
  //     // cache: 'force-cache',
  //     // next: { revalidate },
  //   },
  // );
  // const guides = await response.json();

  console.log(news);
  return (
    <div className={styled.container}>
      <Typography variant="h3">Notícias mais recentes</Typography>

      <div className={styled.articlesContainer}>
        {news.map((article: IArticle) => (
          <ImageButton key={article.id}>
            <Link href={`/grandchase/gameguides/${article.documentId}`}>
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
      <ArticlesList category="Grand Chase Classic" />
    </div>
  );
}
