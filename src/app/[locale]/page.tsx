'use client';
import ButtonBase from '@mui/material/ButtonBase';
import { styled as styledMui } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import styled from './styled.module.scss';
import ArticlesList from '@/components/ArticlesList';

const images = [
  {
    id: 1,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Melhores métodos para farmar nível Chaser',
  },
  {
    id: 2,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Guia de raids Void',
  },
  {
    id: 3,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Guia de classes do Nightreing',
  },
  {
    id: 4,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Melhores armas para cada classe',
  },
  {
    id: 5,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Melhores armas para cada classe',
  },
  {
    id: 6,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Melhores armas para cada classe',
  },
];

// TODO: criar pasta components para colocar esses componentes
const ImageButton = styledMui(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
  },
}));

const ImageSrc = styledMui('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const SpanImage = styledMui('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styledMui('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

export default function App() {
  return (
    <>
      <div className={styled.container}>
        <Typography variant="h3">Notícias mais recentes</Typography>

        <div className={styled.articlesContainer}>
          {images.map((image) => (
            <ImageButton key={image.id}>
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <SpanImage>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                >
                  {image.title}
                </Typography>
              </SpanImage>
            </ImageButton>
          ))}
        </div>

        <Typography marginTop={2} marginBottom={1} variant="h3">
          Guias mais recentes
        </Typography>
        <ArticlesList />
      </div>
    </>
  );
}
