import ImageNext, { ImageProps } from 'next/image';

type IProps = ImageProps;

export default function Image({ height, width, ...props }: IProps) {
  return (
    <ImageNext
      height={height}
      width={width}
      onError={({ currentTarget }) => {
        currentTarget.height = Number(height);
        currentTarget.width = Number(width);
        currentTarget.srcset = '/NoImage.svg';
      }}
      {...props}
    />
  );
}
