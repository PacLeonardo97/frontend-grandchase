import { EArticleType } from '../enum/article.enum';
import { IAuthor } from './author';

export interface IArticle {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  type: EArticleType;
  content: string;
  author: IAuthor;
  category: IArticleCategory;
  cover: string;
}

export interface IArticleCategory {
  id: number;
  documentId: string;
  name: string;
}
