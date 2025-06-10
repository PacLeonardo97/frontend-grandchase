'use client';

import Link from 'next/link';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled as styledMui } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import styled from './styled.module.scss';

type ArticleProps = {
  category: string | null;
};

const ImageContainer = styledMui('span')({
  position: 'relative',
  height: 120,
  width: 300,
  borderRadius: '4px 0 0 4px',
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
  },
});

const ImageSrc = styledMui('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  borderRadius: '4px 0 0 4px',
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const ImageBackdrop = styledMui('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  borderRadius: '4px 0 0 4px',
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

export default function ArticlesList(props: ArticleProps) {
  console.log(`Articles category: ${props.category}`);

  return (
    <List style={{ padding: 0 }}>
      <Link href="grandchase/guides">
        <ListItem
          alignItems="flex-start"
          sx={{
            outline: '3px solid white',
            borderRadius: 1,
            padding: 0,
            '&:hover': {
              outlineColor: 'red!important',
              transition: 'outline-color 0.4s',
            },
            '&:hover .MuiImageBackdrop-root': {
              opacity: 0.15,
            },
          }}
        >
          <ImageContainer>
            <ImageSrc
              style={{
                backgroundImage: `url('https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp')`,
              }}
            />
            <ImageBackdrop className="MuiImageBackdrop-root" />
          </ImageContainer>
          <div className={styled.authorContainer}>
            <Typography variant="h4">Como virar o Bory em 1 dia</Typography>
            <Typography variant="body1" className="ellipsis">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              volutpat pharetra molestie. Maecenas rhoncus posuere dui. Donec
              efficitur, odio vel dictum pellentesque, diam felis ornare enim,
              et posuere purus odio in mi. Praesent consectetur consequat dolor,
              ut suscipit purus pellentesque a. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Curabitur volutpat pharetra molestie.
              Maecenas rhoncus posuere dui. Donec efficitur, odio vel dictum
              pellentesque, diam felis ornare enim, et posuere purus odio in mi.
              Praesent consectetur consequat dolor, ut suscipit purus
              pellentesque a. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Curabitur volutpat pharetra molestie. Maecenas rhoncus
              posuere dui. Donec efficitur, odio vel dictum pellentesque, diam
              felis ornare enim, et posuere purus odio in mi. Praesent
              consectetur consequat dolor, ut suscipit purus pellentesque a.
            </Typography>
            <div>
              <Typography variant="body2">
                Autor: <span>Andrew Las Casas</span>
              </Typography>
              <Typography variant="body2">Atualizado dia 02/02/2025</Typography>
            </div>
          </div>
        </ListItem>
      </Link>
    </List>
  );
}
