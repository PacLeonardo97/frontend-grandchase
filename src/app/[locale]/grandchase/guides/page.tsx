'use client';
import Link from 'next/link';

import ButtonBase from '@mui/material/ButtonBase';
import { styled as styledMui } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import styled from './styled.module.scss';
import ArticlesList from '@/components/ArticlesList';
import Layout from '@/components/Layout';

const images = [
  {
    id: 1,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Nível Chaser',
  },
  {
    id: 2,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Chegando até o nível 85',
  },
  {
    id: 3,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Farms de XP',
  },
  {
    id: 4,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Cartas',
  },
  {
    id: 5,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Raids do Vazio',
  },
  {
    id: 6,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Eventos',
  },
  {
    id: 7,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Mundo Harrier',
  },
  {
    id: 8,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Runas',
  },
  {
    id: 9,
    url: 'https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp',
    title: 'Sistemas de Recompensas (SR)',
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
    <div className={styled.container}>
      <Typography variant="h3">Guias Jogo</Typography>

      <div className={styled.mainArticlesContainer}>
        {images.map((image) => (
          <ImageButton key={image.id}>
            <Link href="/grandchase/guides/bory">
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
            </Link>
          </ImageButton>
        ))}
      </div>
    </div>
  );
}
