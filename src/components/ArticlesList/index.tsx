'use client';

import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Badge, { badgeClasses } from '@mui/material/Badge';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Popover from '@mui/material/Popover';
import { styled as styledMui } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import styled from './styled.module.scss';

const ImageContainer = styledMui('span')(({ theme }) => ({
  position: 'relative',
  height: 120,
  width: 300,
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

export default function ArticlesList() {
  return (
    <List style={{ padding: 0 }}>
      <ListItem style={{ outline: '3px solid white', padding: 0 }}>
        <ImageContainer>
          <ImageSrc
            style={{
              backgroundImage: `url('https://www.nucleodoconhecimento.com.br/blog/wp-content/webp-express/webp-images/uploads/2021/07/Importancia-Da-Citacao-Gaficos-Tabelas-696x464.jpg.webp')`,
            }}
          />
          <ImageBackdrop className="MuiImageBackdrop-root" />
        </ImageContainer>
        <div>
          <Typography fontSize={24} variant="h4">
            Título
          </Typography>
          <div>
            <Typography fontSize={18}>Autor</Typography>
            <Typography fontSize={18}>Atualizado dia 02/02/2025</Typography>
          </div>
        </div>
      </ListItem>
    </List>
  );
}
