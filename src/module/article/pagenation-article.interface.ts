import { Article } from './article.interface';
export interface PagenationArticle {
  lists: Article[];
  pageSize: number;
  pageNumber: number;
  total: number;
}
