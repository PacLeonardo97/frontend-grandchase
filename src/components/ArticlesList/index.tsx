'use client';

import Link from 'next/link';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled as styledMui } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import styled from './styled.module.scss';
import { getArticleTypeSlug, getGameSlug } from '@/helper/slugMap';
import { IArticle } from '@/interface/article';

type ArticleProps = {
  content: IArticle[];
};

const ImageContainer = styledMui('span')(({ theme }) => ({
  position: 'relative',
  height: 120,
  width: 300,
  flexShrink: 0,
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
  [theme.breakpoints.down('sm')]: {
    width: 100,
    height: 120,
    borderRadius: 4,
  },
}));

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
  return (
    <List style={{ padding: 0 }}>
      {props.content.map((article: IArticle) => (
        <Link
          href={`/games/${getGameSlug(
            article.category.name,
          )}/${getArticleTypeSlug(article.type)}/${article.documentId}`}
          key={article.id}
        >
          <ListItem
            alignItems="flex-start"
            sx={{
              outline: '3px solid #2b2b2b',
              borderRadius: 1,
              marginBottom: 2,
              padding: 0,
              '&:hover': {
                outlineColor: '#ddd!important',
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
                  backgroundImage: `url('${article.cover}')`,
                }}
              />
              <ImageBackdrop className="MuiImageBackdrop-root" />
            </ImageContainer>
            <div className={styled.authorContainer}>
              <Typography variant="h4">{article.title}</Typography>
              <Typography variant="body1" className="ellipsis">
                {article?.description}
              </Typography>
              <div>
                <Typography variant="body2">
                  Autor:&nbsp;
                  <span>
                    {article.author.firstname} {article.author.lastname}
                  </span>
                </Typography>
                <Typography variant="body2">
                  Atualizado dia&nbsp;
                  {new Date(article.updatedAt).toLocaleDateString('pt-BR')}
                </Typography>
              </div>
            </div>
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
