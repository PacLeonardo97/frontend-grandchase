// import type { Metadata, ResolvingMetadata } from 'next';

import ArticleRenderer from '@/components/ArticleRenderer';
import ContainerArticles from '@/components/ContainerArticles';
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

// const revalidate = 60 * 60 * 24 * 30; // 60 minutes * 60 seconds * 1 day * 1 month

interface PageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const locale = (await params).locale === 'pt' ? 'pt-BR' : 'en';
  const response = await fetch(
    `${process.env.NEXT_BASEURL_BACKEND}/articles/${slug}?locale=${locale}`,
    // { cache: 'force-cache', next: { revalidate } },
  );
  const resJson = await response.json();

  return (
    <ContainerArticles>
      <ArticleRenderer data={resJson as unknown as IArticle} />
    </ContainerArticles>
  );
}
