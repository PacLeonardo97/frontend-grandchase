// import type { Metadata, ResolvingMetadata } from 'next';

import styled from './styled.module.scss';
import ArticleRenderer from '@/components/ArticleRenderer';
import { IArticle } from '@/interface/article';

// type Props = {
//   params: Promise<{ id: string }>;
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// };

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   // read route params
//   const { id } = await params;

//   const product = await fetch(`https://.../${id}`).then((res) => res.json());

//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || [];

//   return {
//     title: product.title,
//     openGraph: {
//       images: ['/some-specific-page-image.jpg', ...previousImages],
//     },
//   };
// }

// export const revalidate = Infinity;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  console.log(slug);
  const response = await fetch(`http://localhost:1337/api/articles/${slug}`, {
    cache: 'default',
    next: { revalidate: 3600 },
  });
  const resJson = (await response.json()) as IArticle;
  // useEffect(() => {
  //   if (pathName === '/') {
  //     setIsSiteHome(true);
  //   }
  // }, [pathName]);

  return (
    <div className={styled.container}>
      <ArticleRenderer data={resJson} />
    </div>
  );
}
