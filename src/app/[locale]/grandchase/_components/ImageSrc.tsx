'use client';

import { styled } from '@mui/material/styles';

interface IProps {
  url: string;
  backgroundPositionType: string | undefined;
}

const Element = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
});

function setBackgroundPosition(type: string | undefined) {
  let backgroundPosition = 'center 40%';
  if (!type) {
    return backgroundPosition;
  }

  if (type === 'character') {
    return (backgroundPosition = 'center 15%');
  }
}

export default function ImageSrc({ url, backgroundPositionType }: IProps) {
  return (
    <Element
      style={{
        backgroundImage: `url(${url})`,
        backgroundPosition: setBackgroundPosition(backgroundPositionType),
      }}
    />
  );
}
