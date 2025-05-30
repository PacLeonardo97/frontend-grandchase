'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled as styledMui } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import styled from './styled.module.scss';
import parseRichText from '@/helper/richTextParser';

type ContentProps = {
  content: string;
};

const mockText = `!{image: { "src": "/img.png", "width": 200 }}`;

// Componentes customizados
const ImageComponent = ({ src, width, height, position }: any) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={src}
    width={width}
    height={height}
    style={{ float: position || 'none', margin: '1rem' }}
    alt=""
  />
);

const ButtonComponent = ({ text, link, style }: any) => (
  <a
    href={link}
    className={`btn ${style === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
    style={{
      display: 'inline-block',
      padding: '0.5rem 1rem',
      margin: '1rem 0',
    }}
  >
    {text}
  </a>
);

const CenteredBlock = ({ children }: { children: React.ReactNode }) => (
  <div style={{ textAlign: 'center', margin: '1rem 0' }}>{children}</div>
);

export default function ArticleRenderer(props: ContentProps) {
  useEffect(() => {
    parseRichText(mockText);
  }, []);

  return (
    <>
      <div>asdasdasd</div>
    </>
  );
}
